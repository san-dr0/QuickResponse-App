import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import TextLabel from '../../TextLabel';
import * as S from './style';

export const EarthQuakeComponent = () => {
    return <S.EarthQuakeParentContainer>
        <S.EarthQuakeContainer>
            <FontAwesome6Icon name="house-crack" size={30} />
        </S.EarthQuakeContainer>
        <TextLabel title="Earthquake" fontSize={15} fontWeight="bold" textAlign="center"/>
    </S.EarthQuakeParentContainer>
}