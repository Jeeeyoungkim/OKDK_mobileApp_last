import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const Favorite = () => {
  return (
    <View>
      <Text>Favorite</Text>
      <WebView
        style={{width: 50, height: 50}}
        source={{uri: 'www.naver.com'}}
      />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
