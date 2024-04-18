import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import { useAlertContext } from '../providers/AlertProvider';
import { useAccountContext } from '../providers/AccountProvider';
import { UserType } from '../enums/User.enum';

export function useOnReceiveFirebaseCloudMessaging() {
  const {setAlertRecords} = useAlertContext();
  const {activeUserInformation} = useAccountContext();

  const onReceive = () => {
    const message = messaging().onMessage(async (remoteMessage: any) => {
      const title = JSON.parse(remoteMessage?.data?.notification)?.title;
      const body = JSON.parse(remoteMessage?.data?.notification)?.body;

      console.log('NOTIF >>>');
      console.log(remoteMessage?.data);
      console.log(activeUserInformation?.account);
      
      if (activeUserInformation?.account?.userType === UserType.RESPONDER) {
        console.log('IM IN responder');
        
        setAlertRecords({title, body, isActive: true});
      };

    });

    return message;
  };

  const onReceiveBackgroundMessage = () => {
    const backgroundMessage = messaging().setBackgroundMessageHandler(
      async (remoteMessage: any) => {
        const title = remoteMessage?.data?.notification?.title;
        const body = remoteMessage?.data?.notification?.body;
        console.log('REMOTE >> backgroundMessage');
        console.log(remoteMessage);
        setAlertRecords({title, body, isActive: true});
      },
    );

    return backgroundMessage;
  };

  return {onReceive, onReceiveBackgroundMessage};
}
