import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const Login = () => {
  return (
    <View>
      <Text>로그인 화면입니다.</Text>
      <WebView
        style={{width: '50', height: '50'}}
        source={{uri: 'http://192.168.0.108:3000/login'}}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
