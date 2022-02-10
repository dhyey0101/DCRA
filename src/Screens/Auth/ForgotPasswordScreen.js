import React, {Component} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const mobileNumberErrorTitle = '';

export default class forgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: ''
    };
    this.mobileNumberRef = this.updateRef.bind(this, 'mobileNumberRef');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  showErrorMessage(title, msg, time) {
    return this.refs.mobileNumberRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }

  submitMobileNumber(){
    const mobileNumber = this.state.mobileNumber;
    if(mobileNumber.length !== 10){
      this.showErrorMessage(mobileNumberErrorTitle, "Enter Valid Mobile number", 5000);
    }else{
      this.props.navigation.navigate("OTPVerification")
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#3877F1" />
        <TouchableOpacity onPress={() => navigate('Login')}>
          <View style={{paddingTop: 10, paddingHorizontal: 10}}>
            <Image
              source={require('../../../assets/Back_Arrow.png')}
              style={{width: 22, height: 20}}
              // resizeMode={'stretch'}
            />
          </View>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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
                marginBottom: 35
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/Lock.png')}
                  style={{justifyContent: 'center'}}
                  // resizeMode={'stretch'}
                />
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 30, flex: 1,}}>
            <Text
              style={{
                fontSize: 24,
                color: '#000',
                fontFamily: 'OpenSans-Regular',
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Forgot Your Password?
            </Text>
            <Text style={{textAlign: 'center', marginVertical: 15, color: '#000', fontFamily:'OpenSans-Regular', fontSize: 15, fontWeight:"400"}}>
              Just enter the mobile number you’ve used to register with us. we
              will sent you verification code.
            </Text>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '400',
                }}>
                Mobile Number
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 12,
                borderColor: '#DFDFDF',
                marginTop: 5,
              }}>
              <TextInput
                maxLength={10}
                value={this.state.mobileNumber}
                keyboardType={'numeric'}
                style={{
                  paddingHorizontal: 10,
                  fontSize: 17,
                  color: '#0D2451',
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '600',
                }}
                onChangeText={mobileNumber => this.setState({mobileNumber: mobileNumber})}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => this.submitMobileNumber()}
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
            <View style={{width: 10}}></View>
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
                Continue
              </Text>
            </View>
            <View>
              <Image
                source={require('../../../assets/Login_Arrow.png')}
                style={{width: 27.5, height: 26.7}}
              />
            </View>
          </TouchableOpacity>
          
        </View>
        </ScrollView>
        <FlashMessage ref="mobileNumberRef" />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:5,
    paddingHorizontal: 10
  },
});
