import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MenuProvider} from 'react-native-popup-menu';
import {COLOR_LISTS} from './src/constants/colors';
import useNotificationPermission from './src/hooks/useNotificationPermission';
import DashBoard from './src/pages/Dashboard';
import Emergency from './src/pages/Emergency';
import FeedBackAndRating from './src/pages/FeedBack';
import FirstAidDashBoard from './src/pages/FirstAids';
import FirstAidInformation from './src/pages/FirstAids/FirstAid-Information';
import Home from './src/pages/Home';
import LoadingPage from './src/pages/LoadingPage';
import Login from './src/pages/Login';
import Messages from './src/pages/Messages';
import {CreateNewsFeed} from './src/pages/NewsFeed/CreateNewsFeed';
import ViewNewsFeed from './src/pages/NewsFeed/ViewNewsFeed';
import EditPersonalInformationComponent from './src/pages/Profile/EditPersonalInformation';
import Registration from './src/pages/Register';
import Responder from './src/pages/Responder';
import ViewEmergency from './src/pages/ViewEmergency';
import ViewOtherResponder from './src/pages/ViewOtherResponder';
import ViewUserInfo from './src/pages/ViewUserInfo';
import {AccountProvider} from './src/providers/AccountProvider';
import {AlertProvider} from './src/providers/AlertProvider';
import {UserRespondProvider} from './src/providers/UserResponseProvider';
import {UserNotificationProvider} from './src/providers/UserNotificationProvider';
import EmergencyHistory from './src/pages/Responder/EmergencyHistory';
import EmergencyEducationalResources from './src/pages/EmergencyEducationResources';
import EmergencyGuide from './src/pages/EmergencyEducationResources/EmergencyGuide';

const StackNavigator = createNativeStackNavigator();
function App() {
  useNotificationPermission();

  return (
    <MenuProvider>
      <AccountProvider>
        <AlertProvider>
          <UserRespondProvider>
            <UserNotificationProvider>
              <NavigationContainer>
                <StackNavigator.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                    contentStyle: {backgroundColor: COLOR_LISTS.WHITE},
                  }}>
                  <StackNavigator.Screen
                    name="Home"
                    component={Home}
                    options={{
                      title: 'QR-App',
                      headerShown: false,
                    }}
                  />
                  <StackNavigator.Screen
                    name="Login"
                    component={Login}
                    options={{
                      headerBackVisible: false,
                      headerShown: false,
                    }}
                  />
                  <StackNavigator.Screen
                    name="Register"
                    component={Registration}
                  />
                  <StackNavigator.Screen
                    name="Dashboard"
                    component={DashBoard}
                    options={{
                      headerBackVisible: false,
                      headerShown: false,
                    }}
                  />
                  <StackNavigator.Screen
                    name="Edit Profile"
                    component={EditPersonalInformationComponent}
                  />
                  <StackNavigator.Screen
                    name="FirstAid-Information"
                    component={FirstAidInformation}
                    options={{title: 'First Aid Information'}}
                  />
                  <StackNavigator.Screen
                    name="Responder"
                    component={Responder}
                    options={{headerShown: false}}
                  />
                  <StackNavigator.Screen
                    name="View-Emergency"
                    component={ViewEmergency}
                    options={{
                      headerTitle: "View Emergency"
                    }}
                  />
                  <StackNavigator.Screen
                    name="CreateNewsFeed"
                    component={CreateNewsFeed}
                    options={{
                      headerBackVisible: false,
                    }}
                  />
                  <StackNavigator.Screen
                    name="ViewNewsFeed"
                    component={ViewNewsFeed}
                    options={{
                      headerTitle: 'View News Feed',
                    }}
                  />
                  <StackNavigator.Screen
                    name="View-User-Info"
                    component={ViewUserInfo}
                    options={{headerTitle: 'User Info'}}
                  />
                  <StackNavigator.Screen
                    name="View-Other-Responder"
                    component={ViewOtherResponder}
                    options={{headerTitle: 'List of Responder'}}
                  />
                  {/* FEEDBACK SCREEN */}
                  <StackNavigator.Screen
                    name="Feedback-And-Rating"
                    component={FeedBackAndRating}
                    options={{headerTitle: 'Feedback and Ratings'}}
                  />
                  <StackNavigator.Screen
                    name="Emergency-Logs"
                    component={Emergency}
                    options={{headerTitle: 'Emergency Logs'}}
                  />
                  {/* USER EMERGENCY LOGS */}
                  <StackNavigator.Screen
                    name="Responder-Emergency-Logs"
                    component={EmergencyHistory}
                    options={{headerTitle: 'Emergency Logs'}}
                  />
                  {/* EMERGENCY EDUCATIOANL RESOURCES */}
                  <StackNavigator.Screen
                    name="Emergency-Educational-Resources"
                    component={EmergencyEducationalResources}
                    options={{headerTitle: "Emergency Resources"}}
                  />
                  {/* EMERGENCY GUIDE RESOURCES */}
                  <StackNavigator.Screen
                    name="Emergency-Guide"
                    component={EmergencyGuide}
                    options={{headerTitle: "Emergency Guide"}}
                  />
                  {/* RESPONDER EMERGENCY LOGS */}
                  <StackNavigator.Screen
                    name="First-Aid"
                    component={FirstAidDashBoard}
                    options={{headerTitle: 'First-Aid'}}
                  />
                  <StackNavigator.Screen
                    name="Messages"
                    component={Messages}
                    options={{headerTitle: 'Conversations'}}
                  />
                  <StackNavigator.Screen
                    name="Loading"
                    component={LoadingPage}
                    options={{headerShown: false}}
                  />
                </StackNavigator.Navigator>
              </NavigationContainer>
            </UserNotificationProvider>
          </UserRespondProvider>
        </AlertProvider>
      </AccountProvider>
    </MenuProvider>
  );
}

export default App;
