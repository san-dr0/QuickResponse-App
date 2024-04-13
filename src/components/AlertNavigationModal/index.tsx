import { View } from "react-native"
import TextLabel from "../TextLabel"
import * as S from './style';
import { FireComponent } from "./Fire";
import { MedicalComponent } from "./Medical";
import { EarthQuakeContainer } from "./EarthQuake/style";
import { EarthQuakeComponent } from "./EarthQuake";

export const AlertNavigationModal = () => {
    return <S.AlertNavigationContainer>
        <FireComponent />
        <S.NavigateFlexContainer>
            <MedicalComponent />
            <EarthQuakeComponent />
        </S.NavigateFlexContainer>
    </S.AlertNavigationContainer>
}