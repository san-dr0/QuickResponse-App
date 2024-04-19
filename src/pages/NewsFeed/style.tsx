import { View } from "react-native";
import ActionButton from "react-native-action-button";
import styled from "styled-components";
import { APP_HEIGHT } from "../../constants/dimensions";
import { COLOR_LISTS } from "../../constants/colors";

export const NewsFeedParentContainer = styled(View)`
    background-color: red;
`;

export const NewsFeedActionButton = styled(ActionButton)`
    position: absolute;
    bottom: 0;
`;
