import {useEffect} from 'react';
import {Text, View} from 'react-native';

export default function LoadingPage(props: any) {
  const {routes, navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Responder');
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loading</Text>
    </View>
  );
}
