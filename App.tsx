import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLOR_LISTS} from './src/constants/colors';
import DashBoard from './src/pages/Dashboard';
import FirstAidInformation from './src/pages/FirstAids/FirstAid-Information';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import EditPersonalInformationComponent from './src/pages/Profile/EditPersonalInformation';
import Registration from './src/pages/Register';
import {AccountProvider} from './src/providers/AccountProvider';
import { AlertProvider } from './src/providers/AlertProvider';

const StackNavigator = createNativeStackNavigator();
function App() {
  return (
    <AccountProvider>
      <AlertProvider>
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
            <StackNavigator.Screen name="Register" component={Registration} />
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
          </StackNavigator.Navigator>
        </NavigationContainer>
      </AlertProvider>
    </AccountProvider>
  );
}

export default App;
