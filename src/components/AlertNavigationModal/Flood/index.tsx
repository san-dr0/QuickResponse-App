import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import TextLabel from '../../TextLabel';
import * as S from './style';

export const FloodComponent = () => {
    return <S.FloodParentContainer>
        <S.FloodContainer>
            <FontAwesome6Icon name="house-flood-water" size={30} />
        </S.FloodContainer>
        <TextLabel title="Flood" fontSize={15} fontWeight="bold" textAlign="center"/>
    </S.FloodParentContainer>
}
