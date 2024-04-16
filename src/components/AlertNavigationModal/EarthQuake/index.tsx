import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {EmergencyType} from '../../../enums/EmergencyType.enum';
import TextLabel from '../../TextLabel';
import * as S from './style';

type EmergencyTypeProps = {
  onPressAlertNavigationGeneric: (param: string) => void;
};
export const EarthQuakeComponent = (props: EmergencyTypeProps) => {
  const {onPressAlertNavigationGeneric} = props;

  return (
    <S.EarthQuakeParentContainer>
      <S.EarthQuakeContainer
        onPress={() => onPressAlertNavigationGeneric(EmergencyType.EARTHQUAKE)}>
        <FontAwesome6Icon name="house-crack" size={30} />
      </S.EarthQuakeContainer>
      <TextLabel
        title="Earthquake"
        fontSize={15}
        fontWeight="bold"
        textAlign="center"
      />
    </S.EarthQuakeParentContainer>
  );
};
