import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from './src/screens/Home';
import Favorite from './src/screens/Favorite';
import Payment from './src/screens/Payment';
import Setting from './src/screens/Home';
import Login from './src/screens/Login';
import Camera from './src/screens/Camera';
import CardCamera from './src/components/CardCamera';
import CameraWebviewPage from './src/screens/CameraWebviewPage';
//redux
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {useSelector} from 'react-redux';

const App = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
          tabBarIcon: ({focused, size, color}) => {
            const iconName = iconNames[route.name];
            color = focused ? '#056CF2' : 'black';

            const IconComponent =
              iconName === 'payment' || iconName === 'settings'
                ? MaterialIcons
                : MaterialCommunityIcons;

            return <IconComponent name={iconName} color={color} size={24} />;
          },
          tabBarLabel: tabBarLabels[route.name],
          tabBarLabelStyle: {
            textAlign: 'center',
            fontFamily: 'Pretendard',
            fontSize: 15, // 변경된 부분: 숫자로 변경
            fontWeight: '500',
            marginBottom: 10,
          },
          tabBarIconStyle: {
            marginTop: 5, // 라벨의 위치 조절
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorite" component={Favorite} />
        <Tab.Screen name="Payment" component={Payment} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="Bottom" component={BottomTabScreen} />
            {/* <Stack.Screen name="CardCamera" component={CardCamera} /> */}
            {/* <Stack.Screen name="Camera" component={Camera} /> */}
          </>
         )}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const iconNames = {
  Home: 'home',
  Favorite: 'heart',
  Payment: 'payment',
  Setting: 'settings',
};
const tabBarLabels = {
  Home: '홈',
  Favorite: '즐겨찾기',
  Payment: '결제',
  Setting: '설정',
};
