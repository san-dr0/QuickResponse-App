import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import TextLabel from '../../TextLabel';
import * as S from './style';

export const AccidentComponent = () => {
    return <S.AccidentParentContainer>
        <S.AccidentContainer>
            <FontAwesome6Icon name='car-burst' size={30} />
        </S.AccidentContainer>
        <TextLabel title="Accident" fontSize={15} fontWeight="bold" textAlign="center"/>
    </S.AccidentParentContainer>
}