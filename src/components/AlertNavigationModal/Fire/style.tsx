import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../../constants/colors";
import { MODAL_INCIDENT_HEIGHT, MODAL_INCIDENT_WIDTH } from "../../../constants/number";

export const FireParentContainer = styled(View)`
    display: flex;
    align-self: center;
`;

export const FireContainer = styled(TouchableOpacity)`
    width: ${MODAL_INCIDENT_WIDTH}px;
    height: ${MODAL_INCIDENT_HEIGHT}px;
    background-color: ${COLOR_LISTS.DEEP_ORANGE_800};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;