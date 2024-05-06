import {EmergencyDto} from '../dto/Emergency.dto';

export type AlertTypeDTO = {
  totalAlerts: boolean;
};

export type AlertItemDTO = {
  title?: string;
  body?: string;
  isActive?: boolean;
  emergencyID?: string;
  emergency: EmergencyDto;
};

export type AlertContextTypeDTO = {
  alerts?: AlertItemDTO;
  setAlertRecords: (param: AlertItemDTO) => void;
};

export type AlertUserDataDto = {
  title: string;
  body: string;
  isOpen: boolean;
  emergencyId: string;
};

export type AlertUserContextDto = {
  userAlert: AlertUserDataDto | undefined;
  setUserAlert: (params: AlertUserDataDto) => void;
};

export type UserNotificationContextDataDTO = {
  isActive?: boolean;
};

export type UserNotificationContextDTO = {
  isActiveUserNotification: UserNotificationContextDataDTO | undefined;
  setIsActiveUserNotification: (param: UserNotificationContextDataDTO) => void;
  totalRespondedOfMyEmergency: number;
  setTotalRespondedOfMyEmergency: (param: number) => void;
};
