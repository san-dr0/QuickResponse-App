import React, {useCallback, useEffect, useState} from 'react';
import {ConversationDto} from '../types/Message.type';
import {getConversationById} from '../service/message/message.service';

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
    sendRequest();
  }, [id]);

  return {
    data,
    setData,
  };
}
