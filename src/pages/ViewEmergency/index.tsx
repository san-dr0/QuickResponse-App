import {useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import Maps from '../../components/Maps';
import {MARKER} from '../../constants/image';
import {EmergencyResponder} from '../../dto/Emergency.dto';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import useGetEmergencyById from '../../hooks/useGetEmergencyById';
import {useAccountContext} from '../../providers/AccountProvider';
import {acceptEmergency} from '../../service/emergency/Emergency.service';
import TextInputComponent from '../../components/TextInput';
import TextInputEnum from '../../enums/TextInput.enum';

const FooterHeight = Dimensions.get('window').height * 0.5;
const MapsHeight = Dimensions.get('window').height;
export default function ViewEmergency(props: any) {
  const {route, navigation} = props;
  const id = route.params.emergencyId;
  const {activeUserInformation: user} = useAccountContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {data: emergency, sendRequest} = useGetEmergencyById({emergencyId: id});

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  async function handleAccept() {
    try {
      if (!user) {
        return;
      }

      const {account, credentials} = user;

      const payload: EmergencyResponder = {
        id: account?.fbID as string,
        responderType: account?.responderType as string,
        firstname: account?.firstname as string,
        middlename: account?.middlename as string,
        lastname: account?.lastname as string,
        email: credentials?.loginEmail as string,
      };

      await acceptEmergency(id, payload);
      await sendRequest();
      await Alert.prompt('Successfully Update');
    } catch (error) {
      console.log(error);
    }
  }

  function getMarkerIcon() {
    let icons = null;
    switch (emergency?.type) {
      case EmergencyType.FIRE:
        icons = MARKER.FIRE;
        break;
      case EmergencyType.CAR_ACCIDENT:
        icons = MARKER.ACCIDENT;
        break;
      case EmergencyType.EARTHQUAKE:
        icons = MARKER.EARTHQUAKE;
        break;
      case EmergencyType.FLOOD:
        icons = MARKER.FLOOD;
      case EmergencyType.MEDICAL:
        icons = MARKER.MEDICAL;
        break;
      case EmergencyType.TYPHOON:
        icons = MARKER.TYPHOON;
        break;
      default:
        icons = null;
        break;
    }
    return icons;
  }

  const displayMarker = useMemo(() => {
    const icons = getMarkerIcon();

    if (!icons || !emergency) {
      return;
    }

    return (
      <Marker
        style={{width: 60, height: 60}}
        coordinate={emergency?.coordinate}
        onPress={() => handleClick()}>
        <Image
          source={icons}
          style={{
            width: 50,
            height: 50,
          }}
          resizeMode="center"
        />
      </Marker>
    );
  }, [emergency, isOpen]);

  const displayMaps = useMemo(() => {
    if (!emergency) {
      return;
    }
    console.log('gg');

    return (
      <Maps
        isShowCurrentUserMarker={false}
        height={isOpen ? MapsHeight * 0.5 : MapsHeight}
        coordinateProps={emergency.coordinate}>
        {displayMarker}
      </Maps>
    );
  }, [emergency, isOpen, displayMarker]);

  const viewModal = useMemo(() => {
    if (!isOpen) {
      return;
    }

    const numberOfResponder = emergency?.responder?.length;
    const isIncludeToResponder = emergency?.responder?.some(
      val => val.id === user?.account?.fbID,
    );

    console.log('WEW', isIncludeToResponder);
    return (
      <View
        style={{
          height: FooterHeight,
          width: '100%',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View>
            <Image
              source={getMarkerIcon()}
              style={{height: 100, width: 100}}
              resizeMode="center"
            />
          </View>
          <View style={{padding: 12}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {emergency?.type} Alert
            </Text>
            <Text style={{fontSize: 16}}>{emergency?.date}</Text>
            <Text style={{fontSize: 16}}>
              No. responder that respond {numberOfResponder}{' '}
            </Text>
            <View style={{flexDirection: 'row', gap: 14}}>
              <Text style={{fontSize: 16}}>
                {emergency?.sender.firstname +
                  ' ' +
                  emergency?.sender?.lastname}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('View-User-Info', {
                    id: emergency?.sender?.userID
                      ? JSON.parse(emergency?.sender?.userID)
                      : '',
                  })
                }>
                <MaterialCommunityIcons
                  name="account-eye"
                  color="red"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button title="Message Sender" type="OUTLINE" />
        <View style={{height: 8}} />
        {isIncludeToResponder ? (
          <Button
            title="View other Responder"
            onPress={() =>
              navigation.navigate('View-Other-Responder', {
                id: id,
              })
            }
          />
        ) : (
          <Button title="Accept" onPress={handleAccept} />
        )}
        <View style={{height: 8}} />
        <TouchableOpacity style={{padding: 8}} onPress={handleClick}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: 'red',
              fontWeight: 'bold',
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [isOpen, emergency]);

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isOpenModal}>
        <View
          style={{
            height: MapsHeight * 0.4,
            width: '80%',
            backgroundColor: 'white',
            padding: 8,
          }}>
          <Text>TextMessage</Text>
          <TextInputComponent textMode={TextInputEnum.FLAT} />
        </View>
      </Modal>
      {displayMaps}
      {viewModal}
    </View>
  );
}
