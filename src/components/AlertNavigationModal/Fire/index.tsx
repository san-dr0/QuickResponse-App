import { View } from "react-native"
import * as S from './style';
import TextLabel from "../../TextLabel";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

export const FireComponent = () => {
    return <S.FireParentContainer>
        <S.FireContainer>
            <FontAwesome6Icon name="fire" size={30} />
        </S.FireContainer>
        <TextLabel title="Fire" textAlign="center" fontSize={15} fontWeight="bold" />
    </S.FireParentContainer>
}