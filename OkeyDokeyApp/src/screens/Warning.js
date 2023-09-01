import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Warning = () => {
  const navigation = useNavigation();

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
