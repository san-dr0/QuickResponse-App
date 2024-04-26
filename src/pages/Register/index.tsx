/* eslint-disable react-native/no-inline-styles */
import {Formik} from 'formik';
import {useState} from 'react';
import {
  Alert,
  ScrollView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Dropdown} from 'react-native-element-dropdown';
import * as Yup from 'yup';
import {ButtonComponent} from '../../components/Buttons';
import DivComponent from '../../components/DivContainer';
import DividerComponent from '../../components/Divider';
import ImageComponent from '../../components/ImageContainer';
import TextInputComponent from '../../components/TextInput';
import TextLabel from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import {SUPPORTING_DOCUMENTS} from '../../constants/dbRef';
import {APP_FONT_SIZE} from '../../constants/number';
import {
  QRAPP_USER_TYPES,
  RESPONDER_TYPES,
  pleaseProvideSupportingDocuments,
  pleaseSelectUserType,
  registrationWasSuccessfull,
  sometingWentWrong,
  supportingDocuments,
} from '../../constants/string';
import TextInputEnum from '../../enums/TextInput.enum';
import {UserType} from '../../enums/User.enum';
import {useUserCredentials} from '../../hooks/useUserHooks';
import {useAccountContext} from '../../providers/AccountProvider';
import {RegistrationDTO} from '../../types/Registration.type';
import {uploadImage} from '../../utils/imageManipulation';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

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
    responderType: '',
  };
  const [dropdownValue, setDropDownValue] = useState<string>('Register as');
  const [responderType, setResponderType] = useState<string>('Responder Type');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(true);
  const [hasProvideSupportingDocument, setHasProvideSupportingDocument] =
    useState<boolean>(false);
  const [uploadSupportingDocuments, setUploadSupportingDocuments] =
    useState<string>(`${supportingDocuments} (0)`);
  const [uploadedDocuments, setUploadedDocuments] = useState<any | undefined>(
    undefined,
  );
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
    userType: Yup.string().optional(),
    responderType: Yup.string().optional(),
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
      values.responderType = responderType ?? 'N/A';

      const result = (await sendRegisterQRUser(values)) as any;

      if (!result?.hasFailedRegistration) {
        if (values.userType === UserType.RESPONDER) {
          uploadImage(SUPPORTING_DOCUMENTS, uploadedDocuments, result?.fbID); // this upload the supporting document first
          ToastAndroid.show(registrationWasSuccessfull, ToastAndroid.SHORT);
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
    try {
      let document = await DocumentPicker.pick({
        type: DocumentPicker.types.images,
        allowMultiSelection: false,
      });
      setHasProvideSupportingDocument(true);
      setUploadedDocuments(document);
      setUploadSupportingDocuments(
        `${supportingDocuments} (${document.length})`,
      );
      setIsDisabled(false);
    } catch (error) {
      ToastAndroid.show(
        'Please provide supporting documents.',
        ToastAndroid.LONG,
      );
      setHasProvideSupportingDocument(false);
      setUploadSupportingDocuments(`${supportingDocuments} (0)`);
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
              <TextInputComponent
                label="Firstname"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.firstname}
                onChangeText={handleChange('firstname')}
                error={errors?.firstname}
              />

              <TextInputComponent
                label="Middlename"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.middlename}
                onChangeText={handleChange('middlename')}
                error={errors?.middlename}
              />
              <TextInputComponent
                label="Lastname"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.lastname}
                onChangeText={handleChange('lastname')}
                error={errors?.lastname}
              />

              <TextInputComponent
                label="Contact No."
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.mobilenumber}
                onChangeText={handleChange('mobilenumber')}
                keyboardType="phone-pad"
                maxLength={11}
                error={errors?.mobilenumber}
              />
              <TextInputComponent
                label="Address"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.address}
                onChangeText={handleChange('address')}
                error={errors.address}
              />
              <TextInputComponent
                label="Email"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                onChangeText={handleChange('email')}
                value={values.email}
                keyboardType="email-address"
                error={errors?.email}
              />
              {/* <TextInputComponent
                label="Password"
                borderRadius={10}
                textMode={TextInputEnum.OUTLINED}
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
                error={errors.password}
                
              /> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  // paddingHorizontal: 14,
                }}>
                <TextInputComponent
                  label="Password"
                  borderRadius={10}
                  textMode={TextInputEnum.OUTLINED}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={secureText}
                  error={errors.password}
                />
                <TextLabel title=" " />
                <TouchableOpacity
                  onPress={() => setSecureText(!secureText)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    marginRight: 10,
                    marginTop: 30,
                  }}>
                  <FontAwesome6Icon
                    name={secureText ? 'eye' : 'eye-slash'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <DividerComponent margin="5px 0 0 0" />
              <TextLabel
                title="Register as"
                fontSize={APP_FONT_SIZE.EIGHTEN}
                textColor={COLOR_LISTS.GREEN_500}
              />
              <DividerComponent margin="5px 0 0 0" />
              <Dropdown
                data={QRAPP_USER_TYPES}
                value={dropdownValue}
                placeholder={dropdownValue}
                style={dropDownStyle()}
                labelField={'label'}
                valueField={'value'}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setDropDownValue(item?.label);
                }}
              />
              {dropdownValue === 'Responder' && (
                <>
                  {errors?.userType && (
                    <TextLabel
                      title={errors?.userType}
                      textColor={COLOR_LISTS.RED}
                    />
                  )}
                  <DividerComponent margin="5px 0 0 0" />
                  <Dropdown
                    data={RESPONDER_TYPES}
                    value={responderType}
                    placeholder={responderType}
                    style={dropDownStyle()}
                    labelField={'label'}
                    valueField={'value'}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setResponderType(item?.label);
                    }}
                  />
                  <DividerComponent margin="5px 0 0 0" />
                  <ButtonComponent
                    title={uploadSupportingDocuments}
                    onPress={onUploadSupportingDocuments}
                    width={100}
                    backgroundColor={COLOR_LISTS.GREY_300}
                    padding="5"
                    textAlign="center"
                    borderRadius="5"
                  />
                </>
              )}
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
  return {
    borderColor: COLOR_LISTS.BLACK,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  };
}
