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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator>
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
