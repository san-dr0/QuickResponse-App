import {View} from 'react-native';
import styled from 'styled-components';
import {COLOR_LISTS} from '../../constants/colors';
import {APP_WIDTH, APP_HEIGHT} from '../../constants/dimensions';

export const DashBoardHomeContainer = styled(View)``;

export const AlertModal = styled(View)`
  width: ${APP_WIDTH - 50}px;
  height: ${APP_HEIGHT / 2}px;
  background-color: ${COLOR_LISTS.WHITE};
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  border-radius: 10px;
`;
