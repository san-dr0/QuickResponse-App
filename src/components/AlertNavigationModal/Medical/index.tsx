import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {EmergencyType} from '../../../enums/EmergencyType.enum';
import TextLabel from '../../TextLabel';
import * as S from './style';

type EmergencyTypeProps = {
  onPressAlertNavigationGeneric: (param: EmergencyType) => void;
};
export const MedicalComponent = (props: EmergencyTypeProps) => {
  const {onPressAlertNavigationGeneric} = props;

  return (
    <S.MedicalParentContainer>
      <S.MedicalContainer
        onPress={() => onPressAlertNavigationGeneric(EmergencyType.MEDICAL)}>
        <FontAwesome6Icon name="suitcase-medical" size={30} />
      </S.MedicalContainer>
      <TextLabel
        title="Medical"
        fontSize={15}
        fontWeight="bold"
        textAlign="center"
      />
    </S.MedicalParentContainer>
  );
};
