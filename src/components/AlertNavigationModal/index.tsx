import React from 'react';
import {EmergencyType} from '../../enums/EmergencyType.enum';
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

  return (
    <S.AlertNavigationContainer>
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
  );
};
