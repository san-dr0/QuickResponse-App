import {useMemo, useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {Marker} from 'react-native-maps';
import Maps from '../../components/Maps';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import {MARKER} from '../../constants/image';
import Modal from 'react-native-modal';
import {ButtonComponent} from '../../components/Buttons';

const height = Dimensions.get('window').height * 0.7;
export default function ViewEmergency(props: any) {
  const {route, navigation} = props;
  const id = route.params.emergencyId;
  const emergency = route.params.emergency;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClick() {
    console.log('MARKER CLICK');
    setIsOpen(true);
  }

  function getMarkerIcon() {
    let icons = null;
    switch (emergency.type) {
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
    if (!icons) {
      return;
    }

    return (
      <Marker
        style={{width: 60, height: 60}}
        coordinate={emergency.coordinate}
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

    return (
      <Maps
        isShowCurrentUserMarker={false}
        coordinateProps={emergency.coordinate}>
        {displayMarker}
      </Maps>
    );
  }, [emergency, isOpen, displayMarker]);
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isOpen}>
        <View style={{backgroundColor: 'white', height: height}}>
          <Text>Emergency Alert</Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={getMarkerIcon()}
              style={{height: 200, width: 200}}
              resizeMode="center"
            />
          </View>
          <ButtonComponent title="Close" onPress={() => setIsOpen(false)} />
        </View>
      </Modal>
      {displayMaps}
    </View>
  );
}
