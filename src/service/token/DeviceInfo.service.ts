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
    {
      data: {
        userId: '1232423424'
      },
      notification: {
        title: "Sample text1",
        body: "Sample text2",
        image: "Sample text3",
      },
      to: 'e0P9e7LBQR6Tb5XWyXnDJg:APA91bFJ35XiqNCJj6ZdeVyUy2V2DNlba1gr0F7skuucB6ByCs3EeDiYbrbi1vftU4n_IQa8qoO_KeeDCWFMslnyoTyjguodYyb_m_qAjUCm4gEDgrhFYH8AXj_JhdHbiQ0kOZM2_N9B',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: ['key', 'AAAA_-_KRhA:APA91bFjpjRzCVlFJwVKFOwI6m3cIhSSWsiKDAwiHMXUHTv2jznNOltpZht7qxPVXk3NpU60HEH29rv5ycKeip-qzauPpf0T2TNlQxPpRGWT_vm3p-JNFfZxQTQ_CKwz5F3tJius7mdX'].join('='),
      },
    },
  );

  return response;
};
