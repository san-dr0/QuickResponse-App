import {useEffect, useMemo} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CoordinateDto} from '../../dto/Coordinate.dto';
import useGeolocation from '../../hooks/useGeolocation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {
  children: React.ReactNode;
  height?: number;
  isShowCurrentUserMarker: boolean;
  coordinateProps?: CoordinateDto;
  onHandleGetCoordinate?: (coordinate: CoordinateDto) => void;
};

export default function Maps(props: Props) {
  const {
    children,
    height = windowHeight,
    isShowCurrentUserMarker = true,
    coordinateProps,
  } = props;
  const {coordinate, setCoordinate, getLocation, getPermisssion} =
    useGeolocation();

  async function getUserLocation() {
    if (!getPermisssion()) {
      Alert.prompt('Please enable location');
      return;
    }

    const location = await getLocation();
    if (props.onHandleGetCoordinate) {
      props?.onHandleGetCoordinate(location);
    }
    setCoordinate(location);
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  const displayMaps = useMemo(() => {
    const newCoordinate = coordinateProps ?? coordinate;

    if (!newCoordinate) {
      return <Text>Please allow your location</Text>;
    }
    return (
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{...styles.maps, height: height}}
        region={{
          latitude: newCoordinate.latitude as number,
          longitude: newCoordinate.longitude as number,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        zoomTapEnabled>
        {isShowCurrentUserMarker && (
          <Marker coordinate={newCoordinate as LatLng} />
        )}
        {children}
      </MapView>
    );
  }, [coordinate, coordinateProps, isShowCurrentUserMarker, children]);

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
