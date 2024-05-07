import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ToastAndroid} from 'react-native';
import Modal from 'react-native-modal';
import {AlertNavigationModal} from '../../components/AlertNavigationModal';
import {ButtonComponent} from '../../components/Buttons';
import DivComponent from '../../components/DivContainer';
import DividerComponent from '../../components/Divider';
import QRAMap from '../../components/Map';
import TextLabel from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import {CoordinateDto} from '../../dto/Coordinate.dto';
import {EmergencyDto} from '../../dto/Emergency.dto';
import {NotificationDto} from '../../dto/Notification.dto';
import {EmergencyStatus} from '../../enums/EmergencyStatus.enum';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import {UserType} from '../../enums/User.enum';
import {useGetActiveUserCoordinates} from '../../hooks/useGetActiveUserCoordinates';
import {useAccountContext} from '../../providers/AccountProvider';
import {
  getSpecificUserWhoCreateEmergency,
  saveEmergency,
} from '../../service/emergency/Emergency.service';
import {
  getUsersTokens,
  sendNotifViaAxios,
} from '../../service/token/DeviceInfo.service';
import {getCurrentDateWithTime} from '../../utils/date.utils';
import {getNotificationByEmergency} from '../../utils/notification.utils';
import * as S from './style';
import messaging from '@react-native-firebase/messaging';
import {userUserNotificationContext} from '../../providers/UserNotificationProvider';
import {getMarkerIcon} from '../../utils/markerIcon.utils';

export default function HomeDashBoard() {
  const {activeUserInformation} = useAccountContext();
  const {coordiantes} = useGetActiveUserCoordinates();
  const [verifyRequest, setVerifyRequest] = useState<boolean>(false);
  const [emergencyTypeChooseByUser, setEmergencyTypeChooseByUser] =
    useState<EmergencyType>(EmergencyType.CAR_ACCIDENT);
  const [userHasTriggerEmergency, setUserHasTriggerEmergency] =
    useState<any>(undefined);

  const {setIsActiveUserNotification} = userUserNotificationContext();

  const onPressCancelEmergency = () => {
    setVerifyRequest(false);
  };

  const onConfirmEmergencyRequest = async () => {
    try {
      // const emergencyType: EmergencyType = checkEmergencyType(param);

      if (!verifyRequest) {
        return;
      }
      const emergency: EmergencyDto = {
        type: emergencyTypeChooseByUser,
        sender: {
          userID: JSON.parse(activeUserInformation?.account?.fbID as string),
          firstname: activeUserInformation?.account?.firstname || '',
          middlename: activeUserInformation?.account?.middlename || '',
          lastname: activeUserInformation?.account?.lastname || '',
          email: activeUserInformation?.credentials?.loginEmail as string,
          profile: activeUserInformation?.account?.profile as string,
        },
        coordinate: coordiantes as CoordinateDto,
        responder: [],
        emergencyStatus: EmergencyStatus.ACTIVE,
        date: getCurrentDateWithTime(),
        isActive: true,
        isView: false,
      };
      
      const savedEmergencyResponse = await saveEmergency(emergency);
      // console.log('SAVED EM >>');
      // console.log(savedEmergencyResponse);

      // const resp = await getUsersTokens(UserType.RESPONDER);
      // emergency.emergencyId = savedEmergencyResponse?.id;

      // if (resp.length < 1) {
      //   return;
      // }
      // const payload = {
      //   ...emergency,
      //   notification: getNotificationByEmergency(
      //     emergencyTypeChooseByUser,
      //   ) as NotificationDto,
      //   sendBy: 'User',
      // };
      // resp.forEach(async element => {
      //   return await sendNotifViaAxios(
      //     payload,
      //     element.token,
      //     getNotificationByEmergency(
      //       emergencyTypeChooseByUser,
      //     ) as NotificationDto,
      //   );
      // });
      setVerifyRequest(false);
      setUserHasTriggerEmergency(getMarkerIcon(emergencyTypeChooseByUser));
      ToastAndroid.show('Your emergency has been send', ToastAndroid.LONG);
    } catch (error: any) {
      console.log('ERROR >>>');
      console.log(error?.message);
    }
  };

  const onPressAlertNavigationGeneric = async (
    emergencyType: EmergencyType,
  ) => {
    setEmergencyTypeChooseByUser(emergencyType);
    setVerifyRequest(true);
  };

  async function fetch(emergencyId: string, sendBy: string) {
    const response = await getSpecificUserWhoCreateEmergency(emergencyId);
    const userID = response?.data()?.sender.userID as string;
    const activeUserID = JSON.parse(
      activeUserInformation?.account?.fbID as string,
    );
    
    if (userID === activeUserID && sendBy === 'Responder' ) {
      setIsActiveUserNotification({isActive: true});
    }
  }

  const reTriggeredQRAppMap = useMemo(() => {
    return (
      <QRAMap
        userHasTriggerEmergency={userHasTriggerEmergency}
        emergencyType={emergencyTypeChooseByUser}
      />
    );
  }, [userHasTriggerEmergency]);

  useEffect(() => {
    const unSubscribeMessages = messaging().onMessage(emergencyMessage => {
      const {data} = emergencyMessage;
      const {emergencyId, senderBy} = data;

      fetch(emergencyId, senderBy);
      return unSubscribeMessages;
    });
  }, []);

  return (
    <S.DashBoardHomeContainer>
      <Modal isVisible={verifyRequest}>
        <S.AlertModal>
          <TextLabel
            title={'Confirmation'}
            textColor={COLOR_LISTS.GREEN}
            fontSize={18}
          />
          <DivComponent padding="5">
            <TextLabel
              title={
                'Kindly confirm that this was really an emergency request, Thank you.'
              }
              textAlign="center"
            />
          </DivComponent>
          <DividerComponent margin="10px 0 0 0" />
          <DivComponent flexDirection="row" padding="10">
            <ButtonComponent
              title="Cancel"
              textAlign="center"
              padding="10"
              borderRadius="5"
              backgroundColor={COLOR_LISTS.RED}
              textColor={COLOR_LISTS.WHITE}
              onPress={onPressCancelEmergency}
            />
            <TextLabel title=" " fontSize={10} />
            <ButtonComponent
              title="Confirm"
              textAlign="center"
              padding="10"
              borderRadius="5"
              backgroundColor={COLOR_LISTS.GREEN}
              textColor={COLOR_LISTS.WHITE}
              onPress={onConfirmEmergencyRequest}
            />
          </DivComponent>
        </S.AlertModal>
      </Modal>
      {reTriggeredQRAppMap}
      <AlertNavigationModal
        onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
      />
    </S.DashBoardHomeContainer>
  );
}
