import {useEffect, useMemo} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import useGeolocation from '../../hooks/useGeolocation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {
  children: React.ReactNode;
  height?: number;
};

export default function Maps(props: Props) {
  const {children, height = windowHeight} = props;
  const {coordinate, setCoordinate, getLocation, getPermisssion} =
    useGeolocation();

  async function getUserLocation() {
    if (!getPermisssion()) {
      Alert.prompt('Please enable location');
      return;
    }

    const location = await getLocation();
    setCoordinate(location);
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  console.log('COORDINATE', coordinate);

  const displayMaps = useMemo(() => {
    if (!coordinate) {
      return <Text>Please allow your location</Text>;
    }
    return (
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{...styles.maps, height: height}}
        region={{
          latitude: coordinate.latitude as number,
          longitude: coordinate.longitude as number,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        zoomTapEnabled>
        <Marker coordinate={coordinate as LatLng} />
      </MapView>
    );
  }, [coordinate]);
  return <View style={{...styles.container, height}}>{displayMaps}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: windowWidth,
    flex: 1,
  },
});
