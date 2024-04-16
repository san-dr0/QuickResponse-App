import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import TextLabel from '../../TextLabel';
import * as S from './style';

export const MedicalComponent = () => {
    return <S.MedicalParentContainer>
        <S.MedicalContainer>
            <FontAwesome6Icon name="suitcase-medical" size={30} />
        </S.MedicalContainer>
        <TextLabel title="Medical" fontSize={15} fontWeight="bold" textAlign="center"/>
    </S.MedicalParentContainer>
}