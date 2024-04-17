import React, {useState} from 'react';
import createAppContext from '../utils/createContext';
import {AccountContextTypeDTO, AccountTypeDTO} from '../types/Account.type';
import { AlertContextTypeDTO, AlertTypeDTO } from '../types/Alert.type';

type AlertProviderProps = {
  children: React.ReactNode;
};

const [useAlertContext, AccountContextProvider] =
  createAppContext<AlertContextTypeDTO>();

function AlertProvider(props: AlertProviderProps) {
  const [totalAlerts, setTotalAlerts] = useState<
    AlertTypeDTO
  >({totalAlerts: 0});

  function getValues(): AlertContextTypeDTO {
    return {
        totalAlerts,
        setTotalAlerts
    }
  }

  return (
    <AccountContextProvider value={getValues()}>
      {props.children}
    </AccountContextProvider>
  );
}

export {AlertProvider, useAlertContext};
