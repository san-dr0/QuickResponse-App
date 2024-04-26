import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {COLOR_LISTS} from '../../constants/colors';
import {APP_HEIGHT} from '../../constants/dimensions';

type AlertNavigationContainerProps = {
  display: boolean;
};

export const AlertNavigationContainer = styled(
  View,
)<AlertNavigationContainerProps>`
  margin-top: ${APP_HEIGHT - 400}px;
  width: 100%;
  height: 300px;
  background-color: ${COLOR_LISTS.ALERT_NAVIGATION_COLOR};
  padding: 10px;
  display: ${(props: AlertNavigationContainerProps) =>
    props.display ? 'block' : 'none'};
`;

export const NavigateFlexContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Arrow = styled(TouchableOpacity)<AlertNavigationContainerProps>`
  width: 80px;
  height: 80px;
  background-color: red;
  position: absolute;
  bottom: 0;
  margin-bottom: ${(props: AlertNavigationContainerProps) =>
    !props.display ? '-616px' : '300px'};
  align-self: center;
  border-radius: 100px;
`;
