import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {EmergencyType} from '../../../enums/EmergencyType.enum';
import TextLabel from '../../TextLabel';
import * as S from './style';

type EmergencyTypeProps = {
  onPressAlertNavigationGeneric: (param: string) => void;
};

export const TyphonComponent = (props: EmergencyTypeProps) => {
  const {onPressAlertNavigationGeneric} = props;

  return (
    <S.TyphonParentContainer>
      <S.TyphonContainer
        onPress={() => onPressAlertNavigationGeneric(EmergencyType.TYPHOON)}>
        <FontAwesome6Icon name="hurricane" size={30} />
      </S.TyphonContainer>
      <TextLabel
        title="Typhoon"
        fontSize={15}
        fontWeight="bold"
        textAlign="center"
      />
    </S.TyphonParentContainer>
  );
};
