import {TextInput} from 'react-native-paper';
import styled from 'styled-components';

type TextInputContainerProps = {
  borderRadius?: number;
  height?: string;
};
export const TextInputContainer = styled(TextInput)<TextInputContainerProps>`
  border-radius: ${(props: TextInputContainerProps) =>
    props.borderRadius ?? 0}px;
  background-color: #fff;

  height: ${(props: TextInputContainerProps) => props.height ?? 50}px;
  margin-top: 10px;
`;
