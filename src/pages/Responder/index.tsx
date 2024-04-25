import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {responderRoutes} from '../../constants/routes';
import FirstAidDashBoard from '../FirstAids';
import ProfileDashBoard from '../Profile';
import Alerts from './Tabs/Alerts';
import Inbox from './Tabs/Inbox';

const BottomTabNavigation = createBottomTabNavigator();

export default function Responder() {
  return (
    <BottomTabNavigation.Navigator
      initialRouteName={responderRoutes.ALERTS.name}>
      <BottomTabNavigation.Screen
        name={responderRoutes.PROFILE.name}
        component={ProfileDashBoard}
        options={{
          title: responderRoutes.PROFILE.headerTitle,
          tabBarIcon: () => responderRoutes.PROFILE.tabBarIcon,
        }}
      />
      <BottomTabNavigation.Screen
        name={responderRoutes.ALERTS.name}
        component={Alerts}
        options={{
          title: responderRoutes.ALERTS.headerTitle,
          tabBarIcon: () => responderRoutes.ALERTS.tabBarIcon,
        }}
      />
      <BottomTabNavigation.Screen
        name={responderRoutes.FIRST_AID.name}
        component={FirstAidDashBoard}
        options={{
          title: responderRoutes.FIRST_AID.headerTitle,
          tabBarIcon: () => responderRoutes.FIRST_AID.tabBarIcon,
        }}
      />
      <BottomTabNavigation.Screen
        name={responderRoutes.MESSAGE.name}
        component={Inbox}
        options={{
          title: responderRoutes.MESSAGE.headerTitle,
          tabBarIcon: () => responderRoutes.MESSAGE.tabBarIcon,
        }}
      />
    </BottomTabNavigation.Navigator>
  );
}
