import firestore from '@react-native-firebase/firestore';
import { EmergencyDto } from '../../dto/Emergency.dto';
import { EMERGENCY_TABLE } from '../../constants/dbRef';

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
  updateData: EmergencyDto,
) => {
  //get the current emergen
  //push responder to data to Responder Array
  //update the emergency data
};
//save emergency

// send notfication

export const getAllResponderToken = () => {

};

export const getAllActiveEmergency = async () => {
  const response = firestore().collection(EMERGENCY_TABLE).get();

  return response;
};
