import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../../constants/colors";
import { MODAL_INCIDENT_HEIGHT, MODAL_INCIDENT_WIDTH } from "../../../constants/number";

export const AccidentParentContainer = styled(View)`
    display: flex;
    align-self: center;
`;

export const AccidentContainer = styled(TouchableOpacity)`
    width: ${MODAL_INCIDENT_WIDTH}px;
    height: ${MODAL_INCIDENT_HEIGHT}px;
    background-color: ${COLOR_LISTS.ORANGE_900};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;