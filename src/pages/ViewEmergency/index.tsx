import {View} from 'react-native';

type ParamsList = {
  params: {
    emergencyId: string;
  };
};

export default function ViewEmergency(props: any) {
  const {route, navigation} = props;
  console.log('ID', route.params.emergencyId);

  return <View style={{flex: 1}}></View>;
}
