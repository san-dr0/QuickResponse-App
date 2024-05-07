import firestore from '@react-native-firebase/firestore';
import {EMERGENCY_TABLE, FLAGGING} from '../../constants/dbRef';
import {EmergencyDto, EmergencyResponder} from '../../dto/Emergency.dto';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import {AccountFlaggingDTO} from '../../types/User.type';
import {Alert} from 'react-native';

export const saveEmergency = async (payload: EmergencyDto) => {
  console.log('PAY >>> ');
  console.log(payload);

  const response = await firestore().collection(EMERGENCY_TABLE).add(payload);

  return response;
};

export const getEmergencyById = async (emergencyId: string) => {
  const response = await firestore()
    .collection(EMERGENCY_TABLE)
    .doc(emergencyId)
    .get();

  return response;
};

export const acceptEmergency = async (
  emergencyId: string,
  responder: EmergencyResponder,
) => {
  // console.log(responder);
  const response = await firestore()
    .collection(EMERGENCY_TABLE)
    .doc(emergencyId)
    .get();

  const resp: EmergencyDto = {
    emergencyId: response.id,
    ...(response.data() as EmergencyDto),
  };

  const arr = [...(resp.responder as EmergencyResponder[]), responder];

  // console.log('GG', arr);
  const isUpdate = await firestore()
    .collection(EMERGENCY_TABLE)
    .doc(emergencyId)
    .update({
      responder: arr,
    });

  console.log('GG', isUpdate);

  return isUpdate;
};
//save emergency

// send notfication

export const getAllResponderToken = () => {};

export const getAllEmergency = async (currentActiveEmail: string) => {
  const response = await firestore()
    .collection(EMERGENCY_TABLE)
    .orderBy('date', 'desc')
    .where('sender.email', '==', currentActiveEmail)
    .get();

  return response.docs;
};

export const getAllOfYourRespondedEmergency = async (
  currentActiveEmail: string,
) => {
  const response = await firestore()
    .collection(EMERGENCY_TABLE)
    .orderBy('date', 'desc')
    .get();

  return response.docs;
};

export const saveResponderUponAcceptingAnEmergency = async (
  userId: string,
  responderType: EmergencyType,
) => {
  try {
    const tempEmergency: any = []; // list of all responded by an active responder;

    const emergencyList = await firestore().collection(EMERGENCY_TABLE).get();
    emergencyList.docs.map(emergency => {
      const data = emergency.data();

      data?.responder.map((resp: any) => {
        if (resp?.id === userId && resp?.responderType === responderType) {
          tempEmergency.push({emergencyId: emergency.id, ...data});
        }
      });
    });

    return tempEmergency;
  } catch (error: any) {
    console.log('ERR >>>');
    console.log(error?.message);
  }
};

export const getActiveEmergency = async () => {
  const resp = await firestore()
    .collection(EMERGENCY_TABLE)
    .where('isActive', '==', true)
    .get();

  let tempArr: EmergencyDto[] = [];

  resp.forEach(val => {
    tempArr.push({emergencyId: val.id, ...val.data()} as EmergencyDto);
  });

  return tempArr;
};

export const reportUser = async (userInformation: AccountFlaggingDTO) => {
  const result = await firestore().collection(FLAGGING).add(userInformation);

  return result;
};

export const getSpecificUserWhoCreateEmergency = async (
  emergencyID: string,
) => {
  const result = await firestore()
    .collection(EMERGENCY_TABLE)
    .doc(emergencyID)
    .get();

  return result;
};

export const getTheTotalOfAllResponderWhoRespondedToMyEmergency = async (
  activeUserID: string,
) => {
  try {
    const result = await firestore()
      .collection(EMERGENCY_TABLE)
      .where('sender.userID', '==', JSON.parse(activeUserID))
      .get();
    let counter: number = 0;
    result?.docs?.map(res => {
      const responder = res?.data()?.responder;
      const isView = res.data()?.isView;

      if (responder.length > 0 && !isView) {
        counter += 1;
      }
    });

    return counter;
  } catch (error: any) {
    Alert.alert('Oops', error?.message);
  }
};

export const updateAllResponderWhoRespondedToMyEmergency = async (
  emergencyID: string,
) => {
  try {
    await firestore()
      .collection(EMERGENCY_TABLE)
      .doc(emergencyID)
      .update({isView: true});
  } catch (error: any) {
    Alert.alert('Oops', error?.message);
  }
};

export const tagEmergencyAsResponded = async (emergencyID: string) => {
  try {
    const res = await firestore()
      .collection(EMERGENCY_TABLE)
      .doc(emergencyID)
      .update({isActive: false});
    return res;
  } catch (error: any) {
    Alert.alert('Oops', error?.message);
  }
};
