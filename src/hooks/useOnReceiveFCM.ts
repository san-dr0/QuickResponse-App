import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import { useAlertContext } from '../providers/AlertProvider';

export function useOnReceiveFirebaseCloudMessaging() {
  const {beach_born} = useAlertContext();
  const onReceive = () => {
    const message = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage?.data?.notification?.title,
        remoteMessage?.data?.notification?.body,
      );
    });

    return message;
  };

  const onReceiveBackgroundMessage = () => {
    const backgroundMessage = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('REMOTE >> backgroundMessage');
        console.log(remoteMessage);
      },
    );

    return backgroundMessage;
  };

  return {onReceive, onReceiveBackgroundMessage};
}
