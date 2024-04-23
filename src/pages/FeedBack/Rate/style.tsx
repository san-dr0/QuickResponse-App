import { View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../../constants/colors";

export const CustomizeContainerModal = styled(View)`
    width: 300px;
    height: 300px;
    background-color: ${COLOR_LISTS.GREY_300};
    align-self: center;
    border-radius: 10px;
`;
