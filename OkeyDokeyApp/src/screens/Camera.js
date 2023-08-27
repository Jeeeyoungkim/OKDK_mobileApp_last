import {View, Text} from 'react-native';
import React from 'react';
import CameraScreen from '../components/CameraScreen';
import {useNavigation, useRoute} from '@react-navigation/native';

const Camera = () => {
  const route = useRoute();
  const updateState = route.params ? route.params : false;
  return (
    <View style={{flex: 1}}>
      <CameraScreen updateState={updateState} />
    </View>
  );
};

export default Camera;
