import React, {useState} from 'react';
import createAppContext from '../utils/createContext';
import {AlertContextTypeDTO, AlertItemDTO} from '../types/Alert.type';

type AlertProviderProps = {
  children: React.ReactNode;
};

type AlertPromptDTO = {
  alerts?: AlertItemDTO,
  setAlertRecords: (param: AlertItemDTO) => void;
};

const [useAlertContext, AlertContextProvider] =
  createAppContext<AlertContextTypeDTO>();

function AlertProvider(props: AlertProviderProps) {
  const [alerts, setAlerts] = useState<AlertItemDTO | undefined>(undefined);

  function setAlertRecords(params: AlertItemDTO) {
    setAlerts(params);
  };

  function getValues(): AlertPromptDTO {
    return {
      alerts,
      setAlertRecords
    };
  };

  return (
    <AlertContextProvider value={getValues()}>
      {props.children}
    </AlertContextProvider>
  );
}

export {AlertProvider, useAlertContext};
