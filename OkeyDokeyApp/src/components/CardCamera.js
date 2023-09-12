import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';

import axios from 'axios';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraScreen = ({state}) => {
  const navigation = useNavigation();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  // const accessToken = useSelector(state => state.user.access_token);
  const userNickname = useSelector(state => state.user.nickname);

  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  useEffect(() => {
    const showAlert = async () => {
      Alert.alert('경고', '카드 등록을 위해서는 카메라 권한이 필요합니다.', [
        {
          text: '취소',
          onPress: () => navigation.navigate('Login'),
          style: 'cancel',
        },
        {text: '확인', onPress: () => getPermission()},
      ]);
    };

    const getPermission = async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
      if (newCameraPermission === 'denied') {
        await showAlert();
      }
    };
    getPermission();
  }, []);

  const capturePhoto = async () => {
    if (camera.current == null) {
      return;
    }

    const photo = await camera.current.takePhoto({});
    setImageSource(photo.path);
    console.log(photo.path);
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  const uploadData = async () => {
    setShowLoadingMessage(true);

    const accessToken = await AsyncStorage.getItem('access_token');
    let formdata = new FormData();

    formdata.append('image', {
      name: 'test.jpg',
      type: 'image/jpeg',
      uri: 'file://' + imageSource,
    });
    console.log(`file:/${imageSource}`);
    try {
      const response = await axios.post(
        'https://www.okdkbackend.shop/payment/card/create/image/',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          transformRequest: (data, headers) => {
            return data;
          },
        },
      );

      console.log(response.data);
      console.log('🥹 image upload complete!', response.data);
      setShowLoadingMessage(false);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigation.navigate('Payment', {enroll: true, data: response.data});
      }, 2000);
    } catch (error) {
      console.log('😛 Error :', error);
      console.log('😛 Error :', error.message);

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
  const refreshAccessToken = async () => {
    const body = {
      refresh: await AsyncStorage.getItem('refresh_token'),
    };

    try {
      const response = await axios.post(
        'https://www.okdkbackend.shop/account/refresh/access_token/',
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

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <View
            style={{
              marginBottom: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              {userNickname ? userNickname : '익명'}님의 카드 등록 카메라
            </Text>
          </View>
          <View style={{position: 'relative', width: '100%', height: '80%'}}>
            <Camera
              ref={camera}
              style={{width: '100%', height: '100%'}}
              device={device}
              isActive={showCamera}
              photo={true}
            />
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
                화면에 맞춰 가로로 촬영해주세요
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => {
                capturePhoto();
                setShowCamera(false);
              }}
            />
          </View>
        </>
      ) : (
        <>
          {imageSource !== null ? (
            <>
              {showLoadingMessage && (
                <View style={styles.showMessage}>
                  <Icon name="exclamationcircle" size={50} color="#65a30d" />
                  <Text style={styles.showMessageText}>
                    카드 등록 중 입니다
                  </Text>
                </View>
              )}
              {showSuccessMessage && (
                <View style={styles.showMessage}>
                  <Icon name="checkcircle" size={50} color="#056CF2" />
                  <Text style={styles.showMessageText}>
                    등록이 완료되었어요
                  </Text>
                </View>
              )}
              <Image
                style={styles.image}
                source={{
                  uri: `file://'${imageSource}`,
                }}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: '#77c3ec',
                    }}
                    onPress={() => setShowCamera(true)}>
                    <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                      다시찍기
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#77c3ec',
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: 'white',
                    }}
                    onPress={() => uploadData()}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                      사진 등록하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <View>
              <Text>잠시만 기다려 주세요...</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'gray',
    top: 0,
    padding: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: '#B2BEB5',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  showMessage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  showMessageText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
});

export default CameraScreen;
