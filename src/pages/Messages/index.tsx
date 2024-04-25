import React, {useState} from 'react';
import useGetConversationId from '../../hooks/useGetConversationId';
import {FlatList, Text, TextInput, ToastAndroid, View} from 'react-native';
import {MessageDto, MessageUserDto} from '../../types/Message.type';
import {useAccountContext} from '../../providers/AccountProvider';
import {COLOR_LISTS} from '../../constants/colors';
import Button from '../../components/Button';
import {sendMessage} from '../../service/message/message.service';

export default function Messages(props: any) {
  const {route, navigation} = props;
  const id = route.params.id;
  const {activeUserInformation: user} = useAccountContext();
  const {data} = useGetConversationId({id: id});
  const [message, setMessage] = useState<string>('');
  const [isDisable, setIsDisable] = useState<boolean>(false);

  async function handleSendMessage() {
    try {
      setIsDisable(true);
      let sender = null;
      let reciever = null;
      const isSender =
        data?.messages[0].sender.id ===
        JSON.parse(user?.account?.fbID as string);

      if (isSender) {
        sender = data?.messages[0].sender;
        reciever = data?.messages[0].receiver;
      } else {
        sender = data?.messages[0].receiver;
        reciever = data?.messages[0].sender;
      }

      if (!message) {
        ToastAndroid.show('Please input message', ToastAndroid.LONG);
        setIsDisable(false);
        return;
      }

      await sendMessage(
        reciever as MessageUserDto,
        sender as MessageUserDto,
        message,
      );
      setMessage('');
      setIsDisable(false);
    } catch (error) {}
  }

  const renderItem = ({item, index}: {item: MessageDto; index: number}) => {
    const isYouAsSender =
      item.sender.id === JSON.parse(user?.account?.fbID as string);
    console.log('SENDER', item.sender.id);
    console.log('MYID', JSON.parse(user?.account?.fbID as string));
    console.log('EQUA', isYouAsSender);
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        {isYouAsSender ? (
          <View>
            <Text
              style={{
                textAlign: 'right',
                backgroundColor: COLOR_LISTS.AMBER_500,
                padding: 10,
                marginVertical: 7,
                borderRadius: 12,
                marginHorizontal: 5,
              }}>
              {item.message}
            </Text>
          </View>
        ) : (
          <View style={{width: 0}}>
            <Text style={{textAlign: 'left', backgroundColor: 'violet'}}>
              {item.message}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data?.messages as MessageDto[]}
        keyExtractor={(val: MessageDto, i) => i.toString()}
        renderItem={renderItem}
      />
      <View style={{width: '100%', flexDirection: 'row', padding: 10, gap: 8}}>
        <View style={{flex: 1}}>
          <TextInput
            style={{
              borderWidth: 1,
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderColor: 'lightgray',
              borderRadius: 20,
            }}
            placeholder="Send Message"
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <View>
          <Button
            title="Send"
            isDisable={isDisable}
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </View>
  );
}
