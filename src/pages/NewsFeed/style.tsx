import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import styled from 'styled-components';
import {COLOR_LISTS} from '../../constants/colors';
import { APP_HEIGHT } from '../../constants/dimensions';

type DottedUIProps = {
  marginTop?: number;
};

export const NewsFeedParentContainer = styled(View)`
  height: ${APP_HEIGHT - 150}px;
`;

export const NewsFeedActionButton = styled(ActionButton)`
  position: absolute;
  bottom: 0;
`;

export const DottedUI = styled(View)<DottedUIProps>`
  width: 5px;
  height: 5px;
  background-color: ${COLOR_LISTS.BLACK};
  border-radius: 100px;
  margin-top: ${(props: DottedUIProps) => props.marginTop ?? 0};
`;
