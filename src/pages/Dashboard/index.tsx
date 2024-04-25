import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {DASHBOARD} from '../../constants/string';
import {useAlertContext} from '../../providers/AlertProvider';
import DashBoardAlerts from '../Alerts';
import HomeDashBoard from '../DashBoardHome/HomeDashBoard';
import FirstAidDashBoard from '../FirstAids';
import NewsFeedDashBoard from '../NewsFeed';
import ProfileDashBoard from '../Profile';
import * as S from './style';
import FeedBack from '../FeedBack';
import Emergency from '../Emergency';
import QRAppServices from '../Services';
import Inbox from '../Inbox';

const BottomTabNavigation = createBottomTabNavigator();

export default function DashBoard(props: any) {
  const {alerts} = useAlertContext();

  return (
    <BottomTabNavigation.Navigator>
      <BottomTabNavigation.Screen
        name={DASHBOARD.HOME.headerTitle}
        component={HomeDashBoard}
        options={{
          headerTitle: DASHBOARD.HOME.headerTitle,
          tabBarIcon: () => DASHBOARD.HOME.tabBarIcon,
        }}
      />
      <BottomTabNavigation.Screen
        name={DASHBOARD.NEWS_FEEDS.name}
        component={NewsFeedDashBoard}
        options={{
          title: DASHBOARD.NEWS_FEEDS.headerTitle,
          tabBarIcon: () => DASHBOARD.NEWS_FEEDS.tabBarIcon,
        }}
      />
      <BottomTabNavigation.Screen
        name={DASHBOARD.ALERTS.name}
        component={DashBoardAlerts}
        options={{
          title: DASHBOARD.ALERTS.headerTitle,
          tabBarIcon: () => {
            return (
              <View>
                <View>{alerts?.isActive && <S.AlertIdentifier />}</View>
                {DASHBOARD.ALERTS.tabBarIcon}
              </View>
            );
          },
        }}
      />
      <BottomTabNavigation.Screen
        name={DASHBOARD.INBOX.name}
        component={Inbox}
        options={{
          title: DASHBOARD.INBOX.headerTitle,
          tabBarIcon: () => {
            return (
              <View>
                <View>{alerts?.isActive && <S.AlertIdentifier />}</View>
                {DASHBOARD.INBOX.tabBarIcon}
              </View>
            );
          },
        }}
      />
      {/* <BottomTabNavigation.Screen
        name={DASHBOARD.FIRST_AID.name}
        component={FirstAidDashBoard}
        options={{
          headerTitle: DASHBOARD.FIRST_AID.headerTitle,
          tabBarIcon: () => DASHBOARD.FIRST_AID.tabBarIcon,
        }}
      /> */}
      <BottomTabNavigation.Screen
        name={DASHBOARD.PROFILE.name}
        component={ProfileDashBoard}
        options={{
          headerTitle: DASHBOARD.PROFILE.headerTitle,
          tabBarIcon: () => DASHBOARD.PROFILE.tabBarIcon,
        }}
      />
      {/* <BottomTabNavigation.Screen
        name={DASHBOARD.FEEDBACK.name}
        component={FeedBack}
        options={{
          headerTitle: DASHBOARD.FEEDBACK.headerTitle,
          tabBarIcon: () => DASHBOARD.FEEDBACK.tabBarIcon,
        }}
      /> */}
      {/* <BottomTabNavigation.Screen
        name={DASHBOARD.EMERGENCY_LOGS.name}
        component={Emergency}
        options={{
          headerTitle: DASHBOARD.EMERGENCY_LOGS.headerTitle,
          tabBarIcon: () => DASHBOARD.EMERGENCY_LOGS.tabBarIcon,
        }}
      /> */}
      <BottomTabNavigation.Screen
        name={DASHBOARD.SERVICES.name}
        component={QRAppServices}
        options={{
          headerTitle: DASHBOARD.SERVICES.headerTitle,
          tabBarIcon: () => DASHBOARD.SERVICES.tabBarIcon,
        }}
      />
    </BottomTabNavigation.Navigator>
  );
}
