import TextLabel from '../../TextLabel';
import * as S from './style';

export const MedicalComponent = () => {
    return <S.MedicalParentContainer>
        <S.MedicalContainer />
        <TextLabel title="Medical" fontSize={18} fontWeight="bold" textAlign="center"/>
    </S.MedicalParentContainer>
}