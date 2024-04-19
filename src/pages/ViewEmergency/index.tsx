import {View} from 'react-native';

export default function ViewEmergency(props: any) {
  const {route, navigation} = props;
  console.log('ID', route.params.emergencyId);
  console.log('EMERGENCY', route.params.emergency);
  return <View style={{flex: 1}}></View>;
}
