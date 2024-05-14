import React from 'react';
import {FlatList, Text, View} from 'react-native';
import useGetEmergencyById from '../../hooks/useGetEmergencyById';
import {EmergencyDto, EmergencyResponder} from '../../dto/Emergency.dto';

export default function ViewOtherResponder(props: any) {
  const {route, navigation} = props;

  const id = route.params.id;
  // console.log('lala', id);
  const {data: emergency} = useGetEmergencyById({emergencyId: id});

  // console.log('GG', emergency);

  const renderitem = ({
    item,
    index,
  }: {
    item: EmergencyResponder;
    index: number;
  }) => {
    return (
      <View
        style={{
          width: '100%',
          padding: 12,
          backgroundColor: 'white',
          marginVertical: 4,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          {item.firstname + ' ' + item.middlename + ' ' + item.lastname}
        </Text>
        <Text>{item.responderType}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
      <FlatList
        style={{margin: 10}}
        data={emergency?.responder as EmergencyResponder[]}
        renderItem={renderitem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
