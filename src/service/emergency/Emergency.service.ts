import firestore from '@react-native-firebase/firestore';
import { EmergencyDto } from '../../dto/Emergency.dto';

const database = 'Emergency';

export const saveEmergency = async (payload: EmergencyDto) => {
  const response = await firestore().collection(database).add(payload);

  return response;
};

export const getEmergencyById = async (emergencyId: string) => {
  const response = await firestore()
    .collection(database)
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
