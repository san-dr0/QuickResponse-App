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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import useNotificationPermission from '../../hooks/useNotificationPermission';
import messaging from '@react-native-firebase/messaging';
import {tokens} from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
    <View style={style.containerView}>
      <TouchableOpacity onPress={getFcmtoken}>
        <Text>GET FCM TOken</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getFcmtoken}>
        <Text>SEND NOTIF</Text>
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={style.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
    </View>
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
