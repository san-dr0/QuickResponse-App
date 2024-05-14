import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {APP_HEIGHT, APP_WIDTH} from '../../constants/dimensions';
import {checkToGetActiveUserPermission} from '../../utils/utility';
import {useEffect, useState} from 'react';
import GeoLocaiton from 'react-native-geolocation-service';
import {CoordinatesDTO} from '../../types/Coordinate.type';
import {useAccountContext} from '../../providers/AccountProvider';
import {formatActiveUserDisplayInformationToRenderOnMap} from '../../utils/format-display';
import {getMarkerIcon} from '../../utils/markerIcon.utils';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import { DEFAULT_COORDINATES } from '../../constants/string';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: APP_HEIGHT,
    width: APP_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

type QRAMapProps = {
  userHasTriggerEmergency: any;
  emergencyType: EmergencyType;
  setCoordinates: (e: CoordinatesDTO) => void;
};

export default function QRAMap(props: QRAMapProps) {
  const [isPermissionAccepted, setIsPermissionAccepted] =
    useState<boolean>(false);
  const [activeUserCoordiantes, setActiveUserCoordinates] =
    useState<CoordinatesDTO>(DEFAULT_COORDINATES);
  const {activeUserInformation} = useAccountContext();
  const {userHasTriggerEmergency, emergencyType, setCoordinates} = props;

  useEffect(() => {
    checkPermissionFirst();
  }, []);

  useEffect(() => {
    checkFirstUserPermission();
  }, [isPermissionAccepted]);

  async function checkPermissionFirst() {
    const permissionAccepted = await checkToGetActiveUserPermission();
    setIsPermissionAccepted(permissionAccepted);
  }
  async function checkFirstUserPermission() {
    if (isPermissionAccepted) {
      GeoLocaiton.getCurrentPosition(
        position => {
          const {coords} = position;
          console.log(coords);

          if (coords) {
            setActiveUserCoordinates({
              accuracy: coords?.accuracy,
              altitude: coords?.altitude,
              altitudeAccuracy: coords?.altitudeAccuracy,
              heading: coords?.heading,
              latitude: coords?.latitude,
              longitude: coords?.longitude,
            });
          }
        },
        error => {
          console.log('ERROR permission');
          console.log(error);
        },
      );
    }
  }

  const onDrageUserLocation = (e: any) => {
    const coordinates = e.nativeEvent.coordinate;
    setActiveUserCoordinates({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    setCoordinates({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
  };

  return (
    <View style={styles.container}>
      {activeUserCoordiantes && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: activeUserCoordiantes?.latitude,
            longitude: activeUserCoordiantes?.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          zoomTapEnabled>
          <Marker
            title={`${formatActiveUserDisplayInformationToRenderOnMap(
              activeUserInformation?.account,
            )}`}
            coordinate={activeUserCoordiantes}
            draggable
            onDragEnd={e => onDrageUserLocation(e)}>
            {userHasTriggerEmergency && (
              <Image
                source={userHasTriggerEmergency}
                style={{
                  width: 50,
                  height: 50,
                }}
                resizeMode="center"
              />
            )}
          </Marker>
        </MapView>
      )}
    </View>
  );
}
