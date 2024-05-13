import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import DivComponent from '../../components/DivContainer';
import DividerComponent from '../../components/Divider';
import ImageComponent from '../../components/ImageContainer';
import TextInputComponent from '../../components/TextInput';
import TextLabel from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import TextInputEnum from '../../enums/TextInput.enum';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import * as S from './style';
import {getAllContactsForResponderView} from '../../service/profile/Profile.service';
import {CardComponent} from '../../components/Card';

const IMAGE = require('../../assets/QRApp-img1.jpeg');
export default function ViewUserInfo(props: any) {
  const {route, navigation} = props;
  const [contactList, setContactList] = useState<any>([]);

  const id = route.params.id;
  const {data, condition, allergies, bloodType, medicalAid} = useGetUserInfo({
    id,
  });

  const displayImageComponent = useMemo(() => {
    return !data?.account?.profile ? (
      <ImageComponent
        imageSrc={IMAGE}
        isRemoteFile={false}
        width={80}
        height={80}
        borderRadius={100}
      />
    ) : (
      <ImageComponent
        imageSrc={data.account.profile}
        isRemoteFile={true}
        width={80}
        height={80}
        borderRadius={100}
      />
    );
  }, [data]);

  async function getContactList() {
    console.log('ID >> ', id);

    const result = await getAllContactsForResponderView(id);
    console.log('RESULT >>>');
    console.log(result);

    setContactList(result);
  }

  useEffect(() => {
    getContactList();
  }, []);

  const renderContactListItem = ({item}: any) => {
    return (
      <CardComponent
        backgroundColor={COLOR_LISTS.WHITE}
        padding={5}
        margin="0 0 5px 0"
        borderRadius={3}>
        <TextLabel title={`Name: ${item.name}`} />
        <TextLabel title={`Contact No. ${item.contactno}`} />
      </CardComponent>
    );
  };

  // console.log('IID', id);
  // console.log('DAT', data);
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer
            backgroundColor={COLOR_LISTS.RED_400}
            width="50">
            <TextLabel
              title={'Profile Information'}
              textColor={COLOR_LISTS.WHITE}
              fontSize={15}
              textAlign="center"
            />
          </S.ProfileBadgeContainer>
          <DivComponent
            display="flex"
            justifyContent="center"
            flexDirection="row">
            {displayImageComponent}
          </DivComponent>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_500} width="90">
            <TextLabel title="Firstname" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.account?.firstname}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Middlename" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.account?.middlename}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Lastname" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.account?.lastname}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Email" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.email}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Cellphone Number" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={data?.account?.mobilenumber}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
          </S.ProfileBadgeContainer>
          <DividerComponent margin="10px 0 0 0" />

          <S.ProfileBadgeContainer
            width="90"
            backgroundColor={COLOR_LISTS.RED_400}>
            <TextLabel
              title="Medical Information"
              fontSize={16}
              textAlign="center"
              textColor={COLOR_LISTS.WHITE}
            />
          </S.ProfileBadgeContainer>

          <DividerComponent margin="5px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_400} width="90">
            <TextLabel title="Allergies" fontSize={16} />
            {condition?.allergies ? (
              condition?.allergies?.map((rec: any) => (
                <TextLabel title={rec} fontSize={10} />
              ))
            ) : (
              <TextLabel title="N/A" />
            )}
          </S.ProfileBadgeContainer>

          <DividerComponent margin="5px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_400} width="90">
            <TextLabel title="Conditions" fontSize={16} />
            {allergies?.allergies ? (
              allergies?.allergies?.map((allergy: any) => (
                <TextLabel title={allergy} fontSize={10} />
              ))
            ) : (
              <TextLabel title="N/A" />
            )}
          </S.ProfileBadgeContainer>

          <DividerComponent margin="5px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_400} width="90">
            <TextLabel title="Blood Type" fontSize={16} />
            <TextLabel
              title={bloodType?.bloodType ? bloodType?.bloodType : 'N/A'}
            />
          </S.ProfileBadgeContainer>

          <DividerComponent margin="5px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_400} width="90">
            <TextLabel title="Do you have Medical Aid" fontSize={16} />
            <TextLabel
              title={medicalAid?.medicalAid ? 'YES' : 'N/A'}
              textColor={
                medicalAid?.medicalAid ? COLOR_LISTS.RED_400 : COLOR_LISTS.GREEN
              }
            />
          </S.ProfileBadgeContainer>

          <DividerComponent margin="5px 0 0 0" />
          <S.ProfileBadgeContainer
            width="90"
            backgroundColor={COLOR_LISTS.RED_400}>
            <TextLabel
              title="Emergency Contact Lists"
              fontSize={16}
              textAlign="center"
              textColor={COLOR_LISTS.WHITE}
            />
          </S.ProfileBadgeContainer>
          <S.ProfileBadgeContainer
            width="90"
            backgroundColor={COLOR_LISTS.GREY_300}>
            <FlatList
              data={contactList.contacts}
              renderItem={renderContactListItem}
            />
          </S.ProfileBadgeContainer>
        </View>
      </View>
    </ScrollView>
  );
}
