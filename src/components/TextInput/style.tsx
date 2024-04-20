import {TextInput} from 'react-native-paper';
import styled from 'styled-components';

type TextInputContainerProps = {
  borderRadius?: number;
  height?: string;
  width?: string;
  align?: string;
};
export const TextInputContainer = styled(TextInput)<TextInputContainerProps>`
  border-radius: ${(props: TextInputContainerProps) =>
    props.borderRadius ?? 0}px;
  background-color: #fff;
  width: ${(props: TextInputContainerProps) => props.width ?? '100%'};
  height: ${(props: TextInputContainerProps) => props.height ?? 50}px;
  margin-top: 10px;
  align-self: ${(props: TextInputContainerProps) => props.align ?? 'flex-start'}
`;
