import React, {useCallback, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextLabel from '../../components/TextLabel';
import QRAMap from '../../components/Map';
import {AlertNavigationModal} from '../../components/AlertNavigationModal';
import {APP_HEIGHT} from '../../constants/dimensions';
import * as S from './style';

export default function HomeDashBoard() {
  return (
    <S.DashBoardHomeContainer>
      {/* <QRAMap /> */}
      <AlertNavigationModal />
    </S.DashBoardHomeContainer>
  );
}
