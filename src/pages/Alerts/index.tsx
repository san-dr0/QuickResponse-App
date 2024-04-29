import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import TextLabel from '../../components/TextLabel';
import {getAllActiveEmergency} from '../../service/notification/Notification.service';
import {ActiveAlertsEmergencyDTO} from '../../types/Emergency.type';
import {CardComponent} from '../../components/Card';
import {DivContainer} from '../../components/DivContainer/style';
import {DividerContainer} from '../../components/Divider/style';
import {displayIconBasedOnEmergencyType} from '../../utils/format-display';
import { COLOR_LISTS } from '../../constants/colors';

export default function DashBoardAlerts() {
  const [activeEmergency, setActiveEmergency] = useState<
    ActiveAlertsEmergencyDTO[]
  >([]);
  let counter: number = 0;

  async function allActiveEmergency() {
    const emergencyList: ActiveAlertsEmergencyDTO[] = [];
    const activeRecords = await getAllActiveEmergency();

    activeRecords.docs.map(records => {
      const data = records.data() as ActiveAlertsEmergencyDTO;
      emergencyList.push(data);
    });
    setActiveEmergency(emergencyList);
  }

  useEffect(() => {
    allActiveEmergency();
  }, []);

  function renderActiveEmergencyAlerts({item}: any) {
    let margin = '5px 0 0 0';

    if (counter === 0) {
      margin = '0px 0 0 0';
    }
    ++counter;

    return (
      <CardComponent width={'100%'} padding={8} margin={margin}>
        <DivContainer justifyContent="center" alignItems="center">
          {displayIconBasedOnEmergencyType(item?.type)}
          <DividerContainer margin="10px 0 0 0" />
          <TextLabel title={item?.type} fontWeight="bold" />
          <CardComponent backgroundColor={COLOR_LISTS.GREY_300} width="280" padding={5} borderRadius={5}>
            <TextLabel title="Location" fontWeight="bold" />
            <TextLabel title={`Lat: ${item?.coordinate?.latitude}`} />
            <TextLabel title={`Long: ${item?.coordinate?.longitude}`} />
            <TextLabel title={`Created At: ${item?.date}`} />
            <TextLabel title={`Total Responded: ${item?.responder?.length}`} />
          </CardComponent>
        </DivContainer>
      </CardComponent>
    );
  }

  return (
    <View>
      {activeEmergency?.length > 0 ? (
        <View style={{padding: 10}}>
          <FlatList
            data={activeEmergency}
            renderItem={renderActiveEmergencyAlerts}
          />
        </View>
      ) : (
        <TextLabel
          title="No records to show."
          fontSize={18}
          textAlign="center"
        />
      )}
    </View>
  );
}
