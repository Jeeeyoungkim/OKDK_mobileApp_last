import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from './src/screens/Home';
import Favorite from './src/screens/Favorite';
import Payment from './src/screens/Payment';
import Setting from './src/screens/Setting';
import Login from './src/screens/Login';
import Camera from './src/screens/Camera';
import CardCamera from './src/components/CardCamera';
//redux
import {Provider} from 'react-redux';
import {login, setNickname} from './src/redux/slice/userSlice';
import {store} from './src/redux/store';
import {useSelector, useDispatch} from 'react-redux';

import {createIconSetFromFontello} from 'react-native-vector-icons';

const UserInfoHandler = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    const body = {
      refresh: await AsyncStorage.getItem('refresh_token'),
    };

    try {
      const response = await axios.post(
        'http://3.36.95.105/account/refresh/access_token/',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const access = response.data.access;
      const refresh = response.data.refresh;

      await AsyncStorage.setItem('access_token', access);
      await AsyncStorage.setItem('refresh_token', refresh);

      console.log('success : refresh Access Token');
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };

  const fetchUserInfo = async token => {
    try {
      const response = await axios.get('http://3.36.95.105/account/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userInfo = response.data.user;
      dispatch(setNickname(userInfo.nickname));
      console.log('face_registered : ', userInfo.face_registered);

      if (userInfo.face_registered !== true) {
        console.log('얼굴 등록 필요');
        navigation.navigate('Camera');
      } else {
        console.log('home으로 이동'); //userinfo 가져오는데 성공하면 home으로 이동
        navigation.navigate('Bottom', {screen: 'Home'});
      }
    } catch (error) {
      console.error('Failed to fetch user info', error);

      //401 에러시 토큰 refresh
      if (error.response && error.response.status === 401) {
        try {
          console.log('Attempting to refresh the access token...');
          await refreshAccessToken();

          const newAccessToken = await AsyncStorage.getItem('access_token');
          if (newAccessToken) {
            await fetchUserInfo(newAccessToken);
          } else {
            console.log('Failed to get new access token from storage.');
          }
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          console.log('login으로 이동');
          navigation.navigate('Login');
        }
      }
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const refreshToken = await AsyncStorage.getItem('refresh_token');

        if (accessToken && refreshToken) {
          dispatch(login({accessToken, refreshToken})); //redux에 저장
          fetchUserInfo(accessToken);
          console.log('asyncStorage서 가져옴');
          console.log(accessToken, '/', refreshToken);
        } else {
          console.log('login으로 이동');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error while checking token:', error);
      }
    };

    checkToken();
  }, []);

  return null;
};

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
      <UserInfoHandler />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <>
          <Stack.Screen name="Bottom" component={BottomTabScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="CardCamera" component={CardCamera} />
        </>
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
