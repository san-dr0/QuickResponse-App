import {Text, View} from 'react-native';
import Maps from '../../../../components/Maps';
import { useAlertContext } from '../../../../providers/AlertProvider';

export default function Alerts() {
  const {alerts} = useAlertContext();

  return (
    <View style={{flex: 1}}>
      <Text>HI</Text>
      {/* <Maps>
        <Text>HI</Text>
      </Maps> */}
    </View>
  );
}
