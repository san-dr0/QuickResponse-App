import firestore from '@react-native-firebase/firestore';
import {NotificationDto} from '../../dto/Notification.dto';
import { EMERGENCY_TABLE, NOTIFICATION_TABLE } from '../../constants/dbRef';

export const saveNotification = async (notification: NotificationDto) => {
  const response = await firestore().collection(NOTIFICATION_TABLE).add(notification);

  return response;
};

export const getAllActiveEmergency = async () => {
  const response = firestore().collection(EMERGENCY_TABLE).orderBy('emergencyStatus', 'asc').get();

  return response;
};
