import messaging from '@react-native-firebase/messaging';
import { UserType } from '../enums/User.enum';
import { useAccountContext } from '../providers/AccountProvider';
import { useAlertContext } from '../providers/AlertProvider';

export function useOnReceiveFirebaseCloudMessaging() {
  const { setAlertRecords } = useAlertContext();
  const { activeUserInformation } = useAccountContext();

  const onReceive = () => {
    const message = messaging().onMessage(async (remoteMessage: any) => {
      const emergencyId = JSON.parse(remoteMessage?.data?.emergencyId)
      const title = JSON.parse(remoteMessage?.data?.notification)?.title;
      const body = JSON.parse(remoteMessage?.data?.notification)?.body;
      const emergency = JSON.parse(remoteMessage?.data?.emergency);
      console.log('NOTIF >>>');
      console.log(remoteMessage?.data);
      console.log(activeUserInformation?.account);

      if (activeUserInformation?.account?.userType === UserType.RESPONDER) {
        console.log('IM IN responder');

        setAlertRecords({ title, body, isActive: true, emergencyID: emergencyId, emergency: emergency });
      };

    });

    return message;
  };

  const onReceiveBackgroundMessage = () => {
    const backgroundMessage = messaging().setBackgroundMessageHandler(
      async (remoteMessage: any) => {
        const emergencyId = remoteMessage?.data?.emergencyId;
        const title = remoteMessage?.data?.notification?.title;
        const body = remoteMessage?.data?.notification?.body;
        console.log('REMOTE >> backgroundMessage');
        console.log(remoteMessage);
        setAlertRecords({ title, body, isActive: true, emergencyID: emergencyId });
      },
    );

    return backgroundMessage;
  };

  return { onReceive, onReceiveBackgroundMessage };
}
