import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import TextLabel from '../../components/TextLabel';
import {APP_WIDTH} from '../../constants/dimensions';
import {TouchableCardComponent} from '../../components/TouchableCard';
import {APP_FONT_SIZE, APP_PADDING} from '../../constants/number';
import {convertFirstCharacterOfWordToUpperCase} from '../../utils/format-display';
import {useFirstAid} from '../../hooks/useFirstAidHooks';
import {FirstAidDTO} from '../../types/FirstAid.type';
import { COLOR_LISTS } from '../../constants/colors';

export default function FirstAidDashBoard(props: any) {
  const {navigation} = props;
  const {sendGetAllFirstAid} = useFirstAid();
  const [firstAidList, setFirstAidList] = useState<FirstAidDTO[] | undefined>(
    undefined,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onViewFirstAidInformation = (
    firstAidID: string,
    firstAidInfo: {
      id: string;
      title: string;
    },
  ) => {
    const {title} = firstAidInfo;

    navigation.navigate('FirstAid-Information', {
      firstAidID: firstAidID,
      firstAidTitle: title,
    });
  };

  const getAllFirstAid = async () => {
    const result = await sendGetAllFirstAid();
    const castResult = result.docs as any;

    setFirstAidList(castResult);
  };

  const onRefreshPage = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
  useEffect(() => {
    getAllFirstAid();
  }, [refreshing]);

  const renderFirstAid = ({item}: any) => {
    return (
      <TouchableCardComponent
        width={APP_WIDTH}
        padding={APP_PADDING.SEVEN}
        margin="5px 0 0 0"
        onPressFirstAidInformation={() =>
          onViewFirstAidInformation(item?.id, item?._data)
        }>
        <TextLabel
          title={convertFirstCharacterOfWordToUpperCase(item?._data?.title)}
          fontSize={APP_FONT_SIZE.EIGHTEN}
        />
      </TouchableCardComponent>
    );
  };

  return (
    <View style={{backgroundColor: COLOR_LISTS.GREY_300, height: '100%', padding: 5}}>
      <RefreshControl onRefresh={onRefreshPage} refreshing={refreshing}>
        <View
          style={{
            paddingLeft: APP_PADDING.FIFTEN,
            paddingRight: APP_PADDING.FIFTEN,
          }}>
          {firstAidList ? (
            <FlatList data={firstAidList} renderItem={renderFirstAid} />
          ) : (
            <TextLabel title="No first aid to show." />
          )}
        </View>
    </RefreshControl>
    </View>
  );
}
