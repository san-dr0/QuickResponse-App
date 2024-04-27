import {Image, Text, View} from 'react-native';
import Maps from '../../../../components/Maps';
import useGetActiveEmergency from '../../../../hooks/useGetActiveEmergency';
import {useEffect, useMemo, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {EmergencyDto} from '../../../../dto/Emergency.dto';
import {CoordinateDto} from '../../../../dto/Coordinate.dto';
import {Marker} from 'react-native-maps';
import {getMarkerIcon} from '../../../../utils/markerIcon.utils';

export default function Alerts() {
  // const {alerts} = useAlertContext();
  const {data, sendRequest, setData} = useGetActiveEmergency();
  const [coordinate, setCoordinate] = useState<CoordinateDto | null>(null);
  const [selectedData, setSelectedData] = useState<EmergencyDto | null>(null);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async val => {
      sendRequest();
    });

    return unsubscribe;
  }, []);

  const currentCoordinate = useMemo(() => {
    if (!coordinate) {
      return;
    }

    if (selectedData) {
      return selectedData.coordinate;
    }

    return coordinate;
  }, [coordinate, setCoordinate]);

  const displayMarker = useMemo(() => {
    return data.map((val: EmergencyDto, i: number) => {
      return (
        <Marker
          tracksViewChanges={false}
          key={i.toString()}
          style={{width: 60, height: 60}}
          coordinate={val.coordinate}
          onPress={() => setSelectedData(val)}>
          <Image
            source={getMarkerIcon(val.type)}
            style={{
              width: 50,
              height: 50,
            }}
            resizeMode="center"
          />
        </Marker>
      );
    });
  }, [data, setSelectedData]);

  return (
    <View style={{flex: 1}}>
      <Maps
        isShowCurrentUserMarker={true}
        coordinateProps={currentCoordinate}
        onHandleGetCoordinate={setCoordinate}>
        {displayMarker}
      </Maps>
    </View>
  );
}
