import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import TextLabel from '../../TextLabel';
import * as S from './style';

export const TyphonComponent = () => {
    return <S.TyphonParentContainer>
        <S.TyphonContainer>
            <FontAwesome6Icon name="hurricane" size={30} />
        </S.TyphonContainer>
        <TextLabel title="Typhoon" fontSize={15} fontWeight="bold" textAlign="center"/>
    </S.TyphonParentContainer>
}