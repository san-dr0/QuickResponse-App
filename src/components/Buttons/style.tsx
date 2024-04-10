import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import { COLOR_LISTS } from '../../constants/colors';

type ButtonContainerProps = {
  backgroundColor?: string;
  disabled?: boolean;
  textColor?: string;
  fontWeight?: string;
  fontSize?: number;
  margin?: string;
  alignSelf?: string;
  padding?: string;
  borderRadius?: string;
  width?: number;
};

export const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  background-color: ${(props: ButtonContainerProps) =>
    props.backgroundColor ? props.disabled ? COLOR_LISTS.GREY_500:props.backgroundColor: COLOR_LISTS.WHITE};
  color: ${(props: ButtonContainerProps) => props.textColor ?? '#000'};
  font-weight: ${(props: ButtonContainerProps) => props.fontWeight ?? 'normal'};
  font-size: ${(props: ButtonContainerProps) => props.fontSize ?? 12}px;
  margin: ${(props: ButtonContainerProps) => props.margin ?? '0 0 0 0'};
  align-self: ${(props: ButtonContainerProps) => props.alignSelf};
  width: ${(props: ButtonContainerProps) => props.width ?? '50'}%;
  padding: ${(props: ButtonContainerProps) => props.padding ?? 0}px;
  border-radius: ${(props: ButtonContainerProps) => props.borderRadius ?? 0}px;
`;
