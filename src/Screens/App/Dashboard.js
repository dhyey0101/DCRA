import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  BackHandler,
  Modal,
  Dimensions,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
// import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import { Logout } from '../../Redux/Action/Auth';
import { safe_or_not_safe, NotificationData, getNotificationCountsData } from '../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

const Dashboard = ({ navigation, props }) => {
  const dispatch = useDispatch();
  const [is_safe, setIs_Safe] = useState('0');
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notSafeModalVisible, setNotSafeModalVisible] = useState(false);
  const [userType, setUserType] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [locationPermission, setLocationPermission] = useState("");
  let [loader, setLoader] = useState(false);
  const [notificationCount, setNotificationCount] = useState("")
  const isFocused = useIsFocused();
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'State Users',
      uri: require('../../../assets/Users.png'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Disaster Managers',
      uri: require('../../../assets/Users.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Verification Requests',
      uri: require('../../../assets/Verification_User.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: "I'm Safe",
      uri: require('../../../assets/Safe.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: "I'm Not Safe",
      uri: require('../../../assets/Not_Safe.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Map',
      uri: require('../../../assets/Map.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hydromet Hazard',
      uri: require('../../../assets/Hydromet.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Weather Forecast',
      uri: require('../../../assets/RainIcon.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Reports',
      uri: require('../../../assets/Report.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Population Density',
      uri: require('../../../assets/Users.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Resource Allocation',
      uri: require('../../../assets/Resource_Allocation.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Crowd Sourcing',
      uri: require('../../../assets/Users.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Feed',
      uri: require('../../../assets/Feed.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Profile',
      uri: require('../../../assets/Profile.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Feedback',
      uri: require('../../../assets/FeedBack.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Logout',
      uri: require('../../../assets/Logout.png'),
    },
  ];

  const STATEUSER = [
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Disaster Managers',
      uri: require('../../../assets/Users.png'),
    },

    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: "I'm Safe",
      uri: require('../../../assets/Safe.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: "I'm Not Safe",
      uri: require('../../../assets/Not_Safe.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Map',
      uri: require('../../../assets/Map.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hydromet Hazard',
      uri: require('../../../assets/Hydromet.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Weather Forecast',
      uri: require('../../../assets/RainIcon.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Reports',
      uri: require('../../../assets/Report.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Population Density',
      uri: require('../../../assets/Users.png'),
    },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Resource Allocation',
    //   uri: require('../../../assets/Resource_Allocation.png'),
    // },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Crowd Sourcing',
    //   uri: require('../../../assets/Users.png'),
    // },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Feed',
    //   uri: require('../../../assets/Feed.png'),
    // },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Profile',
    //   uri: require('../../../assets/Profile.png'),
    // },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Feedback',
    //   uri: require('../../../assets/FeedBack.png'),
    // },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Logout',
      uri: require('../../../assets/Logout.png'),
    },
  ];
  const PUBLICUSER = [
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: "I'm Safe",
      uri: require('../../../assets/Safe.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: "I'm Not Safe",
      uri: require('../../../assets/Not_Safe.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Map',
      uri: require('../../../assets/Map.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hydromet Hazard',
      uri: require('../../../assets/Hydromet.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Weather Forecast',
      uri: require('../../../assets/RainIcon.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Reports',
      uri: require('../../../assets/Report.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Population Density',
      uri: require('../../../assets/Users.png'),
    },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Resource Allocation',
    //   uri: require('../../../assets/Resource_Allocation.png'),
    // },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Crowd Sourcing',
      uri: require('../../../assets/Users.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Feed',
      uri: require('../../../assets/Feed.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Profile',
      uri: require('../../../assets/Profile.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Feedback',
      uri: require('../../../assets/FeedBack.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Logout',
      uri: require('../../../assets/Logout.png'),
    },
  ];
  const [appState, setAppstate] = useState("");
  const Item = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Image source={item.uri} />
          </View>
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
        <View>
          <Image source={require('../../../assets/Gray_Right.png')} />
        </View>
      </TouchableOpacity>
    </View>
  );

  function handleBackButtonClick() {
    // _handleBackButtonClick = () => BackHandler.exitApp();
    // return true;

    {


      Alert.alert(
        'Exit App',
        'Exiting the application',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    }

  }

  useEffect(() => {
    getUserType();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    // alert("Hello")
    getNotifications();
  }, [isFocused])
  const getNotifications = async () => {
    // setLoader(true);
    // this.setState({isAPILoading: true});
    const Token = await AsyncStorage.getItem('loginToken');
    const get_notification_count_Data = await dispatch(
      getNotificationCountsData(Token),
    );
    console.log(get_notification_count_Data, "COUNT")
    setNotificationCount(get_notification_count_Data.data.count);
    setLoader(false);
  }

  const getUserType = async () => {
    setLoader(true);
    const userTypeInfo = await AsyncStorage.getItem('loginID');
    setUserType(userTypeInfo);
    console.log(userType, '================USERTYPE');
    // setLoader(false);
  };

  const LogoutAccount = () => {
    Alert.alert(
      'DCRA',
      'Are you sure want to logout',
      [
        { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
        { text: 'Yes', onPress: () => LogOut() },
      ],
      {
        cancelable: false
      }
    );
  };

  const LogOut = async () => {
    setLoader(true)
    const Token = await AsyncStorage.getItem('loginToken');
    try {
      const logoutResponse = await dispatch(Logout(Token));
      if (logoutResponse && logoutResponse.status) {
        await AsyncStorage.clear();
        setLoader(false)
        // this.props.navigation.navigate('AccountType', { data: registerData.data })
        navigation.navigate('AuthStack');
        return true;
      } else {
        setLoader(false)
        // this.setState({isLogoutLoading: false});
        alert(logoutResponse.msg);
      }
    } catch (err) {
      setLoader(false)
      console.log('error is: ' + err);
    }
  }

  const safe = async () => {
    setModalVisible(true);

    // requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
  };
  const requestLocationPermission = async () => {
    console.log('Enter');
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        console.log('Enter in try');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        console.log(granted, "---------===========")
        setLocationPermission(granted)
        // return
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Enter in try IF');

          //To Check, If Permission is granted
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const unSafe = async () => {
    setNotSafeModalVisible(true);
    // requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
  };

  const callSafe = async () => {
    setModalVisible(!modalVisible)
    // setIs_Safe('1');
    // const Token = await AsyncStorage.getItem('loginToken');
    // const callSafeData = await dispatch(
    //   safe_or_not_safe(Token, is_safe, currentLatitude, currentLongitude),
    // );
    // if (callSafeData.status == 200) {
    //   // setLoader(false);
    //   setModalVisible(!modalVisible);
    // } else {
    //   // setLoader(false);
    //   console.log(callSafeData.msg);
    // }
  };
  const call_Un_Safe = async () => {
    setNotSafeModalVisible(!notSafeModalVisible);
    // setIs_Safe('0');
    // console.log(is_safe, '000&&&&&&&000');

    // const Token = await AsyncStorage.getItem('loginToken');

    // const callSafeData = await dispatch(
    //   safe_or_not_safe(Token, is_safe, currentLatitude, currentLongitude),
    // );
    // if (callSafeData.status == 200) {
    //   // setLoader(false);
    //   setNotSafeModalVisible(!notSafeModalVisible);
    // } else {
    //   // setLoader(false);
    //   console.log(callSafeData.msg);
    // }
  };

  const getOneTimeLocation = () => {
    console.log('enter location in Function');
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        console.log(currentLatitude, '000000000-----------00000000000');
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log(position, '==================-------------==============');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };
  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          if (item.title === 'State Users') {
            navigation.navigate('StateUsers');
          }
          if (item.title === 'Disaster Managers') {
            navigation.navigate('DisasterManagers');
          }
          if (
            item.title !== 'State Users' &&
            item.title !== 'Disaster Managers' &&
            item.title !== 'Verification Requests' &&
            item.title !== 'Crowd Sourcing' &&
            item.title !== 'Feed' &&
            item.title !== 'Feedbacks' &&
            item.title !== 'Map' &&
            item.title !== "I'm Safe" &&
            item.title !== "I'm Not Safe" &&
            item.title !== 'Reports' &&
            item.title !== 'Population Density' &&
            item.title !== 'Resource Allocation' &&
            item.title !== 'Profile' &&
            item.title !== 'Feedback' &&
            item.title !== 'Hydromet Hazard' &&
            item.title !== 'Logout'
          ) {
            navigation.navigate('WeatherTypes', {
              id: item.id,
              name: item.title,
            });
          }
          if (item.title === 'Verification Requests') {
            navigation.navigate('VerificationRequests');
          }
          if (item.title === 'Crowd Sourcing') {
            navigation.navigate('CrowdSourcingFirst');
          }
          if (item.title === 'Feed') {
            navigation.navigate('FeedTabs');
          }
          if (item.title === 'Feedback') {
            navigation.navigate('FeedBack');
          }
          if (item.title === 'Map') {
            navigation.navigate('Map');
          }
          if (item.title === "I'm Safe") {
            safe();
          }
          if (item.title === "I'm Not Safe") {
            // setNotSafeModalVisible(true);
            unSafe();
          }
          if (item.title === 'Hydromet Hazard') {
            navigation.navigate('HydrometHazard', {
              id: item.id,
              name: item.title,
            });
          }
          if (item.title === 'Profile') {
            navigation.navigate('Profile');
          }
          if (item.title === 'Logout') {
            LogoutAccount();
          }
        }}
      />
    );
  };
  if (!loader) {
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
            <Image source={require('../../../assets/Ellipse_Head.png')} />
            {/* <Header> */}
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ width: '20%' }}></View>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                  }}>
                  DASHBOARD
                </Text>
              </View>
              <TouchableOpacity
                style={styles.bell}
                onPress={() => navigation.navigate('Notification')}
              >
                <View>
                  <Image source={require('../../../assets/Bell.png')} />
                  {notificationCount === 0 ? (
                    <View></View>
                  ) : (
                    <View style={styles.bellNotify}>
                      <Text style={{ fontSize: 7, color: '#fff' }}>{notificationCount}</Text>
                    </View>
                  )}

                </View>
              </TouchableOpacity>
            </View>

            {/* </Header> */}
          </View>
        </LinearGradient>
        <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
          <View style={styles.message}>
            <View style={styles.alertMessage}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 9,
                  fontFamily: 'OpenSans-Semibold',
                }}>
                Alert Message
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#215ACA',
                  fontSize: 12,
                  fontFamily: 'OpenSans-Semibold',
                }}>
                Weather forecast in next five days
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 8,
                  fontFamily: 'OpenSans-Regular',
                }}>
                Last Updated: 2021-10-09 12:34:21
              </Text>
            </View>
          </View>
        </View>
        {userType === "1" ? (
          <FlatList
            // style={{paddingVertical: 20}}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        ) : (
          <FlatList
            // style={{paddingVertical: 20}}
            data={userType === "state_user" ? STATEUSER : PUBLICUSER}
            // data={STATEUSER}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        )}
        {/* <View>
             {userType === 'state_user' ? (
               <FlatList
                 data={STATEUSER}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                 extraData={selectedId}
               />
             ) : (
               <View>
                 {userType === 'user' ? (
                   <FlatList
                     // style={{paddingVertical: 20}}
                     data={PUBLICUSER}
                     renderItem={renderItem}
                     keyExtractor={item => item.id}
                     extraData={selectedId}
                   />
                 ) : (
                   <FlatList
                     // style={{paddingVertical: 20}}
                     data={DATA}
                     renderItem={renderItem}
                     keyExtractor={item => item.id}
                     extraData={selectedId}
                   />
                 )}
               </View>
             )}
          </View>
        )} */}

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              {locationPermission === "granted" ? (
                <View style={styles.modalView}>

                  <Text style={styles.modalText}>
                    your message have been successfully sent with your relative
                    members
                  </Text>


                  {/* <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}> */}
                  <TouchableOpacity onPress={() => callSafe()}>
                    <View style={[styles.button, styles.buttonClose]}>
                      <Text style={styles.textStyle}>OK</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              ) : (
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    we don't have to sent the SMS
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <View style={[styles.button, styles.buttonClose]}>
                      <Text style={styles.textStyle}>OK</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={notSafeModalVisible}
            onRequestClose={() => {
              setNotSafeModalVisible(!notSafeModalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  your message have been successfully sent with your relative
                  members along with state admin.
                </Text>
                <TouchableOpacity onPress={() => call_Un_Safe()}>
                  <View style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>OK</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 9,
  },
  alertMessage: {
    borderRadius: 25,
    width: 80,
    backgroundColor: '#FB7429',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    marginBottom: 6,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 2,
    borderRadius: 40,
    marginBottom: 20,
    // marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 9,
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

  // ModalView

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    // backgroundColor:'#c5c5c5',

    shadowColor: '#232324',
    shadowOffset: { width: 0, height: 1 },
    elevation: 200,
    // top: 200,
    // height:"20%",
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(100,100,100, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ Logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
