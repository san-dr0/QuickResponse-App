import { TouchableOpacity } from "react-native";
import styled from "styled-components";

type BackgroundProps = {
    backgroundColor?: string;
};

export const LikeButton = styled(TouchableOpacity)<BackgroundProps>`
    background-color: ${(props: BackgroundProps) => props.backgroundColor};
    width: 50px;
    border-radius: 5px;
    padding: 5px;
`;
