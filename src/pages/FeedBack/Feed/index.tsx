import {Alert, FlatList, Keyboard, RefreshControl, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import TextLabel from '../../../components/TextLabel';
import TextInputComponent from '../../../components/TextInput';
import TextInputEnum from '../../../enums/TextInput.enum';
import { CardComponent } from '../../../components/Card';
import { APP_HEIGHT } from '../../../constants/dimensions';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import DividerComponent from '../../../components/Divider';
import { COLOR_LISTS } from '../../../constants/colors';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAccountContext } from '../../../providers/AccountProvider';
import { useNewsFeed } from '../../../hooks/useNewsFeed';
import { useEffect, useState } from 'react';
import { FeedBackDTO } from '../../../dto/NewsFeed.dto';

export const Feed = () => {
  const {activeUserInformation} = useAccountContext();
  const {sendCreateFeedBack, sendGetAllCreatedFeedBack} = useNewsFeed();
  const [feedBackList, setFeedBackList] = useState<FeedBackDTO[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const initValue = {
    comment: ''
  };
  const feedSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required.')
  });

  const submitFeedbackComment = (values: any, resetForm: any) => {
    try{
      sendCreateFeedBack(activeUserInformation?.account?.fbID as string, `${activeUserInformation?.account?.lastname}, ${activeUserInformation?.account?.firstname}`, values?.comment);
      resetForm();
      ToastAndroid.show('Feedback was send', ToastAndroid.SHORT);
    }
    catch(error: any) {
      Alert.alert('Oops', error?.message);
    }
  };

  const getAllCreatedFeedBack = async () => {
    const result = await sendGetAllCreatedFeedBack();
    setFeedBackList(result);
  };

  const renderFeedBackItem = ({item}: any) => {
    return <CardComponent margin='5px 0 0 0' padding={10} borderRadius={5}>
        <TextLabel title={item?.date} fontSize={10} />
        <TextLabel title={item?.comment} fontSize={18} />
        <TextLabel title={item?.fullName} fontSize={10} />
    </CardComponent>
  };

  useEffect(() => {
    getAllCreatedFeedBack();
  }, [refresh]);

  const onRefreshFeedBack = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 600);
  };

  return (<View style={{justifyContent: 'space-between', flexDirection: 'column', backgroundColor: COLOR_LISTS.GREY_300}}>
    <View style={{padding: 5, height: '88%'}}>
      <FlatList data={feedBackList} renderItem={renderFeedBackItem} refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefreshFeedBack} />
      }/>
    </View>
    <View style={{justifyContent: 'space-evenly', padding: 5, position: 'absolute', bottom: 0, marginBottom: -50, width: '100%'}}>
      <Formik initialValues={initValue} onSubmit={(values, {resetForm}) => {
        submitFeedbackComment(values, resetForm);
      }} validationSchema={feedSchema}>
        {({handleChange, handleSubmit, values, errors}) => (
          <View>
            <TextInput 
              multiline 
              style={{ backgroundColor: COLOR_LISTS.WHITE, width: '100%'}} 
              onSubmitEditing={Keyboard.dismiss} 
              value={values?.comment}
              onChangeText={handleChange('comment')}
              placeholder="Comment..."
            />
            {errors?.comment && <TextLabel title={errors?.comment} textColor={COLOR_LISTS.RED} />}
            <DividerComponent margin='5px 0 0 0' />
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}
                onPress={() => handleSubmit()}
              >
              <FontAwesome6Icon name='circle-chevron-right' size={30} />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  </View>)
};
