import {View} from 'react-native';
import styled from 'styled-components';
import { APP_HEIGHT, APP_WIDTH } from '../../constants/dimensions';
import { COLOR_LISTS } from '../../constants/colors';

type HomeContainerProps = {
  display?: string;
  justifyContent?: string;
  height?: number;
};
export const HomeContainer = styled(View)<HomeContainerProps>`
  display: flex;
  justify-content: ${(props: HomeContainerProps) => props.justifyContent};
  height: ${(props: HomeContainerProps) => props.height}px;
`;

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
