import React, {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Registration from './src/pages/Register';
import DashBoard from './src/pages/Dashboard';
import {COLOR_LISTS} from './src/constants/colors';
import {AccountProvider} from './src/providers/AccountProvider';
import EditPersonalInformationComponent from './src/pages/Profile/EditPersonalInformation';
import FirstAidInformation from './src/pages/FirstAids/FirstAid-Information';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const StackNavigator = createNativeStackNavigator();
// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
function App() {
  // return (
  //   <View style={styles.container}>
  //     <MapView
  //       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
  //       style={styles.map}
  //       region={{
  //         latitude: 37.78825,
  //         longitude: -122.4324,
  //         latitudeDelta: 0.015,
  //         longitudeDelta: 0.0121,
  //       }}></MapView>
  //   </View>
  // );
  return (
    <AccountProvider>
      <NavigationContainer>
        <StackNavigator.Navigator
          initialRouteName="Home"
          screenOptions={{contentStyle: {backgroundColor: COLOR_LISTS.WHITE}}}>
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
    </AccountProvider>
  );
}

export default App;
