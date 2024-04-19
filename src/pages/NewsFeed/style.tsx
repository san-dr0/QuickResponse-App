import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import styled from 'styled-components';
import {COLOR_LISTS} from '../../constants/colors';

type DottedUIProps = {
  marginTop?: number;
};

export const NewsFeedParentContainer = styled(View)``;

export const NewsFeedActionButton = styled(ActionButton)`
  position: absolute;
  bottom: 0;
  margin-bottom: -20px;
  right: 0;
  margin-right: -20px;
`;

export const DottedUI = styled(View)<DottedUIProps>`
  width: 5px;
  height: 5px;
  background-color: ${COLOR_LISTS.BLACK};
  border-radius: 100px;
  margin-top: ${(props: DottedUIProps) => props.marginTop ?? 0};
`;
