import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const Warning = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const updateState = route.params ? route.params : false;

  useEffect(() => {
    const handleBackPress = () => {
      if (!updateState) {
        navigation.navigate('Login');
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
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 25,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          얼굴을 등록하지 않으면 {'\n'}
          서비스 이용이 불가능합니다.
        </Text>
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Camera')}
            style={{
              marginTop: 40,
              backgroundColor: '#056CF2',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#fff',
              width: 'auto',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                fontWeight: '500',
              }}>
              등록하기{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Warning;

const styles = StyleSheet.create({});
