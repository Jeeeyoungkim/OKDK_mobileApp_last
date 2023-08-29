import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const Favorite = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <WebView
          mixedContentMode="always"
          style={{width: '100%', height: '100%'}}
          source={{uri: 'https://voluble-basbousa-74cfc0.netlify.app/favorite'}}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </View>
    </>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
