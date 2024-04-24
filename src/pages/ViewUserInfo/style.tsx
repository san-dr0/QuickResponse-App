import {TouchableOpacity, View} from 'react-native';
import {Modal} from 'react-native-paper';
import styled from 'styled-components';

type ProfileBadgeContainerProps = {
  backgroundColor?: string;
  width?: string;
  borderColor?: string;
};
export const ProfileBadgeContainer = styled(View)<ProfileBadgeContainerProps>`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props: ProfileBadgeContainerProps) =>
    props.backgroundColor ?? '#FFF'};
  width: ${(props: ProfileBadgeContainerProps) => props.width ?? '20'}%;
  border: 1px
    ${(props: ProfileBadgeContainerProps) => props.borderColor ?? '#FFF'};
`;

export const UploadFileContainer = styled(TouchableOpacity)`
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 100px;
  position: absolute;
  bottom: 0;
  left: 1px;
  margin-left: 200px;
`;

export const ProfileModalComponent = styled(Modal)`
  position: absolute;
  bottom: 0;
`;
