import React, {useRef, useState, useEffect} from 'react';
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
  FlatList,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddDisasterUser} from '../../../Redux/Action/Admin';
import {useDispatch, useSelector} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

const Item = ({item, onPress}) => (
  <View>
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginLeft: 13}}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);
const AddDisasterManager = ({navigation, route}) => {
  const dispatch = useDispatch();
  let dropDownAlertRef = useRef();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DOB, setDOB] = useState('');
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  let [loader, setLoader] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [userDataInfo, setUserDataInfo] = useState('');
  const [userId, setUserId] = useState('');
  const [contryState, setContryState] = useState([
    {
      id: '28',
      title: 'Andhra Pradesh',
    },
    {
      id: '25',
      title: 'Daman & Diu',
    },
    {
      id: '30',
      title: 'Goa',
    },
    {
      id: '24',
      title: 'Gujarat',
    },
    {
      id: '29',
      title: 'Karnataka',
    },
    {
      id: '32',
      title: 'Kerala',
    },
    {
      id: '27',
      title: 'Maharashtra',
    },
    {
      id: '34',
      title: 'Puducherry',
    },
    {
      id: '21',
      title: 'Odisha',
    },
    {
      id: '33',
      title: 'Tamil Nadu',
    },
    {
      id: '19',
      title: 'West Bengal',
    },
    {
      id: '35',
      title: 'Andaman & Nicobar Islands',
    },
    {
      id: '31',
      title: 'Lakshadweep',
    },
  ]);
  const [contryDistrict, setContryDistrict] = useState([
    {
      id: '5',
      title: 'Andhra Pradesh',
    },
    {
      id: '6',
      title: 'Arunachal Pradesh',
    },
    {
      id: '7',
      title: 'Assam',
    },
    {
      id: '8',
      title: 'Bihar',
    },
  ]);
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    // setLoader(true);
    const Data = route.params;
    console.log(Data, "EDIT")

    // const Userdata = Data.userInfo;
    // setUserDataInfo(Data);
    const Header = Data.flag;
    setHeaderTitle(Header);
    console.log(headerTitle, '=================USER');
    // console.log(userDataInfo, '===========rrrrrrrrrr======USER');
    setUserName(Data.userInfo.first_name);
    setMobileNumber(Data.userInfo.mobile);
    if(Data.flag === ""){
      setStateName("Select State");
    }else{
      setStateName(Data.userInfo.state);
    }
    setUserId(Data.userInfo.id);
    // setLoader(false);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(moment(currentDate).format('DD-MM-YYYY'), '======');
    setShow(Platform.OS === 'ios');
    setDOB(moment(currentDate).format('DD/MM/YYYY'));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onToggle = item => {
    setStateName(item.title);
    setStateToggle(false);
  };
  const districtonToggle = item => {
    setdistrictName(item.title);
    setdistrictToggle(false);
  };

  const stateRenderItem = ({item}) => {
    return <Item item={item} onPress={() => onToggle(item)} />;
  };
  const districtRenderItem = ({item}) => {
    return <Item item={item} onPress={() => districtonToggle(item)} />;
  };

  const AddDisasterUserData = async () => {
    const Token = await AsyncStorage.getItem('loginToken');

    if (userName == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Name required');
      return;
      // this.showErrorMessage(RegisterErrorTitle, 'Username required', 5000);
    }

    if (mobileNumber == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Mobilenumber required');

      // showErrorMessage(LoginErrorTitle, "Mobilenumber Required", 5000);
      // this.showErrorMessage(RegisterErrorTitle, 'Password required', 5000);
      return;
    }
    if (stateName == 'Select State') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'State required');
      // showErrorMessage(LoginErrorTitle, "State Required", 5000);
      // this.showErrorMessage(RegisterErrorTitle, 'Password required', 5000);
      return;
    }
    setLoader(true);
    const addUserData = await dispatch(
      AddDisasterUser(Token, userId, userName, mobileNumber, stateName),
    );
    if (addUserData.status == 200) {
      setLoader(false);
      navigation.navigate('DisasterManagers');
    } else {
      setLoader(false);
      dropDownAlertRef.alertWithType('error', 'DCRA', addUserData.message);
    }

    
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
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={require('../../../../assets/Ellipse_Head.png')} />
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
              <TouchableOpacity
                onPress={() => navigation.navigate('DisasterManagers')}
                style={{width: '20%'}}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View>
                {headerTitle === 'editDisasterManager' ? (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    EDIT DISASTER MANAGER
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    ADD DISASTER MANAGER
                  </Text>
                )}
              </View>
              <View style={{width: '20%'}}></View>
            </View>
            {/* </Header> */}
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={{paddingHorizontal: 10}}>
            <View style={{paddingHorizontal: 10}}>
              <View style={{marginTop: '5%'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  Full Name <Text style={{color: 'red'}}>*</Text>
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
                  value={userName}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    color: '#0D2451',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                  }}
                  onChangeText={userName => setUserName(userName)}
                />
              </View>

              <View style={{marginTop: '5%'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  Mobile Number <Text style={{color: 'red'}}>*</Text>
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
                  value={mobileNumber}
                  keyboardType={'numeric'}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    color: '#0D2451',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                  }}
                  onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                />
              </View>

              <View style={{marginTop: '5%'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  State <Text style={{color: 'red'}}>*</Text>
                </Text>
              </View>
              <Collapse
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#DFDFDF',
                }}
                isExpanded={stateToggle}
                onToggle={isExpanded => setStateToggle(isExpanded)}>
                <CollapseHeader
                  style={{
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#DFDFDF',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 17,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text>{stateName}</Text>
                  </View>
                  <Image
                    source={require('../../../../assets/DownArrow.png')}
                    //   style={{width: 22, height: 20}}
                    // resizeMode={'stretch'}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <FlatList
                    style={{paddingVertical: 10}}
                    data={contryState}
                    renderItem={stateRenderItem}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
              {/* </View> */}
            </View>
            <TouchableOpacity
              onPress={() => AddDisasterUserData()}
              style={{
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
                  Save
                </Text>
              </View>
              <View>
                <Image
                  source={require('../../../../assets/Login_Arrow.png')}
                  style={{width: 27.5, height: 26.7}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <DropdownAlert
          ref={ref => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        />
      </SafeAreaView>
    );
  } else {
    return <ActivityIndicator style={{justifyContent: 'center', flex: 1}} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    ...Platform.select({
      android: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        // marginTop: "20%",
      },
      ios: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        marginTop: '20%',
      },
    }),
  },
  goldImage: {
    ...Platform.select({
      android: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingHorizontal: '25%',
      },
      ios: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingHorizontal: '18%',
      },
    }),
  },
  title: {
    marginTop: 20,
    // fontWeight: "bold",
    fontSize: 14,
    fontFamily: 'Metropolis_SemiBold',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'Metropolis_Regular',
    color: '#000',
    opacity: 0.5,
  },
  textInput: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 14,
    padding: 15,
    borderColor: '#F0F0F0',
    backgroundColor: '#F0F0F0',
    fontFamily: 'Poppins_Regular',
  },
  forgotPassword: {
    marginTop: 30,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Metropolis_Regular',
    color: '#000',
  },
  loginButton: {
    marginTop: 22,
    // backgroundColor: "#FE8312",
    borderRadius: 52,
    paddingVertical: 20,
    alignItems: 'center',

    shadowColor: '#FE8312',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 20,
  },
  signupText: {
    marginTop: 36,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
export default AddDisasterManager;
