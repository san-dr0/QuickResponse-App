import { View } from "react-native"
import * as S from './style';
import TextLabel from "../../TextLabel";

export const FireComponent = () => {
    return <S.FireParentContainer>
        <S.FireContainer />
        <TextLabel title="Fire" textAlign="center" fontSize={18} fontWeight="bold" />
    </S.FireParentContainer>
}