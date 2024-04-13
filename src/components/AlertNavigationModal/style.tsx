import { View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../constants/colors";
import { APP_HEIGHT, APP_WIDTH } from "../../constants/dimensions";

export const AlertNavigationContainer = styled(View)`
    margin-top: ${APP_HEIGHT - 400}px;
    width: 100%;
    height: 300px;
    background-color: ${COLOR_LISTS.ALERT_NAVIGATION_COLOR};
    padding-top: 10px;
`;

export const NavigateFlexContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;