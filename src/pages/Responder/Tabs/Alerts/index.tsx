import messaging from '@react-native-firebase/messaging';
import {useEffect, useMemo, useState} from 'react';
import {Dimensions, Image, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {Marker} from 'react-native-maps';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../../components/Button';
import Maps from '../../../../components/Maps';
import {CoordinateDto} from '../../../../dto/Coordinate.dto';
import {EmergencyDto, EmergencyResponder} from '../../../../dto/Emergency.dto';
import {NotificationDto} from '../../../../dto/Notification.dto';
import useGetActiveEmergency from '../../../../hooks/useGetActiveEmergency';
import {useAccountContext} from '../../../../providers/AccountProvider';
import {emergencyIcon, getMarkerIcon} from '../../../../utils/markerIcon.utils';
import {acceptEmergency} from '../../../../service/emergency/Emergency.service';
import {
  gerUserTokenByEmail,
  sendNotification,
} from '../../../../service/token/DeviceInfo.service';
import {EmergencyType} from '../../../../enums/EmergencyType.enum';
import TextLabel from '../../../../components/TextLabel';
import { COLOR_LISTS } from '../../../../constants/colors';
import { CardComponent } from '../../../../components/Card';
import DivComponent from '../../../../components/DivContainer';
import { clearAsyncStorage } from '../../../../utils/utility';
import { PaymentMethod } from '../../../../components/PaymentMethod';
import { saveSubscriptionRecord, updateUserSubscription, uploadProofOfPayment } from '../../../../service/payment/Payment.service';
import dayjs from 'dayjs';
import { checkIfSubscriptionHasExpired } from '../../../../utils/date.utils';

type ModalData = {
  notification: NotificationDto;
  emergency: EmergencyDto;
};

const height = Dimensions.get('window').height;

export default function Alerts(props: any) {
  const {navigation} = props;
  // const {alerts} = useAlertContext();
  const {data, sendRequest, setData} = useGetActiveEmergency();
  const [coordinate, setCoordinate] = useState<CoordinateDto | null>(null);
  const {activeUserInformation: user, setActiveUserInformationFunction} =
    useAccountContext();
  const [selectedData, setSelectedData] = useState<EmergencyDto | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [openSubscriptionForm, setOpenSubscriptionForm] = useState<boolean>(false);
  const [proofOfPayment, setProofOfPayment] = useState<any | undefined>(undefined); // hold the image

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (checkIfSubscriptionHasExpired(user?.subscriptionDetails?.endDate as string, user?.subscriptionDetails?.isSubscribed as boolean)) {
      setIsSubscribed(false); // means open the modal need; mo subscribed balik
    } else {
      setIsSubscribed(user?.subscriptionDetails?.isSubscribed as boolean);
    }

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      // console.log('REMOTE0', remoteMessage);

      const parseMessage = remoteMessage;
      const payload: EmergencyDto = {
        emergencyId: parseMessage?.data?.emergencyId,
        type: parseMessage?.data?.type,
        sender: JSON.parse(parseMessage?.data?.sender),
        responder: [],
        emergencyStatus: parseMessage?.data?.emergencyStatus,
        coordinate: JSON.parse(parseMessage?.data?.coordinate),
        date: parseMessage?.data?.date,
        isActive: parseMessage?.data?.isActive,
        isView: false,
      };
      const title = JSON.parse(remoteMessage?.data?.notification)?.title;
      const body = JSON.parse(remoteMessage?.data?.notification)?.body;
      const data: ModalData = {
        notification: {
          title,
          body,
        },
        emergency: payload,
      };
      sendRequest();
      if (user?.account?.userType === 'Responder') {
        setIsOpen(true);
        setModalData(data);
        return;
      }
    });

    return unsubscribe;
  }, []);

  const currentCoordinate = useMemo(() => {
    if (!coordinate) {
      return;
    }

    if (selectedData) {
      return selectedData.coordinate;
    }

    return coordinate;
  }, [coordinate, setCoordinate]);

  const displayMarker = useMemo(() => {
    return data.map((val: EmergencyDto, i: number) => {
      return (
        <TouchableOpacity onPress={() => setSelectedData(val)}>
          <Marker
            key={i.toString()}
            style={{width: 60, height: 60}}
            coordinate={val.coordinate}
            onPress={() => setSelectedData(val)}>
            <Image
              source={getMarkerIcon(val.type)}
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="center"
            />
          </Marker>
        </TouchableOpacity>
      );
    });
  }, [data, setData]);

  const viewOption = useMemo(() => {
    if (!selectedData) {
      return;
    }

    const responderCount = selectedData.responder.length;

    const isUserIncludedToResponder = selectedData.responder.some(
      val => JSON.parse(val.id) === JSON.parse(user?.account?.fbID as string),
    );

    return (
      <View style={{height: height * 0.3, paddingHorizontal: 14}}>
        <View
          style={{width: '100%', alignItems: 'flex-end', paddingVertical: 5}}>
          <TouchableOpacity onPress={() => setSelectedData(null)}>
            <MaterialIcon name="close-circle" size={20} color={'red'} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 15}}>
          <Image
            source={emergencyIcon(selectedData.type)}
            style={{width: 60, height: 60, borderRadius: 100}}
          />
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {selectedData.type} Alert
            </Text>
            <Text style={{fontSize: 10, marginBottom: 8}}>
              {selectedData.date}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400'}}>
              <Text style={{fontWeight: 'bold'}}>Sender: </Text>
              {selectedData.sender.firstname +
                ' ' +
                selectedData.sender.middlename +
                ' ' +
                selectedData.sender.lastname}
            </Text>
          </View>
        </View>
        <View style={{height: 12}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
            gap: 15,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Messages', {
                id: undefined,
                receiver: selectedData?.sender,
              })
            }>
            <MaterialIcon
              name="message-reply-text-outline"
              size={20}
              color={'white'}
              style={{backgroundColor: 'blue', padding: 7, borderRadius: 100}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('View-User-Info', {
                id: selectedData?.sender?.userID,
              })
            }>
            <MaterialIcon
              name="account-circle-outline"
              size={20}
              color={'white'}
              style={{backgroundColor: 'blue', padding: 7, borderRadius: 100}}
            />
          </TouchableOpacity>
        </View>
        {isUserIncludedToResponder ? (
          <Button
            title={`View Other Responder ${responderCount}`}
            onPress={() =>
              navigation.navigate('View-Other-Responder', {
                id: selectedData?.emergencyId as string,
              })
            }
          />
        ) : (
          <Button title="Accept" onPress={handleAccept} />
        )}
      </View>
    );
  }, [selectedData, data, user]);

  async function handleAccept() {
    try {
      if (!user) {
        return;
      }

      const {credentials} = user;

      const payload: EmergencyResponder = {
        id: user?.account?.fbID as string,
        responderType: user?.account?.responderType as string,
        firstname: user?.account?.firstname as string,
        middlename: user?.account?.middlename as string,
        lastname: user?.account?.lastname as string,
        email: credentials?.loginEmail as string,
      };

      const name =
        payload.firstname + ' ' + payload.middlename + ' ' + payload.lastname;
      const ref: NotificationDto = {
        title: `${name} has been respond 123`,
        body: 'Responder is on the way',
        date: selectedData?.date as string,
      };
      
      const userTokenData = await gerUserTokenByEmail(
        selectedData?.sender?.email as string,
      );

      await acceptEmergency(
        selectedData?.emergencyId ? selectedData.emergencyId : '',
        payload,
      );
      
      await sendNotification(
        ref,
        userTokenData.token,
        selectedData?.emergencyId as string,
        "Responder",
      );
      await sendRequest();

      if (!selectedData) {
        return;
      }
      const updateArr = [...selectedData.responder, payload];

      setSelectedData({...selectedData, responder: updateArr});
    } catch (error) {
      console.log(error);
    }
  }
  
  const onPressCancelSubscription = () => {
    setActiveUserInformationFunction({} as any);
    clearAsyncStorage();
    navigation.navigate('Home');
  };

  const onPressSubscritpion = async () => {
    if (openSubscriptionForm) {
      // MEANS the user has successfully subscribed to our QRAPP;
      const param = {
        userID: user?.account?.fbID as string,
        fullName: `${user?.account?.lastname}, ${user?.account?.firstname}`,
        cashTendered: 400,
      };

      const paymentID = await saveSubscriptionRecord(param);
      uploadProofOfPayment(proofOfPayment, paymentID);
      updateUserSubscription(user?.account?.fbID as string, {endDate: user?.subscriptionDetails.endDate as string, startDate: user?.subscriptionDetails?.startDate as string});

      setIsSubscribed(true);
      ToastAndroid.show("You are subscribed for 1 month", ToastAndroid.LONG);
    } else {
      setOpenSubscriptionForm(true);
    }
  }

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isOpen}>
        <View
          style={{height: height * 0.2, backgroundColor: 'white', padding: 10}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={emergencyIcon(
                (modalData?.emergency.type ?? '') as EmergencyType,
              )}
              style={{width: 60, height: 60, borderRadius: 100}}
            />
            <View style={{padding: 8}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                {modalData?.notification?.title}
              </Text>
              <Text style={{fontSize: 16}}>{modalData?.notification.body}</Text>
            </View>
          </View>
          <View style={{height: 15}} />
          <Button
            title="View Respond"
            onPress={() => {
              setSelectedData(modalData?.emergency as EmergencyDto);
              setIsOpen(false);
            }}
          />
        </View>
      </Modal>
      <Maps
        isShowCurrentUserMarker={false}
        coordinateProps={currentCoordinate}
        onHandleGetCoordinate={setCoordinate}
        height={height * 7}>
        {displayMarker}
      </Maps>
      {viewOption}
      <Modal isVisible={!isSubscribed}>
        {/* <TextLabel title={JSON.stringify(user?.subscriptionDetails)+' wewe'} textColor={COLOR_LISTS.WHITE} /> */}
        <CardComponent borderRadius={5} padding={10} height="auto">
          <TextLabel title="You need to subscribe first to continue using QRAPP." textAlign="center" fontSize={18} />
          {
            openSubscriptionForm && <PaymentMethod setProofOfPayment={setProofOfPayment} />
          }
          <View style={{display: "flex", justifyContent: "center", flexDirection: "row", marginTop: 20}}>
            <Button title={openSubscriptionForm ? "Proceed" : "Subscribe"} background={openSubscriptionForm ? COLOR_LISTS.GREEN : COLOR_LISTS.AMBER_600} type="SOLID" onPress={onPressSubscritpion} />
            <TextLabel title=" " />
            <Button title="Cancel" onPress={onPressCancelSubscription} />
          </View>
        </CardComponent>
      </Modal>
    </View>
  );
}
