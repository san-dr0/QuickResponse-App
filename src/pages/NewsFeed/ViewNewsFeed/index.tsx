import {Alert, ToastAndroid, View} from 'react-native';
import TextLabel from '../../../components/TextLabel';
import {CardComponent} from '../../../components/Card';
import {useEffect, useState} from 'react';
import {useNewsFeed} from '../../../hooks/useNewsFeed';
import {NewsFeedDTO} from '../../../dto/NewsFeed.dto';
import {COLOR_LISTS} from '../../../constants/colors';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import * as S from './style';
import {yourFeedBackWasValues} from '../../../constants/string';
import {useAccountContext} from '../../../providers/AccountProvider';
import ImageComponent from '../../../components/ImageContainer';

export default function ViewNewsFeed(props: any) {
  const {navigation} = props;
  const {params} = props.route;
  const {activeUserInformation} = useAccountContext();
  const {
    sendGetCertainNewsFeed: sendRequest,
    sendThumbsUp: sendLikes,
    sendDisLike: sendUnlike,
    sendReports: sendUnlikeReport,
  } = useNewsFeed();
  const [certainFeed, setCertainFeed] = useState<NewsFeedDTO>();

  async function certainNewsFeed() {
    const result = await sendRequest(params?.feedID);
    const data = result?.data() as NewsFeedDTO;

    setCertainFeed(data);
  } // get certain news feed

  const onThumbsUp = () => {
    try {
      sendLikes(params?.feedID, activeUserInformation?.account?.fbID as string);
      ToastAndroid.show(`${yourFeedBackWasValues}`, ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert('Oops', `On thumbs up, ${error?.message}`);
    }
  };

  const onThumbsDown = () => {
    try {
      sendUnlike(
        params?.feedID,
        activeUserInformation?.account?.fbID as string,
      );
      ToastAndroid.show(`${yourFeedBackWasValues}`, ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert('Oops', `On thumbs up, ${error?.message}`);
    }
  };

  const onReportNewsFeed = () => {
    try {
      sendUnlikeReport(
        params?.feedID,
        activeUserInformation?.account?.fbID as string,
      );
      ToastAndroid.show(`${yourFeedBackWasValues}`, ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert('Oops', `On thumbs up, ${error?.message}`);
    }
  };

  useEffect(() => {
    certainNewsFeed();
  }, []);

  return (
    <View style={{padding: 5}}>
      {certainFeed ? (
        <CardComponent backgroundColor={COLOR_LISTS.GREY_300} borderRadius={5}>
          {certainFeed?.image === 'N/A' ? (
            <FontAwesome6Icon
              name="image"
              size={80}
              style={{alignSelf: 'center'}}
            />
          ) : (
            <View style={{alignItems: 'center', padding: 5}}>
              <ImageComponent
                imageSrc={certainFeed?.image}
                width={200}
                height={200}
                isRemoteFile
              />
            </View>
          )}
          <View style={{padding: 5}}>
            <CardComponent
              backgroundColor={COLOR_LISTS.WHITE}
              padding={5}
              borderRadius={5}>
              <TextLabel title={certainFeed?.feed} />
              <TextLabel
                title={`${certainFeed?.lastname}, ${certainFeed?.firstname}`}
              />
              <TextLabel title={`Date: ${certainFeed?.date}`} />
            </CardComponent>
          </View>
          <View style={{flexDirection: 'row', padding: 5, alignSelf: 'center'}}>
            <View
              style={{justifyContent: 'space-around', flexDirection: 'row'}}>
              <S.LikeButton
                backgroundColor={COLOR_LISTS.BLUE_500}
                onPress={onThumbsUp}>
                <FontAwesome6Icon
                  name="thumbs-up"
                  size={20}
                  style={{textAlign: 'center'}}
                  color={COLOR_LISTS.WHITE}
                />
              </S.LikeButton>
              <View style={{padding: 5}} />
              <S.LikeButton
                backgroundColor={COLOR_LISTS.WHITE}
                onPress={onThumbsDown}>
                <FontAwesome6Icon
                  name="thumbs-down"
                  size={20}
                  style={{textAlign: 'center'}}
                  color={COLOR_LISTS.RED}
                />
              </S.LikeButton>
              <View style={{padding: 5}} />
              <S.LikeButton
                backgroundColor={COLOR_LISTS.WHITE}
                onPress={onReportNewsFeed}>
                <FontAwesome6Icon
                  name="person-burst"
                  size={20}
                  style={{textAlign: 'center'}}
                  color={COLOR_LISTS.ORANGE_500}
                />
              </S.LikeButton>
            </View>
          </View>
        </CardComponent>
      ) : (
        <TextLabel title="No records to show." />
      )}
    </View>
  );
}
