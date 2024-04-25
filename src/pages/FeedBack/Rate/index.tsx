import {Alert, FlatList, RefreshControl, ToastAndroid, TouchableOpacity, View} from 'react-native';
import * as S from './style';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { COLOR_LISTS } from '../../../constants/colors';
import { useEffect, useState } from 'react';
import TextLabel from '../../../components/TextLabel';
import DividerComponent from '../../../components/Divider';
import { useNewsFeed } from '../../../hooks/useNewsFeed';
import { useAccountContext } from '../../../providers/AccountProvider';
import ActionButton from 'react-native-action-button';
import { CardComponent } from '../../../components/Card';
import DivComponent from '../../../components/DivContainer';
import { displayConfiguredRatingBar } from '../../../utils/format-display';

export const Rate = () => {
  const {sendRatingFeedBack, sendGetAllRatingFeedBack} = useNewsFeed();
  const {activeUserInformation} = useAccountContext();
  const [qrAppRating, setQrAppRating] = useState<{ratingID: number, activeColor: string, defaultColor: string, isActive: boolean, ratingCount: number}[]>(
    [
      {
        ratingID: 1,
        activeColor: COLOR_LISTS.AMBER_700_ACCENT,
        defaultColor: COLOR_LISTS.GREY_300,
        isActive: true,
        ratingCount: 1
      },
      {
        ratingID: 2,
        activeColor: COLOR_LISTS.AMBER_700_ACCENT,
        defaultColor: COLOR_LISTS.GREY_300,
        isActive: false,
        ratingCount: 2
      },
      {
        ratingID: 3,
        activeColor: COLOR_LISTS.AMBER_700_ACCENT,
        defaultColor: COLOR_LISTS.GREY_300,
        isActive: false,
        ratingCount: 3
      },
      {
        ratingID: 4,
        activeColor: COLOR_LISTS.AMBER_700_ACCENT,
        defaultColor: COLOR_LISTS.GREY_300,
        isActive: false,
        ratingCount: 4
      },
      {
        ratingID: 5,
        activeColor: COLOR_LISTS.AMBER_700_ACCENT,
        defaultColor: COLOR_LISTS.GREY_300,
        isActive: false,
        ratingCount: 5
      },
    ]
  );
  const [maxRating, setMaxRating] = useState<number>(1);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [ratingRecords, setRatingRecords] = useState<{ratingCount: number, userID: string}[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const onSetRating = (ratingID: number, ratingCount: number) => {
    setMaxRating(ratingCount);

    let rating  = qrAppRating.map((rating) => {
      rating.isActive = false;

      return rating;
    });

    rating = qrAppRating.map(rating => {
      if (rating.ratingID < ratingID) {
        rating.isActive = true;
      }
      if (rating?.ratingID === ratingID && rating?.isActive) {
        rating.isActive = false;
      } else if(rating?.ratingID === ratingID && !rating?.isActive){
        rating.isActive = true;
      }

      return rating;
    });

    setQrAppRating(rating);
  };

  const onSubmitRating = async () => {
    try{
      const rating = qrAppRating.map((rating => {
        if (rating.ratingID > 1) {

          rating.isActive = false;
        }
  
        return rating;
      }));
      
      const activeUserFullName = `${activeUserInformation?.account?.lastname}, ${activeUserInformation?.account?.firstname}`;

      const result = await sendRatingFeedBack(maxRating, activeUserInformation?.account?.fbID as string, activeUserFullName);

      if (result) {
        setQrAppRating(rating);
        setIsVisibleModal(false);
        ToastAndroid.show('Your rating was successfully sent.', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('You already sent a rating to Us.', ToastAndroid.SHORT);
      }
    }
    catch(error: any) {
      Alert.alert('Oops', error?.message);
    }
  };

  const onCloseRating = () => {
    setIsVisibleModal(false);
  };

  const onToggleModal = () => {
    setIsVisibleModal(true);
  };

  const getAllRatingFeedBack = async () => {
    const result = await sendGetAllRatingFeedBack();
    setRatingRecords(result);
  };

  const onRefreshRating = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  useEffect(() => {
    getAllRatingFeedBack();
  }, [refresh]);

  const renderRatingRecords = ({item}: any) => {
    const {ratingCount, fullName, userID, date} = item;
    const ratingList = displayConfiguredRatingBar(ratingCount);

    return <CardComponent margin='5px 0 0 0' borderRadius={5} padding={10} backgroundColor={COLOR_LISTS.WHITE}>
      <DivComponent alignItems='center'>
        <TextLabel title={fullName} fontSize={20} />
        <TextLabel title={'User'} fontSize={10} />
        <DivComponent flexDirection='row' justifyContent='center'>
          {
            ratingList.map((rating) => {
              return rating;
            })
          }
        </DivComponent>
        <TextLabel title={date} />
      </DivComponent>
    </CardComponent>
  };

  return <View style={{height: '100%', padding: 5, backgroundColor: COLOR_LISTS.GREY_300}}>
    <FlatList 
      data={ratingRecords}
      renderItem={renderRatingRecords}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefreshRating} />
      }
    />
    
    <ActionButton onPress={onToggleModal} />
    <View style={{justifyContent: 'center', alignContent: 'center', alignSelf: 'center', height: '100%', position: 'absolute'}}>
      <S.CustomizeContainerModal isVisible={isVisibleModal}>
        <TextLabel title="Rate your experience." fontSize={18} textAlign="center" />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40, alignContent: 'center', alignItems: 'center'}}>
          {
            qrAppRating.map(rating => {
              return <TouchableOpacity key={rating?.ratingID} onPress={() => onSetRating(rating?.ratingID, rating?.ratingCount)}>
                <FontAwesome6Icon name="star" size={30} style={{color: rating?.isActive ? rating?.activeColor : rating?.defaultColor}} />
              </TouchableOpacity>
            })
          }
        </View>
        <DividerComponent margin="40px 0 0 0" />
        <TextLabel title={maxRating.toString()} fontSize={50} textAlign='center' />
        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 5, position: 'absolute', bottom: 0}}>
          <TouchableOpacity style={{backgroundColor: COLOR_LISTS.RED_400, padding: 10, borderRadius: 10, width: '50%'}} onPress={onCloseRating}>
            <TextLabel title="Close" textAlign="center" textColor={COLOR_LISTS.WHITE} fontSize={16} />
          </TouchableOpacity>
          <TextLabel title=" " />
          <TouchableOpacity style={{backgroundColor: COLOR_LISTS.GREEN_400, padding: 10, borderRadius: 10, width: '50%'}} onPress={onSubmitRating}>
            <TextLabel title="Submit Rating" textAlign="center" textColor={COLOR_LISTS.WHITE} fontSize={16} />
          </TouchableOpacity>
        </View>
      </S.CustomizeContainerModal>
    </View>
</View>
};
