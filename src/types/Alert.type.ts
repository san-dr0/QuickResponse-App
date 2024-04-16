export type AlertTypeDTO = {
    totalAlerts: number;
};

export type AlertContextTypeDTO = {
  totalAlerts: AlertTypeDTO;
  setTotalAlerts: (param: AlertTypeDTO) => void;
};
