export type AlertTypeDTO = {
  totalAlerts: boolean;
};

export type AlertItemDTO = {
  title?: string;
  body?: string;
  isActive?: boolean;
};

export type AlertContextTypeDTO = {
  alerts?: AlertItemDTO,
  setAlertRecords: (param: AlertItemDTO) => void;
};
