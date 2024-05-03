import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import TextLabel from '../TextLabel';
import {AccidentComponent} from './Accident';
import {EarthQuakeComponent} from './EarthQuake';
import {FireComponent} from './Fire';
import {FloodComponent} from './Flood';
import {MedicalComponent} from './Medical';
import {TyphonComponent} from './Typhon';
import * as S from './style';

type EmergencyTypeProps = {
  onPressAlertNavigationGeneric: (param: EmergencyType) => void;
};

export const AlertNavigationModal = (props: EmergencyTypeProps) => {
  const {onPressAlertNavigationGeneric} = props;
  const [displayEmergencyList, setDisplayEmergencyList] =
    useState<boolean>(false);

  const onToggleArrow = () => {
    setDisplayEmergencyList(!displayEmergencyList);
  };

  return (
    <>
      <S.Arrow display={displayEmergencyList} onPress={onToggleArrow}>
        <FontAwesome6Icon
          name={!displayEmergencyList? "angles-up" : "angles-down"}
          size={50}
          style={{
            alignSelf: 'center',
            marginTop: 10,
          }}
        />
      </S.Arrow>
      <S.AlertNavigationContainer display={displayEmergencyList}>
        <FireComponent
          onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
        />
        <S.NavigateFlexContainer>
          <MedicalComponent
            onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
          />
          <EarthQuakeComponent
            onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
          />
        </S.NavigateFlexContainer>
        <S.NavigateFlexContainer>
          <TyphonComponent
            onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
          />
          <FloodComponent
            onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
          />
        </S.NavigateFlexContainer>
        <AccidentComponent
          onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
        />
      </S.AlertNavigationContainer>
    </>
  );
};
