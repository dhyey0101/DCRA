import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ThankYouCrowdSourcing = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3877F1" />
      <LinearGradient
        colors={['#3877F1', '#215ACA']}
        style={styles.linearGradient}>
        <View
          style={{
            //   backgroundColor: '#5B4CDF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../../../../assets/Ellipse_Head.png')} />
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={(styles.bell, [{flexDirection: 'row'}])}></View>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                }}>
                CROWD SOURCING FORM
              </Text>
            </View>
            <View style={(styles.bell, [{flexDirection: 'row'}])}></View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../../../../assets/GreenSign.png')} />
          <Text
            style={{
              fontSize: 28,
              fontFamily: 'OpenSans-Bold',
              color: '#000',
              marginVertical: 10,
            }}>
            Thank You!
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontFamily: 'OpenSans-Regular',
              color: '#000',
              fontWeight: '600',
              marginVertical: 5,
            }}>
            Crowd Sourcing Form
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontFamily: 'OpenSans-Regular',
              color: '#000',
              fontWeight: '600',
            }}>
            Submit Successfully
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={{
          marginHorizontal: '5%',
          marginVertical: 20,
          borderRadius: 48,
          paddingVertical: 16,
          backgroundColor: '#3877F1',
          shadowColor: '#3877F1',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 9,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <View>
          <Image
            source={require('../../../../assets/Login_Arrow.png')}
            style={{width: 27.5, height: 26.7, transform: [{rotate: '180deg'}]}}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              fontFamily: 'OpenSans-Regular',
              fontWeight: '700',
            }}>
            Back to Dashboard
          </Text>
        </View>
        <View style={{width: 26}}></View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#0D2451',
  },
  bell: {
    alignItems: 'flex-end',
    padding: 5,
    width: '20%',
  },
  bellNotify: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    position: 'absolute',
    backgroundColor: '#EB4335',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: -4,
  },
  info: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: '#000',
    marginTop: 3,
  },
  text: {
    fontFamily: 'OpenSans-Semibold',
    fontWeight: '600',
    color: '#000',
    fontSize: 17,
  },
  textTitle: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 2,
    borderRadius: 40,
  },
});

export default ThankYouCrowdSourcing;
