import firestore from '@react-native-firebase/firestore';
import { EMERGENCY_TABLE } from '../../constants/dbRef';
import { EmergencyDto, EmergencyResponder } from '../../dto/Emergency.dto';

export const saveEmergency = async (payload: EmergencyDto) => {
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

  console.log(emergencyId)
  const response = await firestore()
    .collection(EMERGENCY_TABLE)
    .doc(emergencyId)
    .get();

  const resp: EmergencyDto = {
    emergencyId: response.id,
    ...response.data() as EmergencyDto
  }

  const arr = [...resp.responder as EmergencyResponder[], responder]

  console.log("GG", arr);
  const isUpdate = await firestore().collection(EMERGENCY_TABLE).doc(emergencyId).update({
    responder: arr
  })

  console.log('GG', isUpdate)

  return isUpdate;

};
//save emergency

// send notfication

export const getAllResponderToken = () => {

};

export const getAllEmergency = async (currentActiveEmail: string) => {
  const response = await firestore().collection(EMERGENCY_TABLE).orderBy('date', 'desc').where('sender.email', '==', currentActiveEmail).get();
  
  return response.docs;
};

export const saveResponderUponAcceptingAnEmergency =  () => {
  
};
