import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { NotificationDto } from '../../dto/Notification.dto';

export const generateDeviceToken = async () => {
  const result = await messaging().getToken();

  return result;
};

export const getDevicePhoneNumber = async () => {
  const phoneNumber = await DeviceInfo.getPhoneNumber();

  return phoneNumber;
};


export const getUsersTokens = async (userType: string) => {
  const resp = await firestore().collection('Tokens').where('userType', '==', userType).get();
  const arr = resp.docs.map(val => {
    return {
      email: val.data().email,
      token: val.data().token,
      userType: val.data().userType
    }
  })
  return arr;
}

export const sendNotifViaAxios = async (
  data: any,
  recieverToken: string,
  notificationData: NotificationDto,
) => {
  const response = await axios.post(
    'https://fcm.googleapis.com/fcm/send',
    {
      data: data,
      notification: notificationData,
      to: recieverToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: [
          'key',
          'AAAA_-_KRhA:APA91bFjpjRzCVlFJwVKFOwI6m3cIhSSWsiKDAwiHMXUHTv2jznNOltpZht7qxPVXk3NpU60HEH29rv5ycKeip-qzauPpf0T2TNlQxPpRGWT_vm3p-JNFfZxQTQ_CKwz5F3tJius7mdX',
        ].join('='),
      },
    },
  );

  return response;
};
