import firestore from '@react-native-firebase/firestore';
import {NotificationDto} from '../../dto/Notification.dto';
import { NOTIFICATION_TABLE } from '../../constants/dbRef';

export const saveNotification = async (notification: NotificationDto) => {
  const response = await firestore().collection(NOTIFICATION_TABLE).add(notification);

  return response;
};
