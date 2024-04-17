import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {EmergencyType} from '../../../enums/EmergencyType.enum';
import TextLabel from '../../TextLabel';
import * as S from './style';

type EmergencyTypeProps = {
  onPressAlertNavigationGeneric: (param: EmergencyType) => void;
};

export const FireComponent = (props: EmergencyTypeProps) => {
  const {onPressAlertNavigationGeneric} = props;

  return (
    <S.FireParentContainer>
      <S.FireContainer
        onPress={() => onPressAlertNavigationGeneric(EmergencyType.FIRE)}>
        <FontAwesome6Icon name="fire" size={30} />
      </S.FireContainer>
      <TextLabel
        title="Fire"
        textAlign="center"
        fontSize={15}
        fontWeight="bold"
      />
    </S.FireParentContainer>
  );
};
