import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Home from './src/screens/Home';
import Favorite from './src/screens/Favorite';
import Payment from './src/screens/Payment';
import Setting from './src/screens/Home';
import PhotoList from './src/screens/PhotoList';
import Login from './src/screens/Login';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarIcon: ({ focused, size, color }) => {
          const iconName = iconNames[route.name];
          color = focused ? '#056CF2' : 'black';

          const IconComponent = iconName === 'payment' || iconName === 'settings' ? MaterialIcons : MaterialCommunityIcons;

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
      })}
    >
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
            <Stack.Screen name="PhotoList" component={PhotoList} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
