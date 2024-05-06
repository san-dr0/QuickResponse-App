import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {CardComponent} from '../../components/Card';
import DividerComponent from '../../components/Divider';
import TextLabel from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import {APP_HEIGHT} from '../../constants/dimensions';
import {EmergencyDto} from '../../dto/Emergency.dto';
import {useAccountContext} from '../../providers/AccountProvider';
import {
  getAllEmergency,
  getAllOfYourRespondedEmergency,
  updateAllResponderWhoRespondedToMyEmergency,
} from '../../service/emergency/Emergency.service';
import {Badge} from 'react-native-paper';
import DivComponent from '../../components/DivContainer';
import {userUserNotificationContext} from '../../providers/UserNotificationProvider';

export default function Emergency(props: any) {
  const {navigation} = props;
  const [emergencyList, setEmergencyList] = useState<EmergencyDto[]>([]);
  const {activeUserInformation} = useAccountContext();
  const [refresh, setRefresh] = useState<boolean>(false);
  const {setTotalRespondedOfMyEmergency} = userUserNotificationContext();

  const getEmergency = async () => {
    try {
      setTotalRespondedOfMyEmergency(0);
      const emergencyResult = await getAllEmergency(
        activeUserInformation?.credentials?.loginEmail as string,
      );
      const emergencies: EmergencyDto[] = [];

      emergencyResult.map(result => {
        const data = result.data() as EmergencyDto;
        data.emergencyId = result.id; // emergencyID
        updateAllResponderWhoRespondedToMyEmergency(result?.id);
        emergencies.push(data);
      });

      setEmergencyList(emergencies);
    } catch (error: any) {
      console.log(error?.message);
      Alert.alert('Something went wrong', error?.message);
    }
  }; // FIRST IMPLEMENTATION
  // const getEmergency = async () => {
  //   try {
  //     setTotalRespondedOfMyEmergency(0);
  //     const emergencyResult = await getAllOfYourRespondedEmergency(
  //       activeUserInformation?.credentials?.loginEmail as string,
  //     );
  //     const emergencies: EmergencyDto[] = [];

  //     emergencyResult.map(result => {
  //       const data = result.data() as EmergencyDto;

  //       const responderList = data?.responder;

  //       responderList.map(responder => {
  //         // if (activeUserInformation?.account?.fbID === responder?.id) {
  //         data.emergencyId = result.id; // emergencyID
  //         emergencies.push(data);
  //         // }
  //       });
  //     });

  //     setEmergencyList(emergencies);
  //   } catch (error: any) {
  //     console.log(error?.message);
  //     Alert.alert('Something went wrong', error?.message);
  //   }
  // }; // SECOND IMPLEMENTATION

  const onOpenCertainEmergency = (emergencyItem: EmergencyDto) => {
    navigation.navigate('View-Emergency', {
      emergencyId: emergencyItem?.emergencyId,
    });
  };

  const renderEmergencyLogs = ({item}: any) => {
    return (
      <>
        <DividerComponent margin="5px 0 0 0" />
        <TouchableOpacity onPress={() => onOpenCertainEmergency(item)}>
          <CardComponent padding={10}>
            <TextLabel
              title={`${item?.sender?.lastname}, ${item?.sender?.firstname}`}
            />
            <TextLabel title={`Emergency Type: ${item?.type}`} />
            <TextLabel title={`Emergency Date: ${item?.date}`} />
            <DividerComponent margin="5px 0 0 0" />
            <TextLabel title={'Coordinates:'} fontWeight="bold" fontSize={15} />
            <TextLabel title={`Long: ${item?.coordinate?.longitude}`} />
            <TextLabel title={`Latitude: ${item?.coordinate?.longitude}`} />
            <DivComponent flexDirection="row">
              <TextLabel title={'Total Responder: '} />
              <Badge
                style={{
                  backgroundColor: COLOR_LISTS.AMBER,
                  color: COLOR_LISTS.BLACK,
                }}>
                {item?.responder?.length}
              </Badge>
            </DivComponent>
          </CardComponent>
        </TouchableOpacity>
      </>
    );
  };

  const onRefreshEmergency = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  useEffect(() => {
    getEmergency();
  }, [refresh]);

  return (
    <View
      style={{
        padding: 10,
        height: APP_HEIGHT,
        backgroundColor: COLOR_LISTS.GREY_300,
      }}>
      <CardComponent
        padding={10}
        borderRadius={5}
        backgroundColor={COLOR_LISTS.RED}>
        <TextLabel
          title="Your emergency Logs."
          fontSize={15}
          textAlign="center"
          textColor={COLOR_LISTS.WHITE}
        />
      </CardComponent>
      {emergencyList.length > 0 ? (
        <View style={{height: APP_HEIGHT - 110}}>
          <DividerComponent margin="5px 0 0 0" />
          <FlatList
            data={emergencyList}
            renderItem={renderEmergencyLogs}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefreshEmergency}
              />
            }
          />
        </View>
      ) : (
        <>
          <DividerComponent margin="50px 0 0 0" />
          <TextLabel
            title="No records for emergency."
            textAlign="center"
            fontWeight="bold"
            fontSize={20}
          />
        </>
      )}
    </View>
  );
}
