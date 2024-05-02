import {View} from 'react-native';
import styled from 'styled-components';
import { COLOR_LISTS } from '../../constants/colors';

export const AlertBadge = styled(View)`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 100px;
  right: 0;
  margin-right: 20px;
  top: 0;
  margin-top: 3px;
`;

export const AlertIdentifier = styled(View)`
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 100px;
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 5px;
  margin-right: -3px;
  z-index: 100;
`;

export const UserNotificationBadge = styled(View)`
  width: 8px;
  height: 8px;
  background-color: ${COLOR_LISTS.RED};
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  margin-right: 20px;
`;
