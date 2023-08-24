import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import CameraScreen from '../components/CameraScreen';

const Setting = () => {
  return (
    <>
            
      <WebView source={{uri: 'http://192.168.123.103:3000/Setting'}} />
      {/* <CameraScreen /> */}
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({});
