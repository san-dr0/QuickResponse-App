import {Alert, FlatList, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {CardComponent} from '../../components/Card';
import DivComponent from '../../components/DivContainer';
import ImageComponent from '../../components/ImageContainer';
import TextLabel from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import {APP_HEIGHT, APP_WIDTH} from '../../constants/dimensions';
import {useNewsFeed} from '../../hooks/useNewsFeed';
import * as S from './style';
import TextInputComponent from '../../components/TextInput';
import TextInputEnum from '../../enums/TextInput.enum';
import DividerComponent from '../../components/Divider';
import {NewsFeedDTO} from '../../dto/NewsFeed.dto';
import {useAccountContext} from '../../providers/AccountProvider';
import {Badge} from 'react-native-paper';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useState } from 'react';

export default function NewsFeedDashBoard(props: any) {
  const {navigation} = props;
  const {newsFeedData, requestMessage, setRequestMessage, getNewsFeed, sendRemoveNewsFeed, searchFromNewsFeed, setNewsData} =
    useNewsFeed();
  const {activeUserInformation} = useAccountContext();
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');

  const onCreateNewsFeed = () => {
    navigation.navigate('CreateNewsFeed', {
      actionType: 'create',
    });
  };

  const onEditNewsFeed = (item: NewsFeedDTO) => {
    const {feed, feedID, userID} = item;

    if (userID !== activeUserInformation?.account?.fbID) {
      Alert.alert(
        'Oops',
        `You can not Edit News Feed that is not yours!`,
      );
      return;
    }
    navigation.navigate('CreateNewsFeed', {
      actionType: 'edit',
      newsFeed: {
        feed,
        feedID,
      },
    });
  };

  const onRemoveNewsFeed = (item: NewsFeedDTO) => {
    const {userID, feedID} = item;

    if (userID !== activeUserInformation?.account?.fbID) {
      Alert.alert(
        'Oops',
        `You can not remove News Feed that is not yours!`,
      );
      return;
    }
    sendRemoveNewsFeed(feedID);

    ToastAndroid.show('You created news feed was removed!', ToastAndroid.SHORT);
  };

  const onViewNewsFeed = (item: NewsFeedDTO) => {
    const {feedID} = item;
    navigation.navigate('ViewNewsFeed', {
      feedID,
    });
  };

  const onSearchNewsFeed = async (e: any) => {
    try {
      setSearchKeyWord(e);
      const result = await searchFromNewsFeed(e, e, e);
     
      setNewsData(result);
    } catch (error: any) {
      console.log('ERR >> ', error?.message);
    }
  };

  const renderNewsFeed = ({item}: any) => {
    return (
      <CardComponent
        width={`${APP_WIDTH}`}
        padding={10}
        backgroundColor={COLOR_LISTS.WHITE}
        margin="5px 0 0 0">
        <DivComponent alignItems="flex-end" width="125">
          <Menu>
            <MenuTrigger style={{width: 100}}>
              <S.DottedUI />
              <S.DottedUI />
              <S.DottedUI />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption text="View" onSelect={() => onViewNewsFeed(item)} />
              <MenuOption text="Edit" onSelect={() => onEditNewsFeed(item)} />
              <MenuOption
                text="Remove"
                onSelect={() => onRemoveNewsFeed(item)}
              />
            </MenuOptions>
          </Menu>
        </DivComponent>
        {item?.image !== 'N/A' ? (
          <DivComponent alignItems="center">
            <ImageComponent
              imageSrc={item?.image}
              width={200}
              height={200}
              isRemoteFile
            />
          </DivComponent>
        ) : (
          <FontAwesome6Icon
            name="image"
            size={80}
            style={{alignSelf: 'center'}}
          />
        )}
        <DividerComponent margin="5px 0 0 0" />
        <TextLabel title={item?.feed} />
        <TextLabel title={`${item?.lastname}, ${item?.firstname}`} />
        <TextLabel title={item?.date} />
        <DividerComponent margin="10px 0 0 0" />
        <DivComponent flexDirection="row" justifyContent="space-around">
          <View style={{flexDirection: 'row'}}>
            <TextLabel title="Like: " />
            <Badge style={{backgroundColor: COLOR_LISTS.BLUE_400}}>
              {item?.likes}
            </Badge>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextLabel title="DisLike:" />
            <Badge style={{backgroundColor: COLOR_LISTS.RED_400}}>
              {item?.disLikes}
            </Badge>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextLabel title="Reports:" />
            <Badge style={{backgroundColor: COLOR_LISTS.ORANGE_700}}>
              {item?.reports}
            </Badge>
          </View>
        </DivComponent>
      </CardComponent>
    );
  };

  const onRemoveSearchKeyWord = () => {
    setSearchKeyWord("");
    getNewsFeed(); // we really inteded to retrigger this.
  };

  return (
    <>
      <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            // paddingHorizontal: 14,
          }}>
        <TextInputComponent
          textMode={TextInputEnum.FLAT}
          label="Search"
          width="90%"
          align="center"
          value={searchKeyWord}
          onChangeText={(e) => onSearchNewsFeed(e)}
        />
        <TouchableOpacity
          onPress={onRemoveSearchKeyWord}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            marginRight: 30,
            marginTop: 25,
          }}>
          <FontAwesome6Icon name="xmark"
            size={25}
          />
        </TouchableOpacity>
      </View>

      <DividerComponent margin="5px 0 0 0" />
      <S.NewsFeedParentContainer>
        <View style={{height: APP_HEIGHT - 180}}>
          {newsFeedData.length > 0 ? (
            <FlatList data={newsFeedData} renderItem={renderNewsFeed} />
          ) : (
            <View style={{padding: 5}}>
              <TextLabel
                title={requestMessage}
                textAlign="center"
                fontSize={18}
              />
            </View>
          )}
        </View>
        <S.NewsFeedActionButton
          buttonColor={COLOR_LISTS.RED}
          onPress={onCreateNewsFeed}
        />
      </S.NewsFeedParentContainer>
    </>
  );
}
