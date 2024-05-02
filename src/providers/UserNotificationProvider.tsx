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

  function setIsActiveUserNotification(param: UserNotificationContextDataDTO) {
    setActiveUserNotification(param);
  }
  function getValues(): UserNotificationContextDTO {
    return {
      isActiveUserNotification,
      setIsActiveUserNotification,
    };
  }
  return (
    <UserNotificationContextProvider value={getValues()}>
      {props?.children}
    </UserNotificationContextProvider>
  );
}

export {UserNotificationProvider, userUserNotificationContext};
