import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {EmergencyType} from '../../../enums/EmergencyType.enum';
import TextLabel from '../../TextLabel';
import * as S from './style';

type EmergencyTypeProps = {
  onPressAlertNavigationGeneric: (param: EmergencyType) => void;
};
export const FloodComponent = (props: EmergencyTypeProps) => {
  const {onPressAlertNavigationGeneric} = props;

  return (
    <S.FloodParentContainer>
      <S.FloodContainer
        onPress={() => onPressAlertNavigationGeneric(EmergencyType.FLOOD)}>
        <FontAwesome6Icon name="house-flood-water" size={30} />
      </S.FloodContainer>
      <TextLabel
        title="Flood"
        fontSize={15}
        fontWeight="bold"
        textAlign="center"
      />
    </S.FloodParentContainer>
  );
};
