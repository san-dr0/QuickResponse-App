import { EmergencyDto } from "../dto/Emergency.dto";

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
  alerts?: AlertItemDTO,
  setAlertRecords: (param: AlertItemDTO) => void;
};
