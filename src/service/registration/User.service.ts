import {RegistrationDTO} from '../../types/Registration.type';
import {LoginDTO, UpdateProfileDTO, UserDTO} from '../../types/User.type';
import firestore from '@react-native-firebase/firestore';
import {sha256} from 'react-native-sha256';
import {validateIfUserExists} from '../../utils/utility';
import { useUserToken } from '../../hooks/userTokenHooks';

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
  } = loginFormValues;
  const sha256Password = await sha256(password);

  const isUserExists = await validateIfUserExists(email);

  if (isUserExists) {
    return true;
  }

  await firestore().collection('Users').add({
    email,
    password: sha256Password,
    isActive,
    account: {
      profile,
      firstname,
      middlename,
      lastname,
      mobilenumber,
      address,
    },
  });

  return false;
};

export const loginUser = async (
  loginFormValues: LoginDTO,
): Promise<UserDTO> => {
  const {loginEmail, loginPassword} = loginFormValues;
  const {sendGenerateToken} = useUserToken();

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

  const deviceToken = await sendGenerateToken();
  firestore().collection('Tokens').doc(activeUser?.account?.fbID).set({
    email: loginEmail,
    token: deviceToken
  });
  
  return activeUser;
};

export const updateUserInformation = async (
  activeUserID: string,
  profileInformation: UpdateProfileDTO,
  hasChangedPassword: any,
): Promise<{hashPassword: string} | undefined> => {
  const {firstname, middlename, lastname, mobilenumber} = profileInformation;
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
