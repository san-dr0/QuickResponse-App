import firestore from '@react-native-firebase/firestore';
import {CONVERSATIONS} from '../../constants/dbRef';
import {
  ConversationDto,
  MessageDto,
  MessageUserDto,
} from '../../types/Message.type';
import {getCurrentDateWithTime} from '../../utils/date.utils';
export const sendMessage = async (
  reciever: MessageUserDto,
  sender: MessageUserDto,
  message: string,
) => {
  const userIncluded = [reciever.id as string, sender.id as string];
  const dataEqualToUserIncluded = await firestore()
    .collection(CONVERSATIONS)
    .get();

  let conversation: ConversationDto[] = [];

  dataEqualToUserIncluded.forEach(element => {
    const {users} = element.data();

    const rspns = users.sort().toString();
    const usrincld = userIncluded.sort().toString();

    if (rspns === usrincld) {
      conversation.push({id: element.id, ...element.data()} as ConversationDto);
    }
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

export const getConversationByUserId = async (id: string) => {
  console.log([JSON.parse(id)]);
  const resp = await firestore()
    .collection(CONVERSATIONS)
    .where('users', 'array-contains-any', [JSON.parse(id)])
    .get();

  const conversation: ConversationDto[] = [];

  resp.forEach(element => {
    conversation.push({id: element.id, ...element.data()} as ConversationDto);
  });

  return conversation;
};

export const getConversationById = async (id: string) => {
  const resp = await firestore().collection(CONVERSATIONS).doc(id).get();

  return {
    id: resp.id,
    ...resp.data(),
  } as ConversationDto;
};

export const getByUsersId = async (userId: string, receiverId: string) => {
  const userIncluded = [userId, receiverId];
  const dataEqualToUserIncluded = await firestore()
    .collection(CONVERSATIONS)
    .get();

  let conversation: ConversationDto[] = [];

  dataEqualToUserIncluded.forEach(element => {
    const {users} = element.data();

    const rspns = users.sort().toString();
    const usrincld = userIncluded.sort().toString();

    if (rspns === usrincld) {
      conversation.push({id: element.id, ...element.data()} as ConversationDto);
    }
  });

  return conversation;
};
