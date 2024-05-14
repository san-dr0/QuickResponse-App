import {AccountDTO, LoginDTO, SubscriptionDetailsDTO} from './User.type';

export type AccountTypeDTO = {
  credentials?: LoginDTO;
  account?: AccountDTO;
  subscriptionDetails: SubscriptionDetailsDTO
};

export type AccountContextTypeDTO = AccountTypeDTO & {
  activeUserInformation?: AccountTypeDTO;
  setActiveUserInformationFunction: (param: AccountTypeDTO) => void;
};
