import React, { useEffect, useState } from 'react';
import {FlatList, View} from 'react-native';
import TextLabel from '../../components/TextLabel';
import { getAllActiveEmergency } from '../../service/notification/Notification.service';
import { ActiveAlertsEmergencyDTO } from '../../types/Emergency.type';
import { CardComponent } from '../../components/Card';
import { DivContainer } from '../../components/DivContainer/style';
import { COLOR_LISTS } from '../../constants/colors';
import { DividerContainer } from '../../components/Divider/style';
import { changeNotificationActiveColor, displayIconBasedOnEmergencyType } from '../../utils/format-display';

export default function DashBoardAlerts() {
  const [activeEmergency, setActiveEmergency] = useState<ActiveAlertsEmergencyDTO[]>([]);
  let counter: number = 0;
  
  async function allActiveEmergency() {
    const emergencyList: ActiveAlertsEmergencyDTO[] = [];
    const activeRecords = await getAllActiveEmergency();
    
    activeRecords.docs.map(records => {
      const data = records.data() as ActiveAlertsEmergencyDTO;
      emergencyList.push(data);
    });
    setActiveEmergency(emergencyList);
  };
  
  useEffect(() => {
    allActiveEmergency();
  }, []);
  
  function renderActiveEmergencyAlerts ({item}: any) {
    let margin = "5px 0 0 0";

    if (counter === 0) {
      margin = "0px 0 0 0";
    }
    ++counter;
    
    return <CardComponent width={'100%'} padding={10} margin={margin}>

      <DivContainer justifyContent='center' alignItems='center'>
        {displayIconBasedOnEmergencyType(item?.type)}
        <DividerContainer margin='10px 0 0 0' />
        <TextLabel title={item?.type} />
        <TextLabel title={item?.date} />
      </DivContainer>
    </CardComponent>
  };

  return (
    <View>
      <FlatList
        data={activeEmergency}
        renderItem={renderActiveEmergencyAlerts}
      />
    </View>
  );
}
