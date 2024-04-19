import {useEffect} from 'react';
import {Alert, Dimensions, View} from 'react-native';
import Modal from 'react-native-modal';
import {ButtonComponent} from '../../components/Buttons';
import DividerComponent from '../../components/Divider';
import ImageComponent from '../../components/ImageContainer';
import {
  default as TextComponent,
  default as TextLabel,
} from '../../components/TextLabel';
import {COLOR_LISTS} from '../../constants/colors';
import {APP_WIDTH} from '../../constants/dimensions';
import {STORAGE_KEY} from '../../constants/string';
import {UserType} from '../../enums/User.enum';
import {useOnReceiveFirebaseCloudMessaging} from '../../hooks/useOnReceiveFCM';
import {useUserCredentials} from '../../hooks/useUserHooks';
import {useAccountContext} from '../../providers/AccountProvider';
import {useAlertContext} from '../../providers/AlertProvider';
import {getAsyncStorage} from '../../utils/utility';
import * as S from './style';

export default function Home(props: any) {
  const {navigation} = props;
  const {sendActiveUserInformation} = useUserCredentials();
  const {setActiveUserInformationFunction} = useAccountContext();
  const {alerts, setAlertRecords} = useAlertContext();

  const {onReceiveBackgroundMessage, onReceive} =
    useOnReceiveFirebaseCloudMessaging();

  onReceive();
  onReceiveBackgroundMessage();

  const checkIfUserHasLoggedInAlready = async () => {
    try {
      const fbID: string = (await getAsyncStorage(STORAGE_KEY.FB_ID)) as string;

      if (fbID) {
        const result = await sendActiveUserInformation(fbID);
        const record = result.data();
        const account = result.data()?.account;

        if (!record?.isActive) {
          Alert.alert('Inactive', 'Your account is inactive');
          return;
        }
        setActiveUserInformationFunction({
          account: {
            fbID: fbID,
            firstname: account?.firstname,
            middlename: account?.middlename,
            lastname: account?.lastname,
            profile: account?.profile,
            mobilenumber: account?.mobilenumber,
            address: account?.address,
            userType: account?.userType,
          },
          credentials: {
            loginEmail: record?.email,
            loginPassword: record?.password,
          },
        });
        if (account?.userType === UserType.RESPONDER) {
          navigation.navigate('Responder');
        } else {
          navigation.navigate('Dashboard');
        }
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  function onGetStarted() {
    navigation.navigate('Login');
  }

  useEffect(() => {
    checkIfUserHasLoggedInAlready();
  }, []);

  function handleViewEmergency() {
    console.log('EMEREGENCY', alerts);
    //  navigation.navigate('View-Emergency', {
    //   emergencyId: alerts?.emergencyID,
    // });
    // setAlertRecords({...alerts, isActive: false});
  }

  return (
    <View>
      {alerts?.isActive && (
        <Modal isVisible>
          <S.AlertModal>
            <TextLabel title={alerts?.title} />
            <TextLabel title={alerts?.body} />
            <DividerComponent margin="10px 0 0 0" />
            <ButtonComponent
              title="Close"
              textAlign="center"
              padding="10"
              borderRadius="5"
              backgroundColor="red"
              textColor={COLOR_LISTS.WHITE}
              onPress={handleViewEmergency}
            />
          </S.AlertModal>
        </Modal>
      )}
      <View>
        <ImageComponent
          borderRadius={50}
          imageSrc={require('../../assets/QRApp-img1.jpeg')}
          width={APP_WIDTH}
          height={210}
        />
        <S.HomeContainer
          justifyContent="center"
          height={Dimensions.get('window').height / 2}>
          <TextComponent
            title="Welcome To"
            fontWeight="bold"
            fontSize={32}
            textAlign="center"
            textColor={COLOR_LISTS.GREY_500}
          />
          <TextComponent
            title="QR App: Emergency Quick Response"
            fontWeight="normal"
            textAlign="center"
            fontSize={18}
            textColor={COLOR_LISTS.GREY_400}
          />
          <ButtonComponent
            alignSelf="center"
            borderRadius="10"
            fontSize={15}
            title="Let's get you Started"
            textAlign="center"
            backgroundColor={COLOR_LISTS.RED_400}
            margin="80px 0 0 0"
            padding="15"
            textColor={COLOR_LISTS.WHITE}
            onPress={onGetStarted}
          />
        </S.HomeContainer>
      </View>
    </View>
  );
}
