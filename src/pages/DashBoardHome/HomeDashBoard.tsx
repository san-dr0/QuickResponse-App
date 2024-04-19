import {AlertNavigationModal} from '../../components/AlertNavigationModal';
import {CoordinateDto} from '../../dto/Coordinate.dto';
import {EmergencyDto} from '../../dto/Emergency.dto';
import {NotificationDto} from '../../dto/Notification.dto';
import {EmergencyStatus} from '../../enums/EmergencyStatus.enum';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import {UserType} from '../../enums/User.enum';
import {useGetActiveUserCoordinates} from '../../hooks/useGetActiveUserCoordinates';
import {useAccountContext} from '../../providers/AccountProvider';
import {saveEmergency} from '../../service/emergency/Emergency.service';
import {
  getUsersTokens,
  sendNotifViaAxios,
} from '../../service/token/DeviceInfo.service';
import {getCurrentDate} from '../../utils/date.utils';
import {getNotificationByEmergency} from '../../utils/notification.utils';
import * as S from './style';

export default function HomeDashBoard() {
  const {activeUserInformation} = useAccountContext();
  const {coordiantes} = useGetActiveUserCoordinates();
  console.log(coordiantes);

  const onPressAlertNavigationGeneric = async (
    emergencyType: EmergencyType,
  ) => {
    try {
      // const emergencyType: EmergencyType = checkEmergencyType(param);

      const emergency: EmergencyDto = {
        type: emergencyType,
        sender: {
          userID: activeUserInformation?.account?.fbID as string,
          firstname: activeUserInformation?.account?.firstname || '',
          middlename: activeUserInformation?.account?.middlename || '',
          lastname: activeUserInformation?.account?.lastname || '',
        },
        coordinate: coordiantes as CoordinateDto,
        responder: [],
        emergencyStatus: EmergencyStatus.ACTIVE,
        date: getCurrentDate(),
      };

      const savedEmergencyResponse = await saveEmergency(emergency);
      console.log('SAVED EM >>');
      console.log(savedEmergencyResponse);

      const resp = await getUsersTokens(UserType.RESPONDER);
      emergency.emergencyId = savedEmergencyResponse?.id;

      if (resp.length < 1) {
        return;
      }
      const payload = {
        ...emergency,
        notification: getNotificationByEmergency(
          emergencyType,
        ) as NotificationDto,
      };
      resp.forEach(async element => {
        return await sendNotifViaAxios(
          payload,
          element.token,
          getNotificationByEmergency(emergencyType) as NotificationDto,
        );
      });
    } catch (error: any) {
      console.log('ERROR >>>');
      console.log(error?.message);
    }
  };

  return (
    <S.DashBoardHomeContainer>
      {/* <QRAMap /> */}
      <AlertNavigationModal
        onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
      />
    </S.DashBoardHomeContainer>
  );
}
