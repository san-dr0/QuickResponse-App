import firestore from '@react-native-firebase/firestore';
import {sha256} from 'react-native-sha256';
import {UserType} from '../../enums/User.enum';
import {RegistrationDTO} from '../../types/Registration.type';
import {LoginDTO, UpdateProfileDTO, UserDTO} from '../../types/User.type';
import {createNewDeviceToken, validateIfUserExists} from '../../utils/utility';
import {
  ALLERGIES_TABLE,
  BLOODTYPE_TABLE,
  CONDITIONS_TABLE,
  MEDICAL_AID_TABLE,
  USER_TABLE,
} from '../../constants/dbRef';

export const registrationUser = async (loginFormValues: RegistrationDTO) => {
  const {
    profile,
    firstname,
    middlename,
    lastname,
    mobilenumber,
    address,
    email,
    password,
    isActive,
    userType,
    responderType,
    agencyFullName,
    phoneNumber,
  } = loginFormValues;
  const sha256Password = await sha256(password);

  const isUserExists = await validateIfUserExists(email);

  if (isUserExists) {
    return {
      fbID: '',
      hasFailedRegistration: true,
    };
  }

  const rec = await firestore()
    .collection('Users')
    .add({
      email,
      password: sha256Password,
      isActive: userType === UserType.RESPONDER ? false : true,
      account: {
        profile,
        firstname,
        middlename,
        lastname,
        mobilenumber,
        address,
        userType,
        responderType,
        agencyFullName: userType === UserType.USER ? 'N/A' : agencyFullName,
        phoneNumber: userType === UserType.USER ? 'N/A' : phoneNumber,
      },
      dateCreated: new Date(),
    });

  return {
    fbID: rec.id,
    hasFailedRegistration: false,
  };
};

export const loginUser = async (
  loginFormValues: LoginDTO,
): Promise<UserDTO> => {
  const {loginEmail, loginPassword} = loginFormValues;

  const results = await firestore()
    .collection('Users')
    .where('email', '==', loginEmail)
    .get();

  if (results.docs.length === 0) {
    return {} as UserDTO;
  }
  const activeUser: UserDTO = results.docs[0].data() as UserDTO;
  activeUser.account.fbID = results?.docs[0]?.id;
  const {password} = activeUser;

  const loginPassSha256 = await sha256(loginPassword ?? '');

  if (loginPassSha256 !== password) {
    return {} as UserDTO;
  }

  // const deviceToken = await sendGenerateToken();
  const userType = results?.docs[0]?.data()?.account?.userType;

  // firestore().collection('Tokens').doc(activeUser?.account?.fbID).set({
  //   email: loginEmail,
  //   token: deviceToken,
  //   userType: results?.docs[0]?.data()?.account?.userType,
  // });

  createNewDeviceToken(
    activeUser?.account?.fbID,
    loginEmail as string,
    userType,
  ); // this is a service that create a deviceToken, then saved it to firebase;
  return activeUser;
};

export const updateUserInformation = async (
  activeUserID: string,
  profileInformation: UpdateProfileDTO,
  hasChangedPassword: any,
): Promise<{hashPassword: string} | undefined> => {
  const {
    firstname,
    middlename,
    lastname,
    mobilenumber,
    responderType,
    userType,
    profile,
  } = profileInformation;
  let result = null;

  if (hasChangedPassword) {
    const {password} = profileInformation;
    let hashPassword = await sha256(password);

    result = await firestore().collection('Users').doc(activeUserID).update({
      account: {
        firstname,
        middlename,
        lastname,
        mobilenumber,
        profile,
        responderType,
        userType,
      },
      password: hashPassword,
    });

    return {hashPassword};
  } else {
    result = await firestore().collection('Users').doc(activeUserID).update({
      account: {
        firstname,
        middlename,
        lastname,
        mobilenumber,
        profile,
        responderType,
        userType,
      },
    });
    return undefined;
  }
};

export const setActiveUserInformation = async (id: string) => {
  const record = await firestore()
    .collection('Users')
    .doc(JSON.parse(id))
    .get();

  return record;
};

export const getUserById = async (id: string) => {
  const resp = await firestore().collection(USER_TABLE).doc(id).get();

  return {id: resp.id, ...resp.data()};
};

export const getUserAllergiesById = async (id: string) => {
  const resp = await firestore()
    .collection(ALLERGIES_TABLE)
    .doc(JSON.stringify(id))
    .get();

  return {id: resp.id, ...resp.data()};
};

export const getUserConiditionsById = async (id: string) => {
  const resp = await firestore()
    .collection(CONDITIONS_TABLE)
    .doc(JSON.stringify(id))
    .get();

  return {id: resp.id, ...resp.data()};
};

export const getUserBloodTypeById = async (id: string) => {
  const resp = await firestore()
    .collection(BLOODTYPE_TABLE)
    .doc(JSON.stringify(id))
    .get();

  return {id: resp.id, ...resp.data()};
};

export const getUserMedicalAidById = async (id: string) => {
  const resp = await firestore()
    .collection(MEDICAL_AID_TABLE)
    .doc(JSON.stringify(id))
    .get();

  return {id: resp.id, ...resp.data()};
};
