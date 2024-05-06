import React from 'react';
import {Formik} from 'formik';
import DivComponent from '../../../components/DivContainer';
import TextInputComponent from '../../../components/TextInput';
import TextInputEnum from '../../../enums/TextInput.enum';
import {useAccountContext} from '../../../providers/AccountProvider';
import * as S from './style';
import {ButtonComponent} from '../../../components/Buttons';
import {COLOR_LISTS} from '../../../constants/colors';
import DividerComponent from '../../../components/Divider';
import {UpdateProfileDTO} from '../../../types/User.type';
import {useUserCredentials} from '../../../hooks/useUserHooks';
import * as Yup from 'yup';
import TextLabel from '../../../components/TextLabel';
import {Alert, ToastAndroid} from 'react-native';

export default function EditPersonalInformationComponent(props: any) {
  const {activeUserInformation, setActiveUserInformationFunction} =
    useAccountContext();
  const {sendUpdateInfromationOfQRUser} = useUserCredentials();

  const initValues = {
    firstname: activeUserInformation?.account?.firstname,
    middlename: activeUserInformation?.account?.middlename,
    lastname: activeUserInformation?.account?.lastname,
    mobilenumber: activeUserInformation?.account?.mobilenumber,
  };
  const editProfileSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    middlename: Yup.string().required('Middlename is required'),
    lastname: Yup.string().required('Lastname is required'),
    mobilenumber: Yup.string().required('Mobile number is required'),
  });

  const onUpdateUserPersonalInformation = async (values: UpdateProfileDTO) => {
    let hasChangedPassword = values.password;
    values.responderType = activeUserInformation?.account?.responderType as string;
    values.userType = activeUserInformation?.account?.userType as string;
    
    try {
      const result = await sendUpdateInfromationOfQRUser(
        JSON.parse(activeUserInformation?.account?.fbID ?? ''),
        values,
        hasChangedPassword,
      );

      if (result) {
        setActiveUserInformationFunction({
          account: {
            firstname: values.firstname,
            middlename: values.middlename,
            lastname: values.lastname,
            mobilenumber: values.mobilenumber,
          },
          credentials: {
            loginEmail: values.email,
            loginPassword: result.hashPassword,
          },
        });
      }

      ToastAndroid.show('Account information was updated!', ToastAndroid.SHORT);
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <S.PersonalInformationContainer>
      <DivComponent padding="10">
        <Formik
          validationSchema={editProfileSchema}
          initialValues={initValues}
          onSubmit={values => {
            onUpdateUserPersonalInformation(values as UpdateProfileDTO);
          }}>
          {({handleSubmit, handleChange, values, errors}) => (
            <>
              <DividerComponent margin="10px 0 0 0" />
              {errors?.firstname && (
                <TextLabel
                  title={errors?.firstname}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Firstname"
                textMode={TextInputEnum.OUTLINED}
                value={values.firstname}
                onChangeText={handleChange('firstname')}
              />
              <DividerComponent margin="10px 0 0 0" />
              {errors?.middlename && (
                <TextLabel
                  title={errors?.middlename}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Middlename"
                textMode={TextInputEnum.OUTLINED}
                value={values.middlename}
                onChangeText={handleChange('middlename')}
              />
              <DividerComponent margin="10px 0 0 0" />
              {errors?.lastname && (
                <TextLabel
                  title={errors?.lastname}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Lastname"
                textMode={TextInputEnum.OUTLINED}
                value={values.lastname}
                onChangeText={handleChange('lastname')}
              />
              <DividerComponent margin="10px 0 0 0" />
              {errors?.mobilenumber && (
                <TextLabel
                  title={errors?.mobilenumber}
                  textColor={COLOR_LISTS.RED}
                />
              )}
              <TextInputComponent
                label="Mobilenumber"
                textMode={TextInputEnum.OUTLINED}
                value={values.mobilenumber}
                onChangeText={handleChange('mobilenumber')}
              />
              <DividerComponent margin="10px 0 0 0" />
              <TextInputComponent
                label="Pass****"
                textMode={TextInputEnum.OUTLINED}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
              <DividerComponent margin="10px 0 0 0" />
              <ButtonComponent
                title="Save"
                backgroundColor={COLOR_LISTS.RED_500}
                width={100}
                borderRadius="5"
                textAlign="center"
                padding="10"
                textColor={COLOR_LISTS.WHITE}
                fontSize={20}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </DivComponent>
    </S.PersonalInformationContainer>
  );
}
