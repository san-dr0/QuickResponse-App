import { View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../../constants/colors";

type CustomizeContainerModalProps = {
    isVisible?: boolean;
};

export const CustomizeContainerModal = styled(View)<CustomizeContainerModalProps>`
    display: ${(props: CustomizeContainerModalProps) => props.isVisible ? 'block' : 'none'};
    width: 300px;
    height: 300px;
    background-color: ${COLOR_LISTS.GREY_500};
    align-self: center;
    border-radius: 10px;
`;
