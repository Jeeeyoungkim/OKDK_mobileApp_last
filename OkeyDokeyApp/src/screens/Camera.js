import {View, Text} from 'react-native';
import React from 'react';
import CameraScreen from '../components/CameraScreen';

const Register = () => {
  return (
    <View style={{flex: 1}}>
      <Text>일단 카메라스크린 넣기</Text>
      <CameraScreen />
    </View>
  );
};

export default Register;
