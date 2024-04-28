import {useCallback, useEffect, useState} from 'react';
import {ConversationDto} from '../types/Message.type';
import {
  getByUsersId,
  getConversationById,
} from '../service/message/message.service';
import firestore from '@react-native-firebase/firestore';
import {CONVERSATIONS} from '../constants/dbRef';
import {useAccountContext} from '../providers/AccountProvider';

type Props = {
  id: string | undefined;
  receiver: string | undefined;
};

export default function useGetConversationId(props: Props) {
  const [data, setData] = useState<ConversationDto | null>(null);
  const {id} = props;
  const {activeUserInformation} = useAccountContext();

  const sendRequest = useCallback(async () => {
    try {
      if (!id) {
        const userId = JSON.parse(
          activeUserInformation?.account?.fbID as string,
        );
        if (!props.receiver) {
          return;
        }
        const rs = await getByUsersId(userId, props.receiver);
        if (rs.length < 1) {
          console.log('GG');
          return;
        }
        setData(rs[0]);
        return;
      }

      const resp = await getConversationById(id);

      setData(resp);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    const unsubscribed = firestore()
      .collection(CONVERSATIONS)
      .onSnapshot(e => {
        sendRequest();
      });

    return unsubscribed;
  }, [id]);

  return {
    data,
    setData,
  };
}
