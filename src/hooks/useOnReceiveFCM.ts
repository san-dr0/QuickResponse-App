import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import { useAlertContext } from '../providers/AlertProvider';

export function useOnReceiveFirebaseCloudMessaging() {
  const {setHasAlerts} = useAlertContext();

  const onReceive = () => {
    const message = messaging().onMessage(async (remoteMessage: any) => {
      const title = remoteMessage?.data?.notification?.title;
      const body = remoteMessage?.data?.notification?.body;

      Alert.alert(
        title,
        body,
      );
      setHasAlerts(true);
    });

    return message;
  };

  const onReceiveBackgroundMessage = () => {
    const backgroundMessage = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('REMOTE >> backgroundMessage');
        console.log(remoteMessage);
        setHasAlerts(true);
      },
    );

    return backgroundMessage;
  };

  return {onReceive, onReceiveBackgroundMessage};
}
