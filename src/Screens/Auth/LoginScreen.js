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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Login, socialLogin } from '../../Redux/Action/Auth';
// import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import messaging from '@react-native-firebase/messaging';

import {
  LoginManager,
  AccessToken,
  Profile,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
// import app from '@react-native-firebase/app';


// zY00cczs2SG28RTn1bZQvsCftvI= Facrbook hashkey


const LoginErrorTitle = '';



class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      deviceID: '',
      deviceName: '',
      isAPILoading: false,
      FCM_Token: "",
      userGoogleInfo: "",
      loader: false,
      userInfo: '',
      googleUserInfo: ''
    };
    this.loginRef = this.updateRef.bind(this, 'loginRef');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  async componentDidMount() {
    // let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.requestPermission()
    // this.setState({ FCM_Token: fcmToken });
    let deviceId = DeviceInfo.getDeviceId();
    this.setState({ deviceID: deviceId });
    let deviceName = DeviceInfo.getSystemName().toLowerCase();
    this.setState({ deviceName: deviceName });

    await GoogleSignin.configure({

      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
      webClientId: '34932593270-m8pr0fke7f1tctrk34lhtp7o4dfounkm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
    
  }


  checkPermission = async () => {
    // const db = firebase.initializeApp();

    // const enabled = await messaging().hasPermission();
    const enabled = await messaging().requestPermission();
    console.log(enabled, "ENABLED")
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  getToken = async () => {
    console.log("ENTER FCM")
    const fcmToken = await messaging().getToken();
    console.log(fcmToken, "FCM TOKEN<<<<")
    await AsyncStorage.setItem('fcmToken', fcmToken);
    this.setState({ FCM_Token: fcmToken })

    // await messaging().registerDeviceForRemoteMessages(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });

    await messaging().registerDeviceForRemoteMessages();

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   navigation.navigate(remoteMessage.data.type);
    // });
    return
    // let fcmToken = await AsyncStorage.getItem('fcmToken');


    console.log(fcmToken, "IF TOKEN")
    if (!fcmToken) {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, "FCM TOKEN")
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  // logoutWithFacebook = () => {
  //   LoginManager.logOut();
  //   this.setState({userInfo: {}});
  // };

  // Facebook(){
  //   AccessToken.getCurrentAccessToken().then(data => {
  //     console.log(data, "DTA")
  //     return
  //     const accessToken = data.accessToken.toString();
  //     this.getInfoFromToken(accessToken);
  //   })
  // }

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name, email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({ userInfo: user });
          console.log('result:', user);


          this.loginFacebook()
          // this.props.navigation.navigate("Registration", { userInfo: this.state.userInfo, loginType: 'facebook' })
        }
      },
    );

    console.log(profileRequest, "PROFILE")
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  showErrorMessage(title, msg, time) {
    return this.refs.loginRef.showMessage({
      message: title,
      description: msg,
      type: 'warning',
    });
  }

  async loginFacebook() {
    const userName = this.state.userInfo.name;
    const deviceID = this.state.deviceID;
    const deviceName = this.state.deviceName;
    const FCM_Token = this.state.FCM_Token;
    const type = "facebook";
    const social_id = this.state.userInfo.id;
    const email = this.state.userInfo.email;

    const Data = {
      deviceID: deviceID,
      deviceName: deviceName,
      FCM_Token: FCM_Token,
      type: type,
      social_id: social_id,
      email: email
    }
    console.log(Data, "DATA")

    fetch('http://hexeros.com/zb/dcra/public/api/V1/social_login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_id: deviceID,
        device_type: deviceName,
        push_token: FCM_Token,
        type: type,
        social_id: social_id,
        email: email
      })
    }).then(response => response.json()).then(async (responseJson) => {
      console.log(responseJson, "_+_+_+_+_+_+_")

      this.setState({ isAPILoading: true });
      if (responseJson.status == 200) {
        if (responseJson.data.type == "user") {
          if (responseJson.status !== 200 || responseJson.data.is_verified == 0 || responseJson.data.is_verified == 2) {
            this.setState({ isAPILoading: false });
            if (responseJson.msg == 'invalid username or password') {
              this.showErrorMessage("DCRA", responseJson.msg, 5000);
            }
            if (responseJson.data.is_verified == 0) {
              this.showErrorMessage("DCRA", "Your account is under review", 5000);
            }
            if (responseJson.data.is_verified == 2) {
              this.showErrorMessage("DCRA", "Your account is rejected", 5000);
            }

          } else {
            await AsyncStorage.setItem(
              'loginToken',
              responseJson.data.token,
            );

            await AsyncStorage.setItem('loginUserName', JSON.stringify(responseJson.data.username));
            await AsyncStorage.setItem('userType', JSON.stringify(responseJson.data.type));
            await AsyncStorage.setItem(
              'loginID',
              JSON.stringify(responseJson.data.id),
            );
            if (responseJson.data.mpin === null || responseJson.data.mpin === "") {
              this.props.navigation.navigate('Mpin');
            } else {
              this.props.navigation.navigate('Dashboard');
            }
            this.setState({ isAPILoading: false });
          }
        } else {
          await AsyncStorage.setItem(
            'loginToken',
            responseJson.data.token,
          );

          await AsyncStorage.setItem('loginUserName', JSON.stringify(responseJson.data.username));
          await AsyncStorage.setItem('userType', JSON.stringify(responseJson.data.type));
          await AsyncStorage.setItem(
            'loginID',
            JSON.stringify(responseJson.data.id),
          );
          if (responseJson.data.mpin === null || responseJson.data.mpin === "") {
            this.props.navigation.navigate('Mpin');
          } else {
            this.props.navigation.navigate('Dashboard');
          }
          this.setState({ isAPILoading: false });
        }
      } else {
        this.setState({ isAPILoading: false });
        this.showErrorMessage("DCRA", responseJson.msg, 5000);
        this.props.navigation.navigate("Registration", { userInfo: this.state.userInfo, loginType: 'facebook' })
      }
    })
  }

  loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  async GoogleSignup() {
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      console.log(hasPlayService, "SERVICE")
      if (hasPlayService) {
        GoogleSignin.signIn().then(async (userInfo) => {
          console.log(userInfo.user, "LOGIN RESPONSE")
          this.setState({ userInfo: userInfo.user })

          const userName = userInfo.user.name;
          const deviceID = this.state.deviceID;
          const deviceName = this.state.deviceName;
          const FCM_Token = this.state.FCM_Token;
          const type = "goggle";
          const social_id = userInfo.user.id;
          const email = userInfo.user.email;


          console.log(userName)
          console.log(deviceID)
          console.log(deviceName)
          console.log(FCM_Token)
          console.log(type)
          console.log(social_id)
          console.log(email)

          fetch('http://hexeros.com/zb/dcra/public/api/V1/social_login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              device_id: deviceID,
              device_type: deviceName,
              push_token: FCM_Token,
              type: "google",
              social_id: social_id,
              email: email
            })
          }).then(response => response.json()).then(async (responseJson) => {
            console.log(responseJson, "_+_+_+_+_+_+_")

            this.setState({ isAPILoading: true });
            if (responseJson.status == 200) {
              if (responseJson.data.type == "user") {
                if (responseJson.status !== 200 || responseJson.data.is_verified == 0 || responseJson.data.is_verified == 2) {
                  this.setState({ isAPILoading: false });
                  if (responseJson.msg == 'invalid username or password') {
                    this.showErrorMessage("DCRA", responseJson.msg, 5000);
                  }
                  if (responseJson.data.is_verified == 0) {
                    this.showErrorMessage("DCRA", "Your account is under review", 5000);
                  }
                  if (responseJson.data.is_verified == 2) {
                    this.showErrorMessage("DCRA", "Your account is rejected", 5000);
                  }

                } else {
                  await AsyncStorage.setItem(
                    'loginToken',
                    responseJson.data.token,
                  );

                  await AsyncStorage.setItem('loginUserName', JSON.stringify(responseJson.data.username));
                  await AsyncStorage.setItem('userType', JSON.stringify(responseJson.data.type));
                  await AsyncStorage.setItem(
                    'loginID',
                    JSON.stringify(responseJson.data.id),
                  );
                  if (responseJson.data.mpin === null || responseJson.data.mpin === "") {
                    this.props.navigation.navigate('Mpin');
                  } else {
                    this.props.navigation.navigate('Dashboard');
                  }
                  this.setState({ isAPILoading: false });
                }
              } else {
                await AsyncStorage.setItem(
                  'loginToken',
                  responseJson.data.token,
                );

                await AsyncStorage.setItem('loginUserName', JSON.stringify(responseJson.data.username));
                await AsyncStorage.setItem('userType', JSON.stringify(responseJson.data.type));
                await AsyncStorage.setItem(
                  'loginID',
                  JSON.stringify(responseJson.data.id),
                );
                if (responseJson.data.mpin === null || responseJson.data.mpin === "") {
                  this.props.navigation.navigate('Mpin');
                } else {
                  this.props.navigation.navigate('Dashboard');
                }
                this.setState({ isAPILoading: false });
              }
            } else {
              this.setState({ isAPILoading: false });
              this.showErrorMessage("DCRA", responseJson.msg, 5000);
              this.props.navigation.navigate("Registration", { userInfo: this.state.userInfo, loginType: 'google' })
            }
          })
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
        })
      }
    })
  };
  async submit_Login_Data() {
    // this.setState({isAPILoading: true});
    const userName = this.state.userName;
    const password = this.state.password;
    const deviceID = this.state.deviceID;
    const deviceName = this.state.deviceName;
    const FCM_Token = this.state.FCM_Token;

    if (userName == '') {
      this.showErrorMessage(LoginErrorTitle, "Username required", 5000);
      // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
      return
    }

    if (password == '') {
      this.showErrorMessage(LoginErrorTitle, "Password required", 5000);
      // this.showErrorMessage(RegisterErrorTitle, 'Password required', 5000);
      return
    }


    const getLoginData = await this.props.Login(
      userName,
      password,
      deviceID,
      deviceName,
      FCM_Token
    );

    this.setState({ isAPILoading: true });
    if (getLoginData.status == 200) {
      if (getLoginData.data.type == "user") {
        if (getLoginData.status !== 200 || getLoginData.data.is_verified == 0 || getLoginData.data.is_verified == 2) {
          this.setState({ isAPILoading: false });
          if (getLoginData.msg == 'invalid username or password') {
            this.showErrorMessage("DCRA", getLoginData.msg, 5000);
          }
          if (getLoginData.data.is_verified == 0) {
            this.showErrorMessage("DCRA", "Your account is under review", 5000);
          }
          if (getLoginData.data.is_verified == 2) {
            this.showErrorMessage("DCRA", "Your account is rejected", 5000);
          }

        } else {
          await AsyncStorage.setItem(
            'loginToken',
            getLoginData.data.token,
          );

          await AsyncStorage.setItem('loginUserName', JSON.stringify(getLoginData.data.username));
          await AsyncStorage.setItem('userType', JSON.stringify(getLoginData.data.type));
          await AsyncStorage.setItem(
            'loginID',
            JSON.stringify(getLoginData.data.id),
          );

          if (getLoginData.data.mpin === null || getLoginData.data.mpin === "") {
            this.props.navigation.navigate('Mpin');
          } else {
            this.props.navigation.navigate('Dashboard'); 
          }
          this.setState({ isAPILoading: false });
        }
      } else {
        await AsyncStorage.setItem(
          'loginToken',
          getLoginData.data.token,
        );

        await AsyncStorage.setItem('loginUserName', JSON.stringify(getLoginData.data.username));
        await AsyncStorage.setItem('userType', JSON.stringify(getLoginData.data.type));
        await AsyncStorage.setItem(
          'loginID',
          JSON.stringify(getLoginData.data.id),
        );

        if (getLoginData.data.mpin === null || getLoginData.data.mpin === "") {
          this.props.navigation.navigate('Mpin');
        } else {
          this.props.navigation.navigate('Dashboard');
        }
        this.setState({ isAPILoading: false });
      }
    } else {
      this.setState({ isAPILoading: false });
      this.showErrorMessage("DCRA", getLoginData.msg, 5000);
    }
  }



  render() {
    const { navigate } = this.props.navigation;
    const { isAPILoading } = this.state;
    const isLogin = this.state.userInfo.name;
    const onPressButton = isLogin
      ? this.logoutWithFacebook
      : this.loginWithFacebook;

    if (isAPILoading == false) {
      return (
        <SafeAreaView style={styles.container}>
          {/* <View style={styles.container}> */}
          <StatusBar backgroundColor="#3877F1" />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <TouchableOpacity onPress={() => navigate('Start')}>
                <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                  <Image
                    source={require('../../../assets/Back_Arrow.png')}
                    style={{ width: 22, height: 20 }}
                  // resizeMode={'stretch'}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../../assets/1_Logo.png')}
                  style={{ width: 92, height: 92, marginRight: 20 }}
                // resizeMode={'stretch'}
                />

                <Image
                  source={require('../../../assets/2_Logo.png')}
                  style={{ width: 52, height: 92 }}
                // resizeMode={'stretch'}
                />
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <View style={{ marginTop: '23%' }}>
                  <Text
                    style={{
                      fontSize: 24,
                      color: '#000000',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    Login Into Your Account
                  </Text>
                </View>
                <View style={{ marginTop: '5%' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    Username
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
                    maxLength={20}
                    value={this.state.userName}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    onChangeText={userName => this.setState({ userName: userName.replace(/\s/g, '') })}
                  />
                </View>
                <View style={{ marginTop: '5%' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000000',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '400',
                    }}>
                    Password
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
                    maxLength={15}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 17,
                      color: '#0D2451',
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '600',
                    }}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password: password })}
                    secureTextEntry
                  />
                </View>
                <TouchableOpacity
                  style={{ alignItems: 'center', margin: 20 }}
                  onPress={() => navigate('ForgotPassword')}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#3877F1',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                      }}>
                      Forgot Password?
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.submit_Login_Data()}
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
                      Log In
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
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center' }}>
                  <Image source={require('../../../assets/Line.png')} />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                      fontWeight: '500',
                    }}>
                    OR
                  </Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Image source={require('../../../assets/Line.png')} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: '5%',
                }}>
                <TouchableOpacity onPress={() => this.GoogleSignup()}>
                  <View style={{ marginRight: 10 }}>
                    <Image source={require('../../../assets/Google.png')} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.loginWithFacebook()
                  // AccessToken.getCurrentAccessToken().then(data => {
                  //   const accessToken = data.accessToken.toString();
                  //   this.getInfoFromToken(accessToken);
                  // })

                }>
                  <View>
                    <Image source={require('../../../assets/Facebook.png')} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../../assets/Ellipse.png')} style={{ width: "100%" }} />
              <TouchableOpacity
                style={{ position: 'absolute' }}
                onPress={() => navigate('Registration')}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    textDecorationLine: 'underline',
                  }}>
                  Don’t have account? Create Now
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <FlashMessage ref="loginRef" />
          {/* {isAPILoading ? (
          <ActivityIndicator
            style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.5,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center'
            }}
            size="large"
            color="#3877F1"
          />
        ) : null} */}
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
    paddingTop: 5,
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ Login }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
