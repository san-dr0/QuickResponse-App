import firestore from '@react-native-firebase/firestore';
import {NotificationDto} from '../../dto/Notification.dto';

const database = 'Notification';

export const saveNotification = async (notification: NotificationDto) => {
  const response = await firestore().collection(database).add(notification);

  return response;
};
