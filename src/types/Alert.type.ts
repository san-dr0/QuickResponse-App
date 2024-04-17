export type AlertTypeDTO = {
  totalAlerts: boolean;
};

export type AlertContextTypeDTO = {
  hasAlerts: boolean;
  setHasAlerts: (param: boolean) => void;
};
