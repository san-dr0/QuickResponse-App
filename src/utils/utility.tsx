import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {PermissionsAndroid} from 'react-native';
import {TOKEN_TABLE} from '../constants/dbRef';
import {useUserToken} from '../hooks/userTokenHooks';

export const setAsyncStorage = async (key: string, param: any) => {
  try {
    const record = JSON.stringify(param);

    await AsyncStorage.setItem(key, record);
  } catch (error) {
    console.error(error);
  }
};

export const getAsyncStorage = async (key: string) => {
  try {
    const record = await AsyncStorage.getItem(key);

    return record;
  } catch (error) {
    console.error(error);
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error: any) {
    console.log(error);
  }
};

export const validateIfUserExists = async (email: string): Promise<boolean> => {
  const response = await firestore()
    .collection('Users')
    .where('email', '==', email)
    .get();

  if (!response.docs[0]) {
    return false;
  }

  const isExists = response.docs[0].data()?.email === email;

  return isExists;
};

export const checkToGetActiveUserPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'QRApp Location Permission',
        message: 'QRApp Map want to ask for permission.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Okay',
      },
    );

    return granted === 'granted' ? true : false;
  } catch (error: any) {
    console.log('Error in MAPS', error?.message);
    return false;
  }
};

export const debounce = (func: any, delay: any) => {
  let timeoutId: any = null;

  return (...args: any) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const createNewDeviceToken = async (
  userID: string,
  loginEmail: string,
  userType: string,
) => {
  const {sendGenerateToken} = useUserToken();
  const deviceToken = await sendGenerateToken();

  firestore().collection(TOKEN_TABLE).doc(userID).set({
    email: loginEmail,
    token: deviceToken,
    userType: userType,
  });
};
