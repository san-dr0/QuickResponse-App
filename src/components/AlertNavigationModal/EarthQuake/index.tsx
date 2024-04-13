import TextLabel from '../../TextLabel';
import * as S from './style';

export const EarthQuakeComponent = () => {
    return <S.EarthQuakeParentContainer>
        <S.EarthQuakeContainer />
        <TextLabel title="Earthquake" fontSize={18} fontWeight="bold" textAlign="center"/>
    </S.EarthQuakeParentContainer>
}