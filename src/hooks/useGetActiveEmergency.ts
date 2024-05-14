import React, {useCallback, useEffect, useState} from 'react';
import {EmergencyDto} from '../dto/Emergency.dto';
import {getAllActiveEmergency} from '../service/notification/Notification.service';
import {getActiveEmergency} from '../service/emergency/Emergency.service';

export default function useGetActiveEmergency() {
  const [data, setData] = useState<EmergencyDto[]>([]);

  const sendRequest = useCallback(async () => {
    try {
      // console.log('====================================');
      // console.log('TRIGGER');
      // console.log('====================================');
      const resp = await getActiveEmergency();

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
    sendRequest,
  };
}
