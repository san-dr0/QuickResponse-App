import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {NotificationDto} from '../../dto/Notification.dto';
import {TOKEN_TABLE} from '../../constants/dbRef';

export const generateDeviceToken = async () => {
  const result = await messaging().getToken();

  return result;
};

export const getDevicePhoneNumber = async () => {
  const phoneNumber = await DeviceInfo.getPhoneNumber();

  return phoneNumber;
};

export const gerUserTokenByEmail = async (email: string) => {
  const resp = await firestore()
    .collection(TOKEN_TABLE)
    .where('email', '==', email)
    .get();
  const arr: any[] = [];

  resp.forEach(element => {
    arr.push({id: element.id, ...element.data()});
  });

  return arr[0];
};
export const getUsersTokens = async (userType: string) => {
  const resp = await firestore()
    .collection('Tokens')
    .where('userType', '==', userType)
    .get();
  const arr = resp.docs.map(val => {
    return {
      email: val.data().email,
      token: val.data().token,
      userType: val.data().userType,
    };
  });
  return arr;
};

export const sendNotifViaAxios = async (
  data: any,
  recieverToken: string,
  notificationData: NotificationDto,
) => {
  try {
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
            'AAAAlzgqhdk:APA91bFO-0FMylepXawpf4pC6wHkzoh4hfgNGLSPC88YL3jiWFWABUebkA2ufok6Euuh3xoPyV0X3CBp1Kd_a_wXoP0m3AEyJLzVjk7J-trMCYLwBUOBEJ3qwh6gXa6pO-dOl7hTzrc0'
          ].join('='),
        },
      },
    );

    return response;
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const sendNotification = async (
  notification: NotificationDto,
  recieverToken: string,
  emergencyId: string,
  senderBy: string,
) => {
  try {
    console.log("sendNOTIF >>");
    console.log(notification);
    
    const response = await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        data: {emergencyId: emergencyId, senderBy},
        notification: notification,
        to: recieverToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: [
            'key',
            'AAAAlzgqhdk:APA91bFO-0FMylepXawpf4pC6wHkzoh4hfgNGLSPC88YL3jiWFWABUebkA2ufok6Euuh3xoPyV0X3CBp1Kd_a_wXoP0m3AEyJLzVjk7J-trMCYLwBUOBEJ3qwh6gXa6pO-dOl7hTzrc0'
          ].join('='),
        },
      },
    );

    return response;
  } catch (error) {
    console.log('ERROR', error);
  }
};
