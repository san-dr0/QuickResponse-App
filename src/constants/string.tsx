import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLOR_LISTS} from './colors';

export const DASHBOARD = {
  HOME: {
    name: 'Home-DashBoard',
    headerTitle: 'Home',
    tabBarIcon: (
      <FontAwesome6 name="house" size={25} color={COLOR_LISTS.RED_500} />
    ),
  },
  NEWS_FEEDS: {
    name: 'NewsFeed',
    headerTitle: 'News Feed',
    tabBarIcon: (
      <FontAwesome6 name="newspaper" size={25} color={COLOR_LISTS.YELLOW_600} />
    ),
  },
  ALERTS: {
    name: 'Alerts',
    headerTitle: 'Alerts',
    tabBarIcon: (
      <Feather name="alert-octagon" size={25} color={COLOR_LISTS.AMBER_400} />
    ),
  },
  INBOX: {
    name: 'Inbox',
    headerTitle: 'Inbox',
    tabBarIcon: (
      <Feather name="inbox" size={25} color={COLOR_LISTS.GREEN} />
    ),
  },
  FIRST_AID: {
    name: 'First Aid',
    headerTitle: 'First Aid',
    tabBarIcon: (
      <Fontisto name="first-aid-alt" size={25} color={COLOR_LISTS.RED} />
    ),
  },
  PROFILE: {
    name: 'Profile',
    headerTitle: 'Profile',
    tabBarIcon: (
      <FontAwesome6 name="user-gear" size={25} color={COLOR_LISTS.BLUE_400} />
    ),
  },
  // This was removed in bottom navigation
  FEEDBACK: {
    name: 'Feed & Rate',
    headerTitle: 'Feedback & Rating',
    tabBarIcon: (
      <FontAwesome6 name="microphone" size={25} color={COLOR_LISTS.GREEN} />
    ),
  },
  // This was removed in bottom navigation
  EMERGENCY_LOGS: {
    name: 'E Logs',
    headerTitle: 'Emergency Logs',
    tabBarIcon: <FontAwesome6 name="book" size={25} color={COLOR_LISTS.RED} />,
  },
  SERVICES: {
    name: 'Services',
    headerTitle: 'QRApp Services',
    tabBarIcon: <FontAwesome6 name="sim-card" size={25} color={COLOR_LISTS.RED} />,
  }
};

export enum TextAlignmentEnum {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
  AUTO = 'auto',
  JUSTIFY = 'justify',
}

export const STORAGE_KEY = {
  ACTIVE_USER_EMAIL: 'ACTIVE_USER_EMAIL',
  FB_ID: 'FB_ID',
};

export const QRAPP_USER_TYPES = [
  {label: 'User', value: 0},
  {label: 'Responder', value: 1},
];

export const supportingDocuments = 'Upload supporting documents';
export const pleaseProvideSupportingDocuments =
  'Please provide a supporting documents to continue.';
export const pleaseSelectUserType = 'Please select a user type.';
export const registrationWasSuccessfull = 'Your registration was successful!';
export const sometingWentWrong = 'Something went wrong';
export const emptyFields = 'Empty fields';
export const yourFeedBackWasValues = 'Your feedback was valued!';
