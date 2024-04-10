import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

export const generateDeviceToken = async() => {
    const result = await messaging().getToken();

    return result;
}

export const getDevicePhoneNumber = async () => {
    const phoneNumber = await DeviceInfo.getPhoneNumber();
    
    return phoneNumber;
};
