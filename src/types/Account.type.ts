import {AccountDTO, LoginDTO} from './User.type';

export type AccountTypeDTO = {
  credentials?: LoginDTO;
  account?: AccountDTO;
};

export type AccountContextTypeDTO = AccountTypeDTO & {
  activeUserInformation?: AccountTypeDTO;
  setActiveUserInformationFunction: (param: AccountTypeDTO) => void;
};
