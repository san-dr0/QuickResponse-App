import {useState} from 'react';
import {AlertNavigationModal} from '../../components/AlertNavigationModal';
import TextLabel from '../../components/TextLabel';
import {CoordinateDto} from '../../dto/Coordinate.dto';
import {EmergencyDto} from '../../dto/Emergency.dto';
import {EmergencyStatus} from '../../enums/EmergencyStatus.enum';
import {EmergencyType} from '../../enums/EmergencyType.enum';
import {useGetActiveUserCoordinates} from '../../hooks/useGetActiveUserCoordinates';
import useNotificationPermission from '../../hooks/useNotificationPermission';
import {useAccountContext} from '../../providers/AccountProvider';
import {saveEmergency} from '../../service/emergency/Emergency.service';
import {getCurrentDate} from '../../utils/date.utils';
import {checkEmergencyType} from '../../utils/format-display';
import * as S from './style';

export default function HomeDashBoard() {
  const {isPermitted} = useNotificationPermission();
  const {activeUserInformation} = useAccountContext();
  const [emergencyType, setEmergencyType] = useState<string>('');
  const {coordiantes} = useGetActiveUserCoordinates();
  console.log(coordiantes);

  const onPressAlertNavigationGeneric = async (param: string) => {
    try {
      const emergencyType: EmergencyType = checkEmergencyType(param);

      const emergency: EmergencyDto = {
        type: emergencyType,
        sender: {
          firstname: activeUserInformation?.account?.firstname || '',
          middlename: activeUserInformation?.account?.middlename || '',
          lastname: activeUserInformation?.account?.lastname || '',
        },
        coordinate: coordiantes as CoordinateDto,
        responder: [],
        emergencyStatus: EmergencyStatus.ACTIVE,
        date: getCurrentDate(),
      };
      const rec = await saveEmergency(emergency);
      console.log('REC >>> ');
      console.log(rec);
    } catch (error: any) {
      console.log('ERROR >>>');
      console.log(error?.message);
    }
  };

  return (
    <S.DashBoardHomeContainer>
      {/* <QRAMap /> */}

      <TextLabel title={emergencyType} />
      <AlertNavigationModal
        onPressAlertNavigationGeneric={onPressAlertNavigationGeneric}
      />
    </S.DashBoardHomeContainer>
  );
}
