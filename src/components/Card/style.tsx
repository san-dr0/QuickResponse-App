import { View } from "react-native";
import styled from "styled-components";
import { COLOR_LISTS } from "../../constants/colors";

type CardContainerProps = {
    backgroundColor?: string;
    width?: string;
    height?: string;
    padding?: number;
    borderRadius?: number;
    margin?: string;
};

export const CardContainer = styled(View)<CardContainerProps>`
    width: ${(props: CardContainerProps) => props.width ?? 'auto'}px;
    height: ${(props: CardContainerProps) => props.height ?? 'auto'}px;
    background: ${(props: CardContainerProps) => props.backgroundColor ?? COLOR_LISTS.WHITE};
    padding: ${(props: CardContainerProps) => props.padding ?? 0}px;
    border-radius: ${(props: CardContainerProps) => props.borderRadius ?? 0}px;
    margin: ${(props: CardContainerProps) => props.margin ?? 0}px;
`;