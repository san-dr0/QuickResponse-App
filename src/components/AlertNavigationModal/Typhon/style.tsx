import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../../constants/colors";
import { MODAL_INCIDENT_HEIGHT, MODAL_INCIDENT_WIDTH } from "../../../constants/number";

export const TyphonParentContainer = styled(View)`
    display: flex;
    margin-top: 5px;
    margin-left: 20px;
    width: 100px;
`;

export const TyphonContainer = styled(TouchableOpacity)`
    width: ${MODAL_INCIDENT_WIDTH}px;
    height: ${MODAL_INCIDENT_HEIGHT}px;
    background-color: ${COLOR_LISTS.GREY_500};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;
