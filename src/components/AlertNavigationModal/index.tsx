import * as S from './style';
import { FireComponent } from "./Fire";
import { MedicalComponent } from "./Medical";
import { EarthQuakeComponent } from "./EarthQuake";
import { TyphonComponent } from './Typhon';
import { FloodComponent } from './Flood';
import { AccidentComponent } from './Accident';

export const AlertNavigationModal = () => {
    return <S.AlertNavigationContainer>
        <FireComponent />
        <S.NavigateFlexContainer>
            <MedicalComponent />
            <EarthQuakeComponent />
        </S.NavigateFlexContainer>
        <S.NavigateFlexContainer>
            <TyphonComponent />
            <FloodComponent />
        </S.NavigateFlexContainer>
        <AccidentComponent />
    </S.AlertNavigationContainer>
}