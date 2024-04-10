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

export default function Registration(props: any) {
  const initValues: RegistrationDTO = {
    profile: '',
    firstname: '',
    middlename: '',
    lastname: '',
    mobilenumber: '',
    address: '',
    email: '',
    password: '',
    isActive: true,
  };
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
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onRegister = async (values: RegistrationDTO, resetForm: any) => {
    setIsDisabled(true);
    try {
      const result = await sendRegisterQRUser(values);

      if (!result) {
        ToastAndroid.show(
          'Your registration was successful!',
          ToastAndroid.SHORT,
        );
        resetForm();
        setIsDisabled(false);
        props.navigation.navigate('Login');
      } else {
        Alert.alert('Oops', `'${values.email}' already exists`);
        setIsDisabled(false);
      }
    } catch (error: any) {
      Alert.alert('Something went wrong', error?.message);
      setIsDisabled(false);
    }
  };

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
