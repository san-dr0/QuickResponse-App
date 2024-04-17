import React, {useState} from 'react';
import createAppContext from '../utils/createContext';
import {AlertContextTypeDTO} from '../types/Alert.type';

type AlertProviderProps = {
  children: React.ReactNode;
};

const [useAlertContext, AlertContextProvider] =
  createAppContext<AlertContextTypeDTO>();

function AlertProvider(props: AlertProviderProps) {
  const [hasAlerts, setHasAlerts] = useState<boolean>(false);

  function getValues(): AlertContextTypeDTO {
    return {
      hasAlerts,
      setHasAlerts,
    };
  }

  return (
    <AlertContextProvider value={getValues()}>
      {props.children}
    </AlertContextProvider>
  );
}

export {AlertProvider, useAlertContext};
