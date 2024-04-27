import {FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import useGetConversationById from '../../../../hooks/useGetConversationById';
import {useAccountContext} from '../../../../providers/AccountProvider';
import {ConversationDto} from '../../../../types/Message.type';
import { useState } from 'react';

export default function Inbox(props: any) {
  const {navigation} = props;
  const [refresh, setRefresh] = useState<boolean>(false);
  const {activeUserInformation: user} = useAccountContext();
  const {conversation} = useGetConversationById({
    id: user?.account?.fbID as string, refresh: refresh
  });
  const [refresh, setRefresh] = useState<boolean>(false);

  const renderItem = ({
    item,
    index,
  }: {
    item: ConversationDto;
    index: number;
  }) => {
    let displayName = '';
    let image =
      item.messages[0].sender.id === user?.account?.fbID
        ? item.messages[0].sender.profile
        : item.messages[0].receiver.profile;

    const img =
      image === ''
        ? require('../../../../assets/QRApp-img1.jpeg')
        : {uri: image};

    if (item.messages[0].sender.id === user?.account?.fbID) {
      displayName =
        item.messages[0].sender.firstname +
        ' ' +
        item.messages[0].sender.middlename +
        ' ' +
        item.messages[0].sender.lastname;
    } else {
      displayName =
        item.messages[0].receiver.firstname +
        ' ' +
        item.messages[0].receiver.middlename +
        ' ' +
        item.messages[0].receiver.lastname;
    }
    const numberOfMessages = item.messages.length;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Messages', {id: item.id})}>
        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: 'white',
            paddingVertical: 18,
            flexDirection: 'row',
            gap: 12,
          }}>
          <View>
            <Image
              source={img}
              style={{width: 60, height: 60, borderRadius: 100}}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {displayName}
            </Text>
            <Text style={{fontSize: 16, paddingVertical: 5}}>
              {item.messages[numberOfMessages - 1].message}
            </Text>
            <Text style={{fontSize: 12}}>
              {item.messages[numberOfMessages - 1].date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefreshMessages = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{marginTop: 12}}
        data={conversation}
        keyExtractor={val => val.id as string}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefreshMessages} />
        }
      />
    </View>
  );
}
