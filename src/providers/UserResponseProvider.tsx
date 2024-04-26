import React, {useState} from 'react';
import createAppContext from '../utils/createContext';
import {AlertUserContextDto, AlertUserDataDto} from '../types/Alert.type';

type AlertProviderProps = {
  children: React.ReactNode;
};

const [useUserAlertContext, UserResponderProvider] =
  createAppContext<AlertUserContextDto>();

function UserRespondProvider(props: AlertProviderProps) {
  const [userAlert, setUserAlert] = useState<AlertUserDataDto | undefined>(
    undefined,
  );

  function getValues(): AlertUserContextDto {
    return {
      userAlert,
      setUserAlert,
    };
  }

  return (
    <UserResponderProvider value={getValues()}>
      {props.children}
    </UserResponderProvider>
  );
}

export {UserRespondProvider, useUserAlertContext};
