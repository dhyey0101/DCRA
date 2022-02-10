import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OTPInput from 'react-native-otp';

export default function OTPVerification({ navigation, route }) {
  const [otp, setOtp] = useState("");
  const [screenType, setScreenType] = useState("");
  const handleOTPChange = otp => {
    this.setState({ otp });
  };

  useEffect(() => {
    // const ScreenName = route.params.screen;
  }, []);

  const clearOTP = () => {
    this.setState({ otp: undefined });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3877F1" />
      {/* <TouchableOpacity onPress={() => navigate('ForgotPassword')}> */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
          <Image
            source={require('../../../assets/Back_Arrow.png')}
            style={{ width: 22, height: 20 }}
          // resizeMode={'stretch'}
          />
        </View>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingVertical: '30%',
            backgroundColor: '#fff',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              //   marginTop: '20%',
              flexDirection: 'row',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                width: 144,
                height: 144,
                borderRadius: 72,
                alignSelf: 'center',
                backgroundColor: '#EAF1FF',
                justifyContent: 'center',
                marginBottom: 35,
              }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/OTP.png')}
                  style={{ justifyContent: 'center' }}
                // resizeMode={'stretch'}
                />
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 30, flex: 1 }}>
            <Text
              style={{
                fontSize: 24,
                color: '#000',
                fontFamily: 'OpenSans-Regular',
                fontWeight: '700',
                textAlign: 'center',
              }}>
              OTP Verification
            </Text>
            <Text style={{ textAlign: 'center', marginTop: 10 }}>
              We sent you 6 digit verification code to 82928 83238
            </Text>
          </View>
          <View>
            <OTPInput
              value={otp}
              onChange={handleOTPChange}
              tintColor="#FB6C6A"
              offTintColor="#BBBCBE"
              otpLength={6}
              //   containerStyle={{borderColor: "#000", backgroundColor:'red'}}
              cellStyle={{ borderWidth: 1, borderRadius: 10, width: 45 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SetNewPassword')}
            style={{
              //   marginBottom: 20,
              marginTop: 20,
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
            <View style={{ width: 10 }}></View>
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
                Verify
              </Text>
            </View>
            <View>
              <Image
                source={require('../../../assets/Login_Arrow.png')}
                style={{ width: 27.5, height: 26.7 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', margin: 20 }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#3877F1',
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '600',
                }}>
                Resend Code
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 10
  },
});
