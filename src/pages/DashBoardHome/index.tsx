import React, {useCallback, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextLabel from '../../components/TextLabel';
import QRAMap from '../../components/Map';
import { AlertNavigationModal } from '../../components/AlertNavigationModal';
import { APP_HEIGHT } from '../../constants/dimensions';
import * as S from './style';


export default function HomeDashBoard() {
  const {isPermitted} = useNotificationPermission();
  // const getLocation = useCallback(async () => {
  //   Geolocation.requestAuthorization();
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log(position.coords);
  //     },
  //     error => {
  //       console.error(error);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 10000,
  //     },
  //   );
  // }, []);

  // useEffect(() => {
  //   getLocation();
  // }, []);

  const getFcmtoken = async () => {
    try {
      const fcmtoken = await messaging().getToken();
      AsyncStorage.setItem('fcmtoken', fcmtoken);
      console.log(fcmtoken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.DashBoardHomeContainer>
      {/* <QRAMap /> */}
      <AlertNavigationModal />
    </S.DashBoardHomeContainer>
  );
}

const style = StyleSheet.create({
  containerView: {
    flex: 1,

    width,
    height,
  },
  map: {
    width,
    height,
  },
});
