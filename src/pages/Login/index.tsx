import {Formik} from 'formik';
import {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import * as Yup from 'yup';
import {ButtonComponent} from '../../components/Buttons';
import DivComponent from '../../components/DivContainer';
import DividerComponent from '../../components/Divider';
import ImageComponent from '../../components/ImageContainer';
import TextInputComponent from '../../components/TextInput';
import {
  default as TextComponent,
  default as TextLabel,
} from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import {APP_WIDTH} from '../../constants/dimensions';
import {STORAGE_KEY} from '../../constants/string';
import TextInputEnum from '../../enums/TextInput.enum';
import {UserType} from '../../enums/User.enum';
import {useUserCredentials} from '../../hooks/useUserHooks';
import {useAccountContext} from '../../providers/AccountProvider';
import {LoginDTO, UserDTO} from '../../types/User.type';
import {setAsyncStorage} from '../../utils/utility';

export default function Login(props: any) {
  const initValues: LoginDTO = {
    loginEmail: '',
    loginPassword: '',
  };
  const {navigation} = props;
  const {setActiveUserInformationFunction} = useAccountContext();
  const {sendLoginQRUser} = useUserCredentials();
  const loginValidationSchema = Yup.object().shape({
    loginEmail: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    loginPassword: Yup.string().required('Password is required'),
  });
  const [isPassed, setIsPassed] = useState<boolean>(false);

  const onSignup = () => {
    navigation.navigate('Register');
  };

  const onLoginUser = async (values: LoginDTO) => {
    try {
      setIsPassed(true);
      const loginResponse = await sendLoginQRUser(values);

      if (Object.keys(loginResponse).length) {
        const {email, password, account, isActive}: UserDTO = loginResponse;
        
        const {
          fbID,
          profile,
          firstname,
          middlename,
          lastname,
          mobilenumber,
          address,
          responderType,
          userType,
        } = account;

        if (!isActive) {
          Alert.alert('Oops', 'Your account is inactive.');
          return;
        }
        const stringifyFBID = JSON.stringify(fbID);

        setActiveUserInformationFunction({
          account: {
            fbID: stringifyFBID,
            profile,
            firstname,
            middlename,
            lastname,
            mobilenumber,
            address,
            responderType,
            userType,
          },
          credentials: {
            loginEmail: email,
            loginPassword: password,
          },
        });
        
        setAsyncStorage(STORAGE_KEY.ACTIVE_USER_EMAIL, email);
        setAsyncStorage(STORAGE_KEY.FB_ID, fbID);
        setIsPassed(false);

        if (userType === UserType.RESPONDER) {
          navigation.navigate('Responder');
          return;
        }

        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Something went wrong', 'Invalid credentials');
        setIsPassed(false);
      }
    } catch (error: any) {
      Alert.alert('Something went wrong', error?.message);
      setIsPassed(false);
    }
  };

  return (
    <ScrollView>
      <View>
        <ImageComponent
          imageSrc={require('../../assets/QRApp-img2.jpeg')}
          width={APP_WIDTH}
          borderRadius={50}
          height={200}
        />
        <View>
          <DividerComponent margin="40px 0 0 0" />
          <TextComponent
            title="Log In Now"
            fontWeight="bold"
            fontSize={32}
            textAlign="center"
            textColor={COLOR_LISTS.GREY_500}
          />
          <Formik
            initialValues={initValues}
            onSubmit={values => {
              onLoginUser(values);
            }}
            validationSchema={loginValidationSchema}>
            {({handleSubmit, handleChange, values, errors}) => (
              <>
                <DivComponent padding="10">
                  <DividerComponent margin="20px 0 0 0" />
                  <TextInputComponent
                    label="Email"
                    borderRadius={10}
                    textMode={TextInputEnum.OUTLINED}
                    value={values.loginEmail}
                    keyboardType={'email-address'}
                    onChangeText={handleChange('loginEmail')}
                    error={errors?.loginEmail}
                  />
                  <TextInputComponent
                    label="Password"
                    borderRadius={10}
                    textMode={TextInputEnum.OUTLINED}
                    value={values.loginPassword}
                    secureTextEntry
                    onChangeText={handleChange('loginPassword')}
                    error={errors?.loginPassword}
                  />
                  <ButtonComponent
                    alignSelf="center"
                    borderRadius="10"
                    disabled={isPassed}
                    fontSize={18}
                    title="Log in"
                    textAlign="center"
                    textColor={COLOR_LISTS.WHITE}
                    backgroundColor={COLOR_LISTS.RED_400}
                    margin="40px 0 0 0"
                    padding="15"
                    onPress={handleSubmit}
                  />
                </DivComponent>
              </>
            )}
          </Formik>
          <DividerComponent margin="5px 0 0 0" />
          <DivComponent flexDirection="row" justifyContent="center">
            <TextLabel
              title="Don't have an account? "
              textAlign="center"
              fontSize={15}
              textColor={COLOR_LISTS.GREY_400}
            />
            <ButtonComponent
              title="Sign up"
              textColor={COLOR_LISTS.BLUE_500}
              fontWeight="bold"
              fontSize={15}
              textAlign="center"
              width={15}
              onPress={onSignup}
            />
          </DivComponent>
        </View>
      </View>
    </ScrollView>
  );
}
