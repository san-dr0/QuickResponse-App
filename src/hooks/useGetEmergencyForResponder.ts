import React, {useCallback, useEffect, useState} from 'react';
import {EmergencyDto} from '../dto/Emergency.dto';
import {saveResponderUponAcceptingAnEmergency} from '../service/emergency/Emergency.service';
import {EmergencyType} from '../enums/EmergencyType.enum';

type Props = {
  id: string;
  responderType: string;
};

export default function useGetEmergencyForResponder(props: Props) {
  const [data, setData] = useState<EmergencyDto[]>([]);
  const {id, responderType} = props;
  const sendRequest = useCallback(async () => {
    try {
      const resp = await saveResponderUponAcceptingAnEmergency(
        id,
        responderType as EmergencyType,
      );
      // console.log('RESPON', resp);
      setData(resp);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  return {
    data,
    setData,
  };
}
