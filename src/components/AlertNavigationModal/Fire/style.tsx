import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../../constants/colors";

export const FireParentContainer = styled(View)`
    display: flex;
    align-self: center;
`;

export const FireContainer = styled(TouchableOpacity)`
    width: 100px;
    height: 50px;
    background-color: ${COLOR_LISTS.RED_400};
    border-radius: 5px;
`;