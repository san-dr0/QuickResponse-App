import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import useGetEmergencyForResponder from '../../../hooks/useGetEmergencyForResponder';
import {useAccountContext} from '../../../providers/AccountProvider';
import {EmergencyDto} from '../../../dto/Emergency.dto';
import {EmergencyType} from '../../../enums/EmergencyType.enum';
import {MARKER} from '../../../constants/image';
import TextLabel from '../../../components/TextLabel';
import DividerComponent from '../../../components/Divider';

export default function EmergencyHistory(props: any) {
  const {navigation} = props;
  const {activeUserInformation: user} = useAccountContext();
  const {data} = useGetEmergencyForResponder({
    id: user?.account?.fbID as string,
    responderType: user?.account?.responderType as string,
  });

  const renderItem = ({item, index}: {item: EmergencyDto; index: number}) => {
    let icons = null;
    switch (item.type) {
      case EmergencyType.FIRE:
        icons = MARKER.FIRE;
        break;
      case EmergencyType.CAR_ACCIDENT:
        icons = MARKER.ACCIDENT;
        break;
      case EmergencyType.EARTHQUAKE:
        icons = MARKER.EARTHQUAKE;
        break;
      case EmergencyType.FLOOD:
        icons = MARKER.FLOOD;
        break;
      case EmergencyType.MEDICAL:
        icons = MARKER.MEDICAL;
        break;
      case EmergencyType.TYPHOON:
        icons = MARKER.TYPHOON;
        break;
      default:
        icons = null;
        break;
    }

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('View-Emergency', {
            emergencyId: item.emergencyId,
          })
        }>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 18,
            backgroundColor: 'white',
            marginBottom: 5,
            flexDirection: 'row',
            gap: 10,
          }}>
          <View>
            <Image
              source={icons}
              style={{width: 50, height: 50}}
              resizeMode="center"
            />
          </View>

          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.type}</Text>
            <Text style={{fontSize: 16}}>
              {item.sender.firstname +
                ' ' +
                item.sender.middlename +
                ' ' +
                item.sender.lastname}
            </Text>
            <Text style={{marginTop: 7}}>{item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  console.log(data[0]);

  return (
    <View style={{flex: 1}}>
      {data.length ? (
        <FlatList
          data={data}
          keyExtractor={val => val.emergencyId as string}
          renderItem={renderItem}
        />
      ) : (
        <>
          <DividerComponent margin="20px 0 0 0" />
          <TextLabel
            title="No records to show."
            fontSize={20}
            textAlign="center"
            fontWeight="bold"
          />
        </>
      )}
    </View>
  );
}
