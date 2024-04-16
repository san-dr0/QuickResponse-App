import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {EmergencyType} from '../../../enums/EmergencyType.enum';
import TextLabel from '../../TextLabel';
import * as S from './style';

type EmergencyTypeProps = {
  onPressAlertNavigationGeneric: (param: string) => void;
};

export const AccidentComponent = (props: EmergencyTypeProps) => {
  const {onPressAlertNavigationGeneric} = props;

  return (
    <S.AccidentParentContainer>
      <S.AccidentContainer
        onPress={() =>
          onPressAlertNavigationGeneric(EmergencyType.CAR_ACCIDENT)
        }>
        <FontAwesome6Icon name="car-burst" size={30} />
      </S.AccidentContainer>
      <TextLabel
        title="Accident"
        fontSize={15}
        fontWeight="bold"
        textAlign="center"
      />
    </S.AccidentParentContainer>
  );
};
