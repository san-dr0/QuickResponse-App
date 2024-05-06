import React, {useState} from 'react';
import {
  UserNotificationContextDTO,
  UserNotificationContextDataDTO,
} from '../types/Alert.type';
import createAppContext from '../utils/createContext';

type UserNotificationProviderProps = {
  children: React.ReactNode;
};

const [userUserNotificationContext, UserNotificationContextProvider] =
  createAppContext<UserNotificationContextDTO>();

function UserNotificationProvider(props: UserNotificationProviderProps) {
  const [isActiveUserNotification, setActiveUserNotification] = useState<
    UserNotificationContextDataDTO | undefined
  >();
  const [totalRespondedOfMyEmergency, setTotalRespondedOfMyEmergency] = useState<number>(0);

  function setIsActiveUserNotification(param: UserNotificationContextDataDTO) {
    setActiveUserNotification(param);
  }
  function getValues(): UserNotificationContextDTO {
    return {
      isActiveUserNotification,
      setIsActiveUserNotification,
      totalRespondedOfMyEmergency,
      setTotalRespondedOfMyEmergency
    };
  }
  return (
    <UserNotificationContextProvider value={getValues()}>
      {props?.children}
    </UserNotificationContextProvider>
  );
}

export {UserNotificationProvider, userUserNotificationContext};
