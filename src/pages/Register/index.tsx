/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {ButtonComponent} from '../../components/Buttons';
import {Alert, ScrollView, ToastAndroid, View} from 'react-native';
import TextInputComponent from '../../components/TextInput';
import TextInputEnum from '../../enums/TextInput.enum';
import ImageComponent from '../../components/ImageContainer';
import DivComponent from '../../components/DivContainer';
import {Formik} from 'formik';
import {COLOR_LISTS} from '../../constants/colors';
import {RegistrationDTO} from '../../types/Registration.type';
import {useUserCredentials} from '../../hooks/useUserHooks';
import * as Yup from 'yup';
import TextLabel from '../../components/TextLabel';
import DividerComponent from '../../components/Divider';
import { Dropdown } from 'react-native-element-dropdown';
import { QRAPP_USER_TYPES, pleaseProvideSupportingDocuments, pleaseSelectUserType, registrationWasSuccessfull, sometingWentWrong, supportingDocuments } from '../../constants/string';
import { APP_FONT_SIZE } from '../../constants/number';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { SUPPORTING_DOCUMENTS } from '../../constants/dbRef';
import { uploadImage } from '../../utils/imageManipulation';
import { useAccountContext } from '../../providers/AccountProvider';
import { UserType } from '../../enums/User.enum';

export default function Registration(props: any) {
  const {activeUserInformation} = useAccountContext();
  const initValues: RegistrationDTO = {
    profile: '',
    firstname: '',
    middlename: '',
    lastname: '',
    mobilenumber: '',
    address: '',
    email: '',
    password: '',
    userType: '',
    isActive: true,
  };
  const [dropdownValue, setDropDownValue] = useState<string>('Register as');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [responderType, setResponderType] = useState<string>('');
  const [hasProvideSupportingDocument, setHasProvideSupportingDocument] = useState<boolean>(false);
  const [uploadSupportingDocuments, setUploadSupportingDocuments] = useState<string>(`${supportingDocuments} (0)`);
  const [uploadedDocuments, setUploadedDocuments] = useState<any | undefined>(undefined);
  const {sendRegisterQRUser} = useUserCredentials();

  const registrationValidationSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    middlename: Yup.string().required('Middlename is required'),
    lastname: Yup.string().required('Lastname is required'),
    mobilenumber: Yup.string()
      .min(11, 'Invalid must be 11 digits.')
      .max(11, 'Invalid it exceed to 11 digits.')
      .required('Mobile# is required'),
    address: Yup.string().required('Address is Required'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().required('Password is Required'),
    userType: Yup.string().optional()
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onRegister = async (values: RegistrationDTO, resetForm: any) => {
    setIsDisabled(true);
    try {
      if (dropdownValue === 'Register as') {
        Alert.alert('Oops', pleaseSelectUserType);
        return;
      } 
      if (dropdownValue === 'Responder' && !hasProvideSupportingDocument) {
        Alert.alert('Oops', pleaseProvideSupportingDocuments);
        return;
      }

      resetForm();
      values.userType = dropdownValue as UserType;
      
      const result = await sendRegisterQRUser(values) as any;
      
      if (!result?.hasFailedRegistration) {
        if (values.userType === UserType.RESPONDER) {
          uploadImage(SUPPORTING_DOCUMENTS, uploadedDocuments, result?.fbID); // this upload the supporting document first
          ToastAndroid.show(
            registrationWasSuccessfull,
            ToastAndroid.SHORT,
          );
        }
        props.navigation.navigate('Login');
      } else {
        Alert.alert('Oops', `'${values.email}' already exists`);
        setIsDisabled(false);
      }
    } catch (error: any) {
      Alert.alert(sometingWentWrong, error?.message);
      setIsDisabled(false);
    }
  };

  const onUploadSupportingDocuments = async () => {
   try{
    let document = await DocumentPicker.pick({
      type: DocumentPicker.types.images,
      allowMultiSelection: false
     });
     setHasProvideSupportingDocument(true);
     setUploadedDocuments(document);
     setUploadSupportingDocuments(`${supportingDocuments} (${document.length})`);
   }
   catch(error) {
    ToastAndroid.show('Please provide supporting documents.', ToastAndroid.LONG);
    setHasProvideSupportingDocument(false);
    setUploadSupportingDocuments(`${supportingDocuments} (0)`);
   }
  }

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          padding: 10,
        }}>
        <DivComponent alignItems="center">
          <ImageComponent
            imageSrc={require('../../assets/QRApp-img3.jpeg')}
            width={200}
            height={100}
          />
        </DivComponent>
        <Formik
          initialValues={initValues}
          onSubmit={(values, {resetForm}) => {
            onRegister(values, resetForm);
          }}
          validationSchema={registrationValidationSchema}>
          {({handleChange, handleSubmit, values, errors}) => (
            <>
              {errors?.firstname && (
                <TextLabel
                  title={`${errors?.firstname}`}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Firstname"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.firstname}
                onChangeText={handleChange('firstname')}
              />
              {errors?.middlename && (
                <TextLabel
                  title={`${errors?.middlename}`}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Middlename"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.middlename}
                onChangeText={handleChange('middlename')}
              />
              {errors?.lastname && (
                <TextLabel
                  title={`${errors?.lastname}`}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Lastname"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.lastname}
                onChangeText={handleChange('lastname')}
              />
              {errors?.mobilenumber && (
                <TextLabel
                  title={`${errors?.mobilenumber}`}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Contact No."
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.mobilenumber}
                onChangeText={handleChange('mobilenumber')}
                keyboardType="phone-pad"
                maxLength={11}
              />
              {errors?.address && (
                <TextLabel
                  title={`${errors?.address}`}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Address"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.address}
                onChangeText={handleChange('address')}
              />
              {errors?.email && (
                <TextLabel
                  title={`${errors?.email}`}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Email"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                onChangeText={handleChange('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors?.password && (
                <TextLabel
                  title={`${errors?.password}`}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Password"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
              <DividerComponent margin='5px 0 0 0'/>
              <TextLabel title='Register as' fontSize={APP_FONT_SIZE.EIGHTEN} textColor={COLOR_LISTS.GREEN_500} />
              <DividerComponent margin='5px 0 0 0'/>
              <Dropdown
                data={QRAPP_USER_TYPES}
                value={dropdownValue}
                placeholder={dropdownValue}
                style={dropDownStyle()}
                labelField={'label'}
                valueField={'value'}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setDropDownValue(item?.label);
                }}
              />
              {dropdownValue === 'Responder' && 
                (
                  <>
                  {errors?.userType && 
                  <TextLabel title={errors?.userType} textColor={COLOR_LISTS.RED} />}
                  <TextInputComponent
                    label='Type'
                    borderRadius={10}
                    textMode={TextInputEnum.OUTLINED}
                    value={responderType}
                    onChangeText={handleChange('responderType')} />
                    <ButtonComponent title={uploadSupportingDocuments} onPress={onUploadSupportingDocuments} width={100} />
                  </>
                )
              }
              <ButtonComponent
                alignSelf="center"
                backgroundColor={COLOR_LISTS.RED_400}
                borderRadius="10"
                disabled={isDisabled}
                title="Sign up"
                textAlign="center"
                textColor={COLOR_LISTS.WHITE}
                margin="30px 0 0 0"
                padding="15"
                fontSize={18}
                width={60}
                onPress={handleSubmit}
              />
              <DividerComponent margin="5px 0 0 0" />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

function dropDownStyle() {
  return {borderColor: COLOR_LISTS.BLACK, borderWidth: 0.5, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5}
}