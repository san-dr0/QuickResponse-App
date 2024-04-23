import {View} from 'react-native';
import * as S from './style';
import { APP_HEIGHT } from '../../../constants/dimensions';
import { Rating } from 'react-native-ratings';

export const Rate = () => {
  return <View style={{height: '100%', justifyContent: 'center'}}>
    <S.CustomizeContainerModal>
      <Rating type='star' ratingCount={5} imageSize={60} />
    </S.CustomizeContainerModal>
</View>
};
