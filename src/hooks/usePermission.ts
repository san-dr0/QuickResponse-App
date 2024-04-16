import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useCallback } from 'react';

export function useNotificationPermissions() {
    const sendRequest = useCallback(async () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    }, []);

    return {sendRequest};
}
