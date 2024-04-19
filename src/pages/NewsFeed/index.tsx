import React from 'react';
import {FlatList, View} from 'react-native';
import TextLabel from '../../components/TextLabel';
import * as S from './style';
import { COLOR_LISTS } from '../../constants/colors';
import { useNewsFeed } from '../../hooks/useNewsFeed';
import { CardComponent } from '../../components/Card';
import { formatDateFromFirebase } from '../../utils/date.utils';
import { APP_WIDTH } from '../../constants/dimensions';
import DividerComponent from '../../components/Divider';
import DivComponent from '../../components/DivContainer';
import ImageComponent from '../../components/ImageContainer';

export default function NewsFeedDashBoard(props: any) {
  const {navigation} = props;
  const {newsFeedData} = useNewsFeed();

  const onCreateNewsFeed = () => {
    navigation.navigate('CreateNewsFeed');
  };

  const renderNewsFeed = ({item}: any) => {
    return <DivComponent alignItems='center' backgroundColor={COLOR_LISTS.GREY_300}>
      <CardComponent width={`${APP_WIDTH - 50}`} padding={10} backgroundColor={COLOR_LISTS.WHITE} margin='5px 0 0 0'>
        {
          item?.image !== 'N/A' && 
          <DivComponent alignItems='center'>
            <ImageComponent imageSrc={item?.image} width={100} height={80} isRemoteFile />
          </DivComponent>
        }
        <TextLabel title={item?.feed} />
        <TextLabel title={`${item?.lastname}, ${item?.firstname}`} />
        <TextLabel title={`Date: ${formatDateFromFirebase(item?.date?.nanoseconds, item?.date?.seconds)}`} />
    </CardComponent>
    </DivComponent>
  };

  return (
    <S.NewsFeedParentContainer>
      <FlatList data={newsFeedData} renderItem={renderNewsFeed} />
      <S.NewsFeedActionButton buttonColor={COLOR_LISTS.RED} onPress={onCreateNewsFeed}>
      </S.NewsFeedActionButton>
    </S.NewsFeedParentContainer>
  );
}
