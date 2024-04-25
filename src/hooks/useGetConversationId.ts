import React, {useCallback, useEffect, useState} from 'react';
import {ConversationDto} from '../types/Message.type';
import {getConversationById} from '../service/message/message.service';
import firestore from '@react-native-firebase/firestore';
import {CONVERSATIONS} from '../constants/dbRef';

type Props = {
  id: string;
};

export default function useGetConversationId(props: Props) {
  const [data, setData] = useState<ConversationDto | null>(null);
  const {id} = props;

  const sendRequest = useCallback(async () => {
    try {
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
