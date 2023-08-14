import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//import WebView from 'react-native-webview';
import CameraScreen from '../components/CameraScreen';

const Home = () => {
  return (
    <>
      {/*       
      <WebView source={{uri: 'http://172.30.1.43:3000/login'}} />> */}

      <CameraScreen />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
