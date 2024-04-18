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

const BottomTabNavigation = createBottomTabNavigator();

export default function DashBoard(props: any) {
  const {alerts} = useAlertContext();

  return (
    <BottomTabNavigation.Navigator>
      <BottomTabNavigation.Screen
        name={DASHBOARD.HOME.name}
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
        name={DASHBOARD.FIRST_AID.name}
        component={FirstAidDashBoard}
        options={{
          headerTitle: DASHBOARD.FIRST_AID.headerTitle,
          tabBarIcon: () => DASHBOARD.FIRST_AID.tabBarIcon,
        }}
      />
      <BottomTabNavigation.Screen
        name={DASHBOARD.PROFILE.name}
        component={ProfileDashBoard}
        options={{
          headerTitle: DASHBOARD.PROFILE.headerTitle,
          tabBarIcon: () => DASHBOARD.PROFILE.tabBarIcon,
        }}
      />
    </BottomTabNavigation.Navigator>
  );
}
