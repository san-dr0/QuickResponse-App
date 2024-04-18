export type AlertTypeDTO = {
  totalAlerts: boolean;
};

export type AlertItemDTO = {
  title?: string;
  body?: string;
  isActive?: boolean;
  emergencyID?: string;
};

export type AlertContextTypeDTO = {
  alerts?: AlertItemDTO,
  setAlertRecords: (param: AlertItemDTO) => void;
};
