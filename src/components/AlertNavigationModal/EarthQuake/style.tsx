import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../../constants/colors";

export const EarthQuakeParentContainer = styled(View)`
    display: flex;
    margin-top: 10px;
    margin-left: 20px;
    width: 100px;
`;

export const EarthQuakeContainer = styled(TouchableOpacity)`
    width: 100px;
    height: 50px;
    background-color: ${COLOR_LISTS.GREEN_400};
    border-radius: 5px;
`;
