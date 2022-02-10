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
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInput from 'react-native-otp';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {LoginMpin} from '../../Redux/Action/Auth';

const SetMpinErrorTitle = 'Error';

class MpinLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      token: '',
      loginMpin: '',
      isAPILoading: false,
      userName:''
    };
    this.setLoginMpinRef = this.updateRef.bind(this, 'setLoginMpinRef');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }
  showErrorMessage(title, msg, time) {
    return this.refs.setLoginMpinRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }
  // handleOTPChange = otp => {
  //   this.setState({otp: otp});
  //   console.log(this.state.otp,"{{{{{{{{{{{{{{{{")
  // };

  async componentDidMount() {
    const loginToken = await AsyncStorage.getItem('loginToken');
    const userMpin = await AsyncStorage.getItem('loginMpin');
    const userName = await AsyncStorage.getItem('loginUserName'); 
    this.setState({
      loginToken: loginToken,
      loginMpin: userMpin,
      userName: userName
    });
  }

  // clearOTP = () => {
  //   this.setState({otp: undefined});
  // };

  async submitMpin(code) {
    this.setState({isAPILoading: true});
    const mpin = this.state.loginMpin;
    const token = this.state.loginToken;
    console.log(token, '}}}}}}}}}}}}}}}');
    const otp = code;
    console.log(otp, '$$$$$$$$$$');
    // token = token

    if (otp !== '') {
      this.setState({isAPILoading: true});
      const getLoginMpinData = await this.props.LoginMpin(token, otp);

      //   console.log(token, '---------------');
      // return fetch('http://hexeros.com/zb/dcra/public/api/V1/user/set_mpin', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     Authorization: 'Bearer ' + token,
      //     'Content-Type': 'application/json',
      //   },

      //   body: JSON.stringify({
      //     mpin: mpin,
      //     confirm_mpin: confirm_mpin,
      //   }),
      // })
      //   .then(response => response.json())
      //   .then(json => {
      //     console.log(json,"-------&&&&&&&&&&&&&&&&&&&&&&&&&&&&-----------------")
      //     if (json.message == 'MPIN set successfully') {
      //       this.setState({isAPILoading: false});
      //       this.props.navigation.navigate('Dashboard');
      //       console.log(json, '================0000000000000000000000');
      //     } else {
      //       this.setState({isAPILoading: false});
      //       this.showErrorMessage(
      //         SetMpinErrorTitle,
      //         json?.message
      //           ? json.message
      //           : 'Something went wrong!',
      //         5000,
      //         2,
      //       );
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });

      console.log(getLoginMpinData);
      if (otp !== '' && getLoginMpinData.msg == 'login successfully') {
        // this.setState({isAPILoading: false, isModalVisible: true});
        this.setState({isAPILoading: false});
        // await AsyncStorage.setItem('loginMpin', getLoginMpinData.data.mpin);
        this.props.navigation.navigate('Dashboard');
      } else {
        this.setState({isAPILoading: false});
        if (getLoginMpinData.msg == 'MPIN invalid') {
          this.showErrorMessage(SetMpinErrorTitle, getLoginMpinData.msg, 5000);
        }
        // this.showErrorMessage(
        //   SetMpinErrorTitle,
        //   getLoginMpinData?.msg ? getLoginMpinData.msg : 'Something went wrong!',
        //   5000,
        //   2,
        // );
      }
    } else {
      this.setState({isAPILoading: false});
      // if (mpin > 4 && confirm_Mpin > 4 && mpin !== confirm_Mpin){
      if (otp == '') {
        this.showErrorMessage(
          SetMpinErrorTitle,
          'Please Enter Valid Pin',
          5000,
        );
      }
      if (getLoginMpinData.msg == '') {
        this.showErrorMessage(
          SetMpinErrorTitle,
          'Please Enter Valid Pin',
          5000,
        );
      }
      if (otp > 4) {
        this.showErrorMessage(SetMpinErrorTitle, 'Mpin is not Valid', 5000);
      }

      // if (!enterOtp.trim()) {
      //   this.showErrorMessage(
      //     AccountVerificationOtpErrorTitle,
      //     'Please Enter OTP',
      //     5000,
      //     2,
      //   );
      //   return;
      // }
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const {isAPILoading, userName} = this.state;

    if (isAPILoading == false) {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar backgroundColor="#3877F1" />
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingVertical: '50%',
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
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/User.png')}
                    style={{justifyContent: 'center'}}
                    // resizeMode={'stretch'}
                  />
                </View>
                {/* </View> */}
              </View>
              <View style={{paddingHorizontal: 30, flex: 1, marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 24,
                    color: '#000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  Hello {userName}!!
                </Text>
                <Text style={{textAlign: 'center', marginTop: 10}}>
                  Eneter Your MPIN to access your account
                </Text>
              </View>
              <View>
                {/* <OTPInput
                value={this.state.otp}
                onChange={this.handleOTPChange}
                tintColor="#FB6C6A"
                offTintColor="#BBBCBE"
                otpLength={4}
                //   containerStyle={{borderColor: "#000", backgroundColor:'red'}}
                cellStyle={{borderWidth: 1, borderRadius: 10, width: 45}}
              /> */}
                <OTPInputView
                  style={{
                    height: 200,
                    marginHorizontal: '10%',
                    borderRadius: 20,
                  }}
                  pinCount={4}
                  // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  // onCodeChanged = {code => this.setState({otp: code})}
                  autoFocusOnLoad
                  codeInputFieldStyle={{
                    borderRadius: 10,
                    height: 60,
                    width: 60,
                    color: '#000',
                  }}
                  codeInputHighlightStyle={{borderRadius: 10}}
                  onCodeFilled={code => this.submitMpin(code)}
                />
              </View>

              <TouchableOpacity
                style={{alignItems: 'center', marginTop: '20%'}}
                onPress={() =>
                  navigate('OTPVerification')
                }>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#3877F1',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}>
                    Forgot MPin?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <FlashMessage ref="setLoginMpinRef" />
        </SafeAreaView>
      );
    } else {
      return (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center'}}
          size="large"
          color="#3877F1"
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 10,
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({LoginMpin}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MpinLogin);
