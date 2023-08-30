import {View, Text, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import CameraScreen from '../components/CameraScreen';
import {useRoute} from '@react-navigation/native';

const Camera = () => {
  const route = useRoute();
  const updateState = route.params ? route.params : false;

  useEffect(() => {
    const handleBackPress = () => {
      if (!updateState) {
        return true;
      } else {
        return false;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <CameraScreen updateState={updateState} />
    </View>
  );
};

export default Camera;
