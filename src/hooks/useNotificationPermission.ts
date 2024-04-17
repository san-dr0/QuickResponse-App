import React, {useCallback, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export default function useNotificationPermission() {
  const [isPermitted, setIsPermitted] = useState<boolean>(false);

  const getPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      setIsPermitted(true);
    }
  }, []);

  useEffect(() => {
    getPermission();
  }, []);

  return {
    isPermitted,
  };
}
