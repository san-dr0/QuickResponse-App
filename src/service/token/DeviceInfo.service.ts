import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

export const generateDeviceToken = async () => {
  const result = await messaging().getToken();

  return result;
};

export const getDevicePhoneNumber = async () => {
  const phoneNumber = await DeviceInfo.getPhoneNumber();

  return phoneNumber;
};

export const sendNotifViaAxios = async () => {
  const response = await axios.post(
    'https://fcm.googleapis.com/fcm/send',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: ['key', 12223].join('='),
      },
    },
  );
};
