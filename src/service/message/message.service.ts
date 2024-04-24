import {CONVERSATIONS} from '../../constants/dbRef';
import {
  ConversationDto,
  MessageDto,
  MessageUserDto,
} from '../../types/Message.type';
import firestore from '@react-native-firebase/firestore';
import {getCurrentDate, getCurrentDateWithTime} from '../../utils/date.utils';
export const sendMessage = async (
  reciever: MessageUserDto,
  sender: MessageUserDto,
  message: string,
) => {
  const userIncluded = [reciever.id, sender.id];
  const dataEqualToUserIncluded = await firestore()
    .collection(CONVERSATIONS)
    .where('users', 'array-contains', userIncluded)
    .get();

  let conversation: ConversationDto[] = [];

  dataEqualToUserIncluded.forEach(element => {
    conversation.push({id: element.id, ...element.data()} as ConversationDto);
  });

  if (conversation.length > 0) {
    const mes: MessageDto = {
      receiver: reciever,
      sender: sender,
      message: message,
      date: getCurrentDateWithTime(),
    };
    const convers: MessageDto[] = [...conversation[0].messages, mes];

    await firestore().collection(CONVERSATIONS).doc(conversation[0].id).update({
      messages: convers,
    });
  } else {
    const msg: MessageDto = {
      receiver: reciever,
      sender: sender,
      message: message,
      date: getCurrentDateWithTime(),
    };
    const payload: ConversationDto = {
      users: [reciever.id as string, sender.id as string],
      messages: [msg],
    };
    await firestore().collection(CONVERSATIONS).add(payload);
  }
};
