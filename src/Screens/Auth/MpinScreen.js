import React, { Component } from 'react';
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
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OTPInput from 'react-native-otp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
// import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { SetMpin, Logout } from '../../Redux/Action/Auth';

const SetMpinErrorTitle = 'Error';

class MpinScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      mpin: '',
      confirmMpin: '',
      isAPILoading: false,
    };
    this.setMpinRef = this.updateRef.bind(this, 'setMpinRef');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  handleOTPChange = mpin => {
    this.setState({ mpin: mpin });
  };
  showErrorMessage(title, msg, time) {
    return this.refs.setMpinRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }
  async componentDidMount() {
    const loginToken = await AsyncStorage.getItem('loginToken');
    this.setState({ token: loginToken });
    console.log(this.state.token, "0000000000000")
  }

  async submitMpin() {
    var { token } = this.state;

    const tokenEdit = token
    console.log(tokenEdit, "EEEEEEEEEE")
    this.setState({ isAPILoading: true });
    const mpin = this.state.mpin;
    const confirm_mpin = this.state.confirmMpin;

    // token = token

    if (mpin !== '' && confirm_mpin !== '' && mpin == confirm_mpin) {
      this.setState({ isAPILoading: true });
      // const getSetMpinData = await this.props.SetMpin(
      //   token,
      //   mpin,
      //   confirm_mpin,
      // );

        console.log(token, '---------------');
      return fetch('http://hexeros.com/zb/dcra/public/api/V1/user/set_mpin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          mpin: mpin,
          confirm_mpin: confirm_mpin,
        }),
      })
        .then(response => response.json())
        .then(json => {
          console.log(json,"-------&&&&&&&&&&&&&&&&&&&&&&&&&&&&-----------------")
          if (json.status === 200 ) {
            this.setState({isAPILoading: false});
            this.props.navigation.navigate('Dashboard');
            console.log(json, '================0000000000000000000000');
          } else {
            this.setState({isAPILoading: false});
            this.showErrorMessage(
              SetMpinErrorTitle,
              json?.message
                ? json.message
                : 'Something went wrong!',
              5000,
              2,
            );
          }
        })
        .catch(error => {
          console.error(error);
        });

      // console.log(getSetMpinData);
      // if (mpin !== '' && confirm_mpin !== '' && mpin == confirm_mpin) {
      //   // this.setState({isAPILoading: false, isModalVisible: true});
      //   this.setState({ isAPILoading: false });
      //   await AsyncStorage.setItem('loginMpin', getSetMpinData.data.mpin);
      //   this.props.navigation.navigate('Dashboard');
      // } else {
      //   this.setState({ isAPILoading: false });
      //   this.showErrorMessage(
      //     SetMpinErrorTitle,
      //     getSetMpinData?.msg ? getSetMpinData.msg : 'Something went wrong!',
      //     5000,
      //     2,
      //   );
      // }
    } else {
      this.setState({ isAPILoading: false });
      // if (mpin > 4 && confirm_Mpin > 4 && mpin !== confirm_Mpin){
      if (mpin == '' || confirm_mpin == '') {
        this.showErrorMessage(
          SetMpinErrorTitle,
          'Please Enter Valid Pin',
          5000,
        );
        return
      }
      if (mpin > 4) {
        this.showErrorMessage(SetMpinErrorTitle, 'Mpin is not Valid', 5000);
        return
      }
      if (confirm_mpin > 4) {
        this.showErrorMessage(
          SetMpinErrorTitle,
          'Confirm Mpin is not Valid',
          5000,
        );
        return
      }
      if (mpin !== confirm_mpin) {
        this.showErrorMessage(
          SetMpinErrorTitle,
          'Mpin and Confirm Mpin must be same',
          5000,
        );
        return
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

  clearOTP = () => {
    this.setState({ otp: undefined });
  };

  //   autoFill = () => {
  //     this.setState({otp: '221198'});
  //   };
  handleConfirmOTPChange = confirmMpin => {
    this.setState({ confirmMpin: confirmMpin });
    console.log(this.state.confirmMpin);
  };

  clearConfirmOTP = () => {
    this.setState({ confirmOtp: undefined });
  };

  LogoutAccount = () => {
    Alert.alert(
      'DCRA',
      'Are you sure want to logout',
      [
        { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.LogOut() },
      ],
      {
        cancelable: false
      }
    );
  };

  async LogOut() {
    this.setState({ isAPILoading: true });
    const Token = await AsyncStorage.getItem('loginToken');
    try {
      fetch('http://hexeros.com/zb/dcra/public/api/V1/user/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Token,
        },

      }).then(response => response.json()).then(async (responseJson) => {
        console.log(responseJson, "_+_+_+_+_+_+_")
        if (responseJson && responseJson.status) {
          await AsyncStorage.clear();
          this.setState({ isAPILoading: false });
          // this.props.navigation.navigate('AccountType', { data: registerData.data })
          this.props.navigation.navigate('Start');
          return true;
        } else {
          this.setState({ isAPILoading: false });
          // this.setState({isLogoutLoading: false});
          alert(responseJson.msg);
        }

      })
    } catch (err) {
      this.setState({ isAPILoading: false });
      console.log('error is: ' + err);
    }
    // const logoutResponse = await dispatch(Logout(Token));
    // const logoutResponse = await this.props.Logout(
    //   Token
    // );

  }

  render() {
    const { isAPILoading } = this.state;

    if (!isAPILoading) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#3877F1" />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingTop: '38%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 24,
                    fontWeight: '700',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  Set Your MPIN
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 13,
                    fontWeight: '400',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  Please Provide 4 digit numeric MPIN to protect your account
                  against unauthorised access.
                </Text>
              </View>
              <View style={{ marginTop: 25 }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  ENTER MPIN
                </Text>
              </View>
              <View>
                {/* <OTPInput
                  value={this.state.mpin}
                  onChange={this.handleOTPChange}
                  tintColor="#FB6C6A"
                  offTintColor="#BBBCBE"
                  otpLength={4}
                  //   containerStyle={{borderColor: "#000", backgroundColor:'red'}}
                  cellStyle={{ borderWidth: 1, borderRadius: 10, width: 45 }}
                /> */}
                <OTPInputView
                  style={{
                    height: 90,
                    marginHorizontal: '10%',
                    borderRadius: 20,
                  }}
                  pinCount={4}
                  code={this.state.mpin} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  onCodeChanged = {code => this.handleOTPChange(code)}
                  autoFocusOnLoad
                  codeInputFieldStyle={{
                    borderRadius: 10,
                    height: 55,
                    width: 55,
                    color: '#000',
                  }}
                  codeInputHighlightStyle={{borderWidth: 1, borderRadius: 10, width: 55 }}
                  // onCodeFilled={code => this.submitMpin(code)}
                />
              </View>
              <View style={{ marginTop: 25 }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  CONFIRM MPIN
                </Text>
              </View>
              <View>
                {/* <OTPInput
                  value={this.state.confirmMpin}
                  onChange={this.handleConfirmOTPChange}
                  tintColor="#FB6C6A"
                  offTintColor="#BBBCBE"
                  otpLength={4}
                  //   containerStyle={{borderColor: "#000", backgroundColor:'red'}}
                  cellStyle={{ borderWidth: 1, borderRadius: 10, width: 45 }}
                /> */}
                <OTPInputView
                  style={{
                    height: 90,
                    marginHorizontal: '10%',
                    borderRadius: 20,
                  }}
                  pinCount={4}
                  code={this.state.confirmMpin} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  onCodeChanged = {code => this.handleConfirmOTPChange(code)}
                  autoFocusOnLoad
                  codeInputFieldStyle={{
                    borderRadius: 10,
                    height: 55,
                    width: 55,
                    color: '#000',
                  }}
                  codeInputHighlightStyle={{borderWidth: 1, borderRadius: 10, width: 55 }}
                  // onCodeFilled={code => this.submitMpin(code)}
                />
              </View>
              <TouchableOpacity
                style={{ marginVertical: 20, flex: 1 }}
                onPress={() => this.LogoutAccount()}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Regular',
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#3877F1',
                      textAlign: 'center',
                    }}>
                    Log Out
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.submitMpin()}
                style={{
                  marginBottom: 20,
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
                    Submit
                  </Text>
                </View>
                <View>
                  <Image
                    source={require('../../../assets/Login_Arrow.png')}
                    style={{ width: 27.5, height: 26.7 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <FlashMessage ref="setMpinRef" />
        </SafeAreaView>
      );
    } else {
      return (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center' }}
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
    // alignItems: 'center',
    // paddingTop: 10,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ SetMpin }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MpinScreen);
