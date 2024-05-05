import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLOR_LISTS} from './colors';

export const responderRoutes = {
  PROFILE: {
    name: 'Profile',
    headerTitle: 'Profile',
    tabBarIcon: (
      <FontAwesome6 name="user-gear" size={25} color={COLOR_LISTS.BLUE_400} />
    ),
  },
  ALERTS: {
    name: 'Alerts',
    headerTitle: 'Alerts',
    tabBarIcon: (
      <Feather name="alert-octagon" size={25} color={COLOR_LISTS.AMBER_400} />
    ),
  },
  FIRST_AID: {
    name: 'First Aid',
    headerTitle: 'First Aid',
    tabBarIcon: (
      <Fontisto name="first-aid-alt" size={25} color={COLOR_LISTS.RED} />
    ),
  },
  MESSAGE: {
    name: 'Inbox',
    headerTitle: 'Inbox',
    tabBarIcon: (
      <FontAwesome6 name="message" size={25} color={COLOR_LISTS.RED} />
    ),
  },
  HISTORY: {
    name: 'Emergency-History',
    headerTitle: 'Services',
    tabBarIcon: (
      <FontAwesome6 name="sim-card" size={25} color={COLOR_LISTS.RED} />
    ),
  },
};
