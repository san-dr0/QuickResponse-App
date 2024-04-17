import React, {useEffect, useMemo, useState} from 'react';
import {Alert, ScrollView, ToastAndroid, View} from 'react-native';
import TextLabel from '../../components/TextLabel';
import * as S from './style';
import DividerComponent from '../../components/Divider';
import {COLOR_LISTS} from '../../constants/colors';
import TextInputComponent from '../../components/TextInput';
import TextInputEnum from '../../enums/TextInput.enum';
import {useAccountContext} from '../../providers/AccountProvider';
import {ButtonComponent} from '../../components/Buttons';
import storage from '@react-native-firebase/storage';
import DivComponent from '../../components/DivContainer';
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
import ImageComponent from '../../components/ImageContainer';
import {PaperProvider, Switch} from 'react-native-paper';
import {QRModalComponent} from '../../components/Modal';
import {APP_HEIGHT, APP_WIDTH} from '../../constants/dimensions';
import {formatPasswordDisplay} from '../../utils/format-display';
import AddNewAllergies from './Allergies/Add';
import ViewAllergies from './Allergies/View';
import AddNewCondition from './Conditions/Add';
import ViewCondition from './Conditions/View';
import AddBloodType from './BloodType/Add';
import ViewBloodType from './BloodType/View';
import {useUserProfile} from '../../hooks/profileUserHooks';
import AddNewContacts from './Contacts/Add';
import ViewContacts from './Contacts/View';
import { getProfileImage } from '../../utils/imageManipulation';

export default function ProfileDashBoard(props: any) {
  const {activeUserInformation} = useAccountContext();
  const [img, setImage] = useState<any>(
    require('../../assets/QRApp-img1.jpeg'),
  );
  const {setActiveUserMedicalAid, getActiveUserMedicalAidsInformation} =
    useUserProfile();

  const [isRemoteFile, setIsRemoteFile] = useState<boolean>(false);
  const [switchMedicalAid, setSwitchMedicalAid] = useState<boolean>(false);
  const [toggledModal, setToggledModal] = useState<boolean>(false);
  const [activeModalView, setActiveModalView] = useState<string>('');

  useEffect(() => {
    getDoMedicalAidInformation();
  }, []);

  useEffect(() => {
    if (!isRemoteFile) {
      setImage(require('../../assets/QRApp-img1.jpeg'));
    }
  }, []);

  useEffect(() => {
    displayProfileImage();
  }, [isRemoteFile, img]);

  async function displayProfileImage() {
    const profile = await getProfileImage(JSON.parse(activeUserInformation?.account?.fbID ?? ''));
    if (profile) {
      setImage(profile);
      setIsRemoteFile(true);
    } else {
      setIsRemoteFile(false);
    }
  }
  const onSelectImageFromGallery = async () => {
    try {
      const fbRef = storage().ref(`images-${Date.now().toString()}/`);
      const docs = (await DocumentPicker.pick({
        type: DocumentPicker.types.images,
        allowMultiSelection: false,
      })) as unknown as any;

      await fbRef.putFile(docs[0].uri);
      
      await firestore()
        .collection('Users')
        .doc(JSON.parse(activeUserInformation?.account?.fbID ?? ''))
        .update({'account.profile': await fbRef.getDownloadURL()});

        setImage(await fbRef.getDownloadURL());
      ToastAndroid.show('Profile was uploaded', ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert('Something went wrong', error?.message);
    }
  };

  const displayImageComponent = useMemo(() => {
    return !isRemoteFile ?<ImageComponent
      imageSrc={img}
      isRemoteFile={false}
      width={80}
      height={80}
      borderRadius={100}/>
      :
      <ImageComponent
      imageSrc={img}
      isRemoteFile={true}
      width={80}
      height={80}
      borderRadius={100}/>
  }, [isRemoteFile, img]);

  const onEditPersonalInformation = () => {
    props.navigation.navigate('Edit Profile');
  };

  const onToggledMedicalAid = () => {
    setSwitchMedicalAid(!switchMedicalAid);
    setActiveUserMedicalAid(
      activeUserInformation?.account?.fbID ?? '',
      !switchMedicalAid,
    );
  };

  const onPressAddNewAllergies = () => {
    setActiveModalView('add-allergies');
    setToggledModal(true);
  };

  const onPressAddNewCondition = () => {
    setActiveModalView('add-condition');
    setToggledModal(true);
  };

  const onPressAddBloodType = () => {
    setActiveModalView('add-blood-type');
    setToggledModal(true);
  };

  const onPressViewAllergies = () => {
    setActiveModalView('view-allergies');
    setToggledModal(true);
  };

  const onPressViewCondition = () => {
    setActiveModalView('view-condition');
    setToggledModal(true);
  };

  const onPressViewBloodType = () => {
    setActiveModalView('view-blood-type');
    setToggledModal(true);
  };

  const closeModal = () => {
    setToggledModal(false);
  };

  const getDoMedicalAidInformation = async () => {
    const result = await getActiveUserMedicalAidsInformation(
      activeUserInformation?.account?.fbID ?? '',
    );
    setSwitchMedicalAid(result?.data()?.medicalAid as boolean);
  };

  const onAddNewContacts = () => {
    setActiveModalView('add-contacts');
    setToggledModal(true);
  };
  const onViewContacts = () => {
    setActiveModalView('view-contacts');
    setToggledModal(true);
  };

  return (
    <PaperProvider>
      <ScrollView>
        <QRModalComponent
          visibility={toggledModal}
          width={APP_WIDTH}
          height={100}
          contentWidth={100}
          contentHeight={APP_HEIGHT / 2}
          contentPadding={10}
          backgroundColor={COLOR_LISTS.GREY_300}
          closeModal={closeModal}>
          {activeModalView === 'add-allergies' && <AddNewAllergies />}
          {activeModalView === 'view-allergies' && <ViewAllergies />}
          {activeModalView === 'add-condition' && <AddNewCondition />}
          {activeModalView === 'view-condition' && <ViewCondition />}
          {activeModalView === 'add-blood-type' && <AddBloodType />}
          {activeModalView === 'view-blood-type' && <ViewBloodType />}
          {activeModalView === 'add-contacts' && <AddNewContacts />}
          {activeModalView === 'view-contacts' && <ViewContacts />}
        </QRModalComponent>
        <View>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer
            backgroundColor={COLOR_LISTS.RED_400}
            width="50">
            <TextLabel
              title={`Profile Information`}
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
            <S.UploadFileContainer onPress={onSelectImageFromGallery}>
              <TextLabel
                title="+"
                fontSize={20}
                textColor={COLOR_LISTS.WHITE}
                textAlign="center"
              />
            </S.UploadFileContainer>
          </DivComponent>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_500} width="90">
            <TextLabel title="Firstname" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={activeUserInformation?.account?.firstname}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Middlename" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={activeUserInformation?.account?.middlename}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Lastname" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={activeUserInformation?.account?.lastname}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Email" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={activeUserInformation?.credentials?.loginEmail}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Password" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={formatPasswordDisplay(
                activeUserInformation?.credentials?.loginPassword,
              )}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
            <DividerComponent margin="3px 0 0 0" />
            <TextLabel title="Cellphone Number" fontSize={15} />
            <DividerComponent margin="3px 0 0 0" />
            <TextInputComponent
              value={activeUserInformation?.account?.mobilenumber}
              textMode={TextInputEnum.OUTLINED}
              textColor={COLOR_LISTS.GREY_500}
              disabled
            />
          </S.ProfileBadgeContainer>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer
            backgroundColor={COLOR_LISTS.RED_400}
            width="50">
            <TextLabel
              title="Medical Information"
              textColor={COLOR_LISTS.WHITE}
              fontSize={15}
              textAlign="center"
            />
          </S.ProfileBadgeContainer>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_400} width="90">
            <DivComponent flexDirection="row" justifyContent="space-between">
              <TextLabel title="Allergies" fontSize={15} />
              <DivComponent
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                width="60">
                <ButtonComponent
                  title="View"
                  fontSize={15}
                  width={20}
                  textColor={COLOR_LISTS.RED_400}
                  onPress={onPressViewAllergies}
                />
                <TextLabel title="/" textColor={COLOR_LISTS.RED_400} />
                <ButtonComponent
                  title="Add"
                  fontSize={15}
                  width={23}
                  textColor={COLOR_LISTS.RED_400}
                  onPress={onPressAddNewAllergies}
                />
              </DivComponent>
            </DivComponent>
            <DivComponent flexDirection="row" justifyContent="space-between">
              <TextLabel title="Conditions" fontSize={15} />
              <DivComponent
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                width="60">
                <ButtonComponent
                  title="View"
                  fontSize={15}
                  width={20}
                  textColor={COLOR_LISTS.RED_400}
                  onPress={onPressViewCondition}
                />
                <TextLabel title="/" textColor={COLOR_LISTS.RED_400} />
                <ButtonComponent
                  title="Add"
                  fontSize={15}
                  width={23}
                  textColor={COLOR_LISTS.RED_400}
                  onPress={onPressAddNewCondition}
                />
              </DivComponent>
            </DivComponent>
            <DivComponent
              flexDirection="row"
              justifyContent="space-between"
              width="100">
              <TextLabel title="Blood Type" fontSize={15} />
              <DivComponent
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                width="60">
                <ButtonComponent
                  title="View"
                  fontSize={15}
                  width={20}
                  textColor={COLOR_LISTS.RED_400}
                  onPress={onPressViewBloodType}
                />
                <TextLabel title="/" textColor={COLOR_LISTS.RED_400} />
                <ButtonComponent
                  title="Set"
                  fontSize={15}
                  width={23}
                  textColor={COLOR_LISTS.RED_400}
                  onPress={onPressAddBloodType}
                />
              </DivComponent>
            </DivComponent>
            <DivComponent
              flexDirection="row"
              justifyContent="space-between"
              width="100">
              <TextLabel title="Do you have Medical Aid?" fontSize={15} />
              <Switch
                value={switchMedicalAid}
                onValueChange={onToggledMedicalAid}
              />
            </DivComponent>
          </S.ProfileBadgeContainer>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer
            backgroundColor={COLOR_LISTS.RED_400}
            width="50">
            <TextLabel
              title="Emergency Contacts"
              textColor={COLOR_LISTS.WHITE}
              fontSize={15}
              textAlign="center"
            />
          </S.ProfileBadgeContainer>
          <DividerComponent margin="10px 0 0 0" />
          <S.ProfileBadgeContainer borderColor={COLOR_LISTS.RED_400} width="90">
            <DivComponent display="flex" flexDirection="row" padding="5">
              <ButtonComponent
                title="View Contacts"
                textAlign="center"
                backgroundColor={COLOR_LISTS.YELLOW_800}
                borderRadius="5"
                fontSize={18}
                textColor={COLOR_LISTS.WHITE}
                padding="5"
                onPress={onViewContacts}
              />
              <View style={{paddingLeft: 2}} />
              <ButtonComponent
                title="Add Contacts"
                textAlign="center"
                backgroundColor={COLOR_LISTS.GREEN_400}
                borderRadius="5"
                fontSize={18}
                textColor={COLOR_LISTS.WHITE}
                padding="5"
                onPress={onAddNewContacts}
              />
            </DivComponent>
          </S.ProfileBadgeContainer>
          <DividerComponent margin="10px 0 0 0" />
          <ButtonComponent
            alignSelf="center"
            backgroundColor={COLOR_LISTS.BLUE_400}
            borderRadius="10"
            title="Edit Personal Information"
            textAlign="center"
            padding="10"
            fontSize={18}
            textColor={COLOR_LISTS.WHITE}
            width={80}
            onPress={onEditPersonalInformation}
          />
        </View>
        <DividerComponent margin="10px 0 0 0" />
      </ScrollView>
    </PaperProvider>
  );
}
