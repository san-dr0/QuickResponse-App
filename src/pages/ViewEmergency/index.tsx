import {useMemo, useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {Marker} from 'react-native-maps';
import Maps from '../../components/Maps';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import {MARKER} from '../../constants/image';
import Modal from 'react-native-modal';
import {ButtonComponent} from '../../components/Buttons';
import useGetEmergencyById from '../../hooks/useGetEmergencyById';
import Button from '../../components/Button';

const FooterHeight = Dimensions.get('window').height * 0.4;
const MapsHeight = Dimensions.get('window').height;
export default function ViewEmergency(props: any) {
  const {route, navigation} = props;
  const id = route.params.emergencyId;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {data: emergency} = useGetEmergencyById({emergencyId: id});

  console.log('DATA', emergency);

  function handleClick() {
    console.log('MARKER CLICK');
    setIsOpen(true);
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
        onPress={() => setIsOpen(true)}>
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
        height={isOpen ? MapsHeight * 0.6 : MapsHeight}
        coordinateProps={emergency.coordinate}>
        {displayMarker}
      </Maps>
    );
  }, [emergency, isOpen, displayMarker]);

  const viewModal = useMemo(() => {
    if (!isOpen) {
      return;
    }

    return (
      <View
        style={{
          height: FooterHeight,
          width: '100%',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {emergency?.type} Alert
        </Text>
        <Text>{emergency?.date}</Text>
        <Text>
          {emergency?.sender.firstname + ' ' + emergency?.sender?.lastname}
        </Text>
      </View>
    );
  }, [isOpen]);

  return (
    <View style={{flex: 1}}>
      {displayMaps}
      {viewModal}
      <Button />
    </View>
  );
}
