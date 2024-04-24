import React, {useCallback, useEffect, useState} from 'react';
import {getEmergencyById} from '../service/emergency/Emergency.service';
import {EmergencyDto} from '../dto/Emergency.dto';

type Props = {
  emergencyId: string;
};

export default function useGetEmergencyById(props: Props) {
  const {emergencyId} = props;
  const [data, setData] = useState<EmergencyDto | null>(null);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const sendRequest = useCallback(async () => {
    try {
      const resposne = await getEmergencyById(emergencyId);

      console.log('geggg', resposne.data());
      setData(resposne.data() as EmergencyDto);
    } catch (error) {
      console.log('err', error);
    }
  }, [emergencyId]);

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    sendRequest();
  }, [isRefresh]);

  return {
    setIsRefresh,
    isRefresh,
    data,
    sendRequest,
  };
}
