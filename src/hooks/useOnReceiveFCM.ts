import messaging from '@react-native-firebase/messaging';
import {EmergencyDto} from '../dto/Emergency.dto';
import {UserType} from '../enums/User.enum';
import {useAccountContext} from '../providers/AccountProvider';
import {useAlertContext} from '../providers/AlertProvider';
import {useUserAlertContext} from '../providers/UserResponseProvider';

export function useOnReceiveFirebaseCloudMessaging() {
  const {setAlertRecords} = useAlertContext();
  const {activeUserInformation} = useAccountContext();
  const {setUserAlert} = useUserAlertContext();

  const onReceive = () => {
    const message = messaging().onMessage(async (remoteMessage: any) => {
      const parseMessage = remoteMessage;

      console.log('wew', JSON.parse(parseMessage.data?.coordinate));

      const payload: EmergencyDto = {
        type: parseMessage?.data?.type,
        sender: JSON.parse(parseMessage?.data?.sender),
        responder: [],
        emergencyStatus: parseMessage?.data?.emergencyStatus,
        coordinate: JSON.parse(parseMessage?.data?.coordinate),
        date: parseMessage?.data?.date,
      };
      const emergencyId = parseMessage?.data?.emergencyId;
      const title = JSON.parse(remoteMessage?.data?.notification)?.title;
      const body = JSON.parse(remoteMessage?.data?.notification)?.body;
      //const emergency = JSON.parse(remoteMessage?.data);
      console.log('NOTIF >>>');
      console.log(remoteMessage?.data);
      console.log(activeUserInformation?.account);

      if (activeUserInformation?.account?.userType === UserType.RESPONDER) {
        console.log('IM IN responder');

        setAlertRecords({
          title,
          body,
          isActive: true,
          emergencyID: emergencyId,
          emergency: payload,
        });
      } else {
        setUserAlert({
          title,
          body: body,
          isOpen: true,
          emergencyId: emergencyId,
        });
      }
    });

    return message;
  };

  const onReceiveBackgroundMessage = () => {
    const backgroundMessage = messaging().setBackgroundMessageHandler(
      async (remoteMessage: any) => {
        const parseMessage = remoteMessage;

        console.log('wew', JSON.parse(parseMessage.data?.coordinate));

        const payload: EmergencyDto = {
          type: parseMessage?.data?.type,
          sender: JSON.parse(parseMessage?.data?.sender),
          responder: [],
          emergencyStatus: parseMessage?.data?.emergencyStatus,
          coordinate: JSON.parse(parseMessage?.data?.coordinate),
          date: parseMessage?.data?.date,
        };
        //const emergency =
        const emergencyId = remoteMessage?.data?.emergencyId;
        const title = remoteMessage?.data?.notification?.title;
        const body = remoteMessage?.data?.notification?.body;
        console.log('REMOTE >> backgroundMessage');
        console.log(remoteMessage);

        if (activeUserInformation?.account?.userType === UserType.RESPONDER) {
          console.log('IM IN responder');

          setAlertRecords({
            title,
            body,
            isActive: true,
            emergencyID: emergencyId,
            emergency: payload,
          });
        } else {
          setUserAlert({
            title,
            body: body,
            isOpen: true,
            emergencyId: emergencyId,
          });
        }
      },
    );

    return backgroundMessage;
  };

  return {onReceive, onReceiveBackgroundMessage};
}
