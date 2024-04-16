import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../../constants/colors";
import { MODAL_INCIDENT_HEIGHT, MODAL_INCIDENT_WIDTH } from "../../../constants/number";

export const MedicalParentContainer = styled(View)`
    display: flex;
    margin-left: 20px;
    width: 100px;
`;

export const MedicalContainer = styled(TouchableOpacity)`
    width: ${MODAL_INCIDENT_WIDTH}px;
    height: ${MODAL_INCIDENT_HEIGHT}px;
    background-color: ${COLOR_LISTS.GREEN_400};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;
