import {useMemo} from 'react';
import {View} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import Maps from '../../components/Maps';

export default function ViewEmergency(props: any) {
  const {route, navigation} = props;
  const id = route.params.emergencyId;
  const emergency = route.params.emergency;
  console.log('ID', route.params.emergencyId);
  console.log('EMERGENCY', route.params.emergency);

  const displayMaps = useMemo(() => {
    if (!emergency) {
      return;
    }

    return (
      <Maps
        isShowCurrentUserMarker={false}
        coordinateProps={emergency.coordinate}>
        <Marker
          coordinate={emergency.coordinate as LatLng}
          title={emergency.type.toString()}
        />
      </Maps>
    );
  }, [emergency]);
  return <View style={{flex: 1}}>{displayMaps}</View>;
}
