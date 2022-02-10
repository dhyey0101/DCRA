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
  ActivityIndicator,
  BackHandler
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddStateUserData} from '../../../Redux/Action/Admin';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
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
const AddStateUser = ({navigation, route}) => {
  let dropDownAlertRef = useRef();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [relative1MobileNumber, setRelative1MobileNumber] = useState('');
  const [relative2MobileNumber, setRelative2MobileNumber] = useState('');
  const [relative3MobileNumber, setRelative3MobileNumber] = useState('');
  const [relative4MobileNumber, setRelative4MobileNumber] = useState('');
  const [relative5MobileNumber, setRelative5MobileNumber] = useState('');

  let [loader, setLoader] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DOB, setDOB] = useState('');
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
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

  const [gujaratDistrict, setGujaratDistrict] = useState([
    {
      id: '474',
      title: 'Ahmadabad',
    },
    {
      id: '480',
      title: 'Amreli',
    },
    {
      id: '482',
      title: 'Anand',
    },
    {
      id: '469',
      title: 'Banas Kantha',
    },
    {
      id: '488',
      title: 'Bharuch',
    },
    {
      id: '481',
      title: 'Bhavnagar',
    },
    {
      id: '477',
      title: 'Jamnagar',
    },
    {
      id: '479',
      title: 'Junagadh',
    },
    {
      id: '468',
      title: 'Kachchh',
    },
    {
      id: '483',
      title: 'Kheda',
    },
    {
      id: '487',
      title: 'Narmada',
    },
    {
      id: '490',
      title: 'Navsari',
    },
    {
      id: '470',
      title: 'Patan',
    },
    {
      id: '478',
      title: 'Porbandar',
    },
    {
      id: '476',
      title: 'Rajkot',
    },
    {
      id: '492',
      title: 'Surat',
    },
    {
      id: '475',
      title: 'Surendranagar',
    },
    {
      id: '486',
      title: 'Vadodara',
    },
    {
      id: '491',
      title: 'Valsad',
    },
  ]);

  const [
    Andaman_Nicobar_Islands_District,
    setAndaman_Nicobar_Islands_District,
  ] = useState([
    {
      id: '638',
      title: 'Nicobars',
    },
    {
      id: '639',
      title: 'North & Middle Andaman',
    },
    {
      id: '640',
      title: 'South Andaman',
    },
  ]);

  const [Daman_Diu_District, setDaman_Diu_District] = useState([
    {
      id: '495',
      title: 'Daman',
    },
    {
      id: '494',
      title: 'Diu',
    },
  ]);

  const [Andhra_Pradesh_District, setAndhra_Pradesh_District] = useState([
    {
      id: '545',
      title: 'East Godavari',
    },
    {
      id: '548',
      title: 'Guntur',
    },
    {
      id: '547',
      title: 'Krishna',
    },
    {
      id: '549',
      title: 'Prakasam',
    },
    {
      id: '550',
      title: 'Sri Potti Sriramulu Nellore',
    },
    {
      id: '542',
      title: 'Srikakulam',
    },
    {
      id: '544',
      title: 'Vishakhapatnam',
    },
    {
      id: '543',
      title: 'Vizianagaram',
    },
    {
      id: '546',
      title: 'West Godavari',
    },
  ]);

  const [Goa_District, setGoa_District] = useState([
    {
      id: '585',
      title: 'North Goa',
    },
    {
      id: '586',
      title: 'South Goa',
    },
  ]);

  const [Karnataka_District, setKarnataka_District] = useState([
    {
      id: '575',
      title: 'Dakshina Kannada',
    },
    {
      id: '569',
      title: 'Udupi',
    },
    {
      id: '563',
      title: 'Uttara Kannada',
    },
    {
      id: '598',
      title: 'Alappuzha',
    },
    {
      id: '595',
      title: 'Ernakulam',
    },
    {
      id: '589',
      title: 'Kannur',
    },
    {
      id: '588',
      title: 'Kasaragod',
    },
    {
      id: '600',
      title: 'Kollam',
    },
    {
      id: '597',
      title: 'Kottayam',
    },
    {
      id: '591',
      title: 'Kozhikode',
    },
    {
      id: '592',
      title: 'Malappuram',
    },
    {
      id: '593',
      title: 'Palakkad',
    },
    {
      id: '599',
      title: 'Pathanamthitta',
    },
    {
      id: '594',
      title: 'Thiruvananthapuram',
    },
  ]);

  const [Lakshadweep_District, setLakshadweep_District] = useState([
    {
      id: '587',
      title: 'Lakshadweep',
    },
  ]);

  const [Maharashtra_District, setMaharashtra_District] = useState([
    {
      id: '519',
      title: 'Mumbai',
    },
    {
      id: '518',
      title: 'Mumbai(Suburban)',
    },
    {
      id: '520',
      title: 'Raigarh',
    },
    {
      id: '528',
      title: 'Ratnagiri',
    },
    {
      id: '529',
      title: 'Sindhudurg',
    },
    {
      id: '517',
      title: 'Thane',
    },
  ]);

  const [Odisha_District, setOdisha_District] = useState([
    {
      id: '377',
      title: 'Baleswar',
    },
    {
      id: '378',
      title: 'Bhadrak',
    },
    {
      id: '381',
      title: 'Cuttack',
    },
    {
      id: '388',
      title: 'Ganjam',
    },
    {
      id: '380',
      title: 'Jagatsinghpur',
    },
    {
      id: '382',
      title: 'Jajpur',
    },
    {
      id: '386',
      title: 'Khordha',
    },
    {
      id: '376',
      title: 'Mayurbhanj',
    },
    {
      id: '387',
      title: 'Puri',
    },
  ]);

  const [Puducherry_District, setPuducherry_District] = useState([
    {
      id: '637',
      title: 'Karaikal',
    },
    {
      id: '636',
      title: 'Mahe',
    },
    {
      id: '635',
      title: 'Puducherry',
    },
    {
      id: '634',
      title: 'Yanam',
    },
  ]);

  const [Tamil_Nadu_District, setTamil_Nadu_District] = useState([
    {
      id: '603',
      title: 'Chennai',
    },
    {
      id: '617',
      title: 'Cuddalore',
    },
    {
      id: '604',
      title: 'Kancheepuram',
    },
    {
      id: '629',
      title: 'Kanniyakumari',
    },
    {
      id: '618',
      title: 'Nagapattinam',
    },
    {
      id: '621',
      title: 'Pudukkottai',
    },
    {
      id: '626',
      title: 'Ramanathapuram',
    },
    {
      id: '620',
      title: 'Thanjavur',
    },
    {
      id: '602',
      title: 'Thiruvallur',
    },
    {
      id: '619',
      title: 'Thiruvarur',
    },
    {
      id: '627',
      title: 'Thoothukkudi',
    },
    {
      id: '628',
      title: 'Tirunelveli',
    },
    {
      id: '607',
      title: 'Viluppuram',
    },
  ]);

  const [West_Bengal_District, setWest_Bengal_District] = useState([
    {
      id: '341',
      title: 'Haora',
    },
    {
      id: '338',
      title: 'Hugli',
    },
    {
      id: '342',
      title: 'Kolkata',
    },
    {
      id: '337',
      title: 'North Twenty Four Parganas',
    },
    {
      id: '344',
      title: 'Paschim Medinipur',
    },
    {
      id: '345',
      title: 'Purba Medinipur',
    },
    {
      id: '343',
      title: 'South Twenty Four Parganas',
    },
  ]);
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    setLoader(true);
    const Data = route.params;
    // const Userdata = route.params.userInfo;
    // setUserDataInfo(Userdata);
    const Header = Data.flag;
    setHeaderTitle(Header);
    console.log(Header, '=================USER');
    // console.log(userDataInfo, '===========rrrrrrrrrr======USER');
    setFirstName(Data.userInfo.first_name);
    setUserName(Data.userInfo.username);
    setMobileNumber(Data.userInfo.mobile);
    setDOB(Data.userInfo.date_of_birth);
    if(Data.flag === ""){
      setStateName("Select State");
      setdistrictName("Select District");
    }else{
      setStateName(Data.userInfo.state);
      setdistrictName(Data.userInfo.district);
    }
    setRelative1MobileNumber(Data.userInfo.relative_mobile_number_1);
    setRelative2MobileNumber(Data.userInfo.relative_mobile_number_2);
    setRelative3MobileNumber(Data.userInfo.relative_mobile_number_3);
    setRelative4MobileNumber(Data.userInfo.relative_mobile_number_4);
    setRelative5MobileNumber(Data.userInfo.relative_mobile_number_5);
    setUserId(Data.userInfo.id);
    setLoader(false);
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
    console.log(moment(currentDate).format('YYYY/MM/DD'), '======');
    setShow(Platform.OS === 'ios');
    setDOB(moment(currentDate).format('YYYY/MM/DD'));
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
    setdistrictName('Select District')
    setStateToggle(false);
    setdistrictToggle(false);
    
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

  const addStateUserData = async () => {
    const Token = await AsyncStorage.getItem('loginToken');

    console.log(firstName, 'fffffffff');
    console.log(userName, 'fffffffff');
    console.log(mobileNumber, 'fffffffff');
    console.log(DOB, 'fffffffff');
    console.log(password, 'fffffffff');
    console.log(relative1MobileNumber, 'fffffffff');
    console.log(relative2MobileNumber, 'fffffffff');
    console.log(relative3MobileNumber, 'fffffffff');
    console.log(relative4MobileNumber, 'fffffffff');
    console.log(relative5MobileNumber, 'fffffffff');

    if (headerTitle === 'editUser') {
      if (firstName == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'Firstname required');
        return;
      }
      if (userName == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'Username required');
        return;
      }

      if (mobileNumber == '') {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          'Mobilenumber required',
        );
        return;
      }
      if (DOB == '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'Select DOB');
        return;
      }
      if (stateName == 'Select State') {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'State required');
        return;
      }
      if (districtName == 'Select District') {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'District required');
        return;
      }
    } else {
      if (firstName === '' || firstName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'Firstname required');
        return;
      }
      if (userName === '' || userName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'Username required');
        return;
      }

      if (mobileNumber == '' || mobileNumber === undefined) {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          'Mobilenumber required',
        );
        return;
      }
      if (DOB === '' || DOB === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'Select DOB');
        return;
      }
      if (password === '') {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'Password required');
        return;
      }
      if (confirmPassword !== password || confirmPassword == '') {
        dropDownAlertRef.alertWithType(
          'error',
          'DCRA',
          'Confirm Password required',
        );
        return;
      }
      if (stateName === 'Select State' || stateName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'State required');
        return;
      }
      if (districtName === 'Select District' || districtName === undefined) {
        dropDownAlertRef.alertWithType('error', 'DCRA', 'District required');
        return;
      }
    }

    setLoader(true);
    const addStateData = await dispatch(
      AddStateUserData(
        Token,
        userId,
        firstName,
        userName,
        mobileNumber,
        DOB,
        password,
        stateName,
        districtName,
        relative1MobileNumber,
        relative2MobileNumber,
        relative3MobileNumber,
        relative4MobileNumber,
        relative5MobileNumber,
      ),
    );
    if (addStateData.status == 200) {
      setFirstName('');
      setUserName('');
      setMobileNumber('');
      setDOB('');
      setStateName('Select State');
      setdistrictName('Select District');
      setRelative1MobileNumber('');
      setRelative2MobileNumber('');
      setRelative3MobileNumber('');
      setRelative4MobileNumber('');
      setRelative5MobileNumber('');
      setUserId('');
      setLoader(false);
      navigation.navigate('StateUsers');
    } else {
      setLoader(false);
      dropDownAlertRef.alertWithType('DCRA', 'error', addStateData.msg);
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
                onPress={() => navigation.navigate('StateUsers')}
                style={{width: '20%'}}>
                <View>
                  <Image
                    source={require('../../../../assets/Back_Arrow_White.png')}
                  />
                </View>
              </TouchableOpacity>
              <View>
                {headerTitle === 'editUser' ? (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    EDIT STATE USER
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    ADD STATE USER
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
            <View style={{paddingHorizontal: 10, marginTop: 40}}>
              <View style={{marginTop: '5%'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  Full Name
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
                  value={firstName}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={firstName => setFirstName(firstName)}
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
                  value={userName}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
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
                  keyboardType={'numeric'}
                  value={mobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
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
                  Date Of Birth
                </Text>
              </View>
              <TouchableOpacity onPress={showDatepicker}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: '#DFDFDF',
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 12,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        color: '#000000',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                      }}>
                      {DOB}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require('../../../../assets/Calendar.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}
              {headerTitle === 'editUser' ? (
                <View></View>
              ) : (
                <View>
                  <View style={{marginTop: '5%'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000000',
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '400',
                      }}>
                      Password <Text style={{color: 'red'}}>*</Text>
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
                      value={password}
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 17,
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                        color: '#0D2451',
                      }}
                      onChangeText={password => setPassword(password)}
                      secureTextEntry
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
                      Confirm Password <Text style={{color: 'red'}}>*</Text>
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
                      value={confirmPassword}
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 17,
                        fontFamily: 'OpenSans-Regular',
                        fontWeight: '600',
                        color: '#0D2451',
                      }}
                      onChangeText={confirmPassword =>
                        setConfirmPassword(confirmPassword)
                      }
                      secureTextEntry
                    />
                  </View>
                </View>
              )}

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
              style={{borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF'}}
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
              <View style={{marginTop: '5%'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  District <Text style={{color: 'red'}}>*</Text>
                </Text>
              </View>
              {stateName === 'Gujarat' ? (
              <Collapse
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#DFDFDF',
                }}
                isExpanded={districtToggle}
                onToggle={isExpanded => setdistrictToggle(isExpanded)}>
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
                    <Text>{districtName}</Text>
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
                    data={gujaratDistrict}
                    renderItem={districtRenderItem}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
            ) : (
              <Collapse
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#DFDFDF',
                }}
                isExpanded={districtToggle}
                onToggle={isExpanded => setdistrictToggle(isExpanded)}>
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
                    <Text>{districtName}</Text>
                  </View>
                  <Image
                    source={require('../../../../assets/DownArrow.png')}
                    //   style={{width: 22, height: 20}}
                    // resizeMode={'stretch'}
                  />
                </CollapseHeader>
                {stateName === 'Andaman & Nicobar Islands' ? (
                  <CollapseBody>
                    <FlatList
                      style={{paddingVertical: 10}}
                      data={Andaman_Nicobar_Islands_District}
                      renderItem={districtRenderItem}
                      keyExtractor={item => item.id}
                    />
                  </CollapseBody>
                ) : (
                  <CollapseBody>
                    {stateName === 'Andhra Pradesh' ? (
                      <View>
                        <FlatList
                          style={{paddingVertical: 10}}
                          data={Andhra_Pradesh_District}
                          renderItem={districtRenderItem}
                          keyExtractor={item => item.id}
                        />
                      </View>
                    ) : (
                      <View>
                        {stateName === 'Daman & Diu' ? (
                          <FlatList
                            style={{paddingVertical: 10}}
                            data={Daman_Diu_District}
                            renderItem={districtRenderItem}
                            keyExtractor={item => item.id}
                          />
                        ) : (
                          <View>
                            {stateName === 'Goa' ? (
                              <FlatList
                                style={{paddingVertical: 10}}
                                data={Goa_District}
                                renderItem={districtRenderItem}
                                keyExtractor={item => item.id}
                              />
                            ) : (
                              <View>
                                {stateName === 'Karnataka' ? (
                                  <FlatList
                                    style={{paddingVertical: 10}}
                                    data={Karnataka_District}
                                    renderItem={districtRenderItem}
                                    keyExtractor={item => item.id}
                                  />
                                ) : (
                                  <View>
                                    {stateName === 'Kerala' ? (
                                      <FlatList
                                        style={{paddingVertical: 10}}
                                        data={Karnataka_District}
                                        renderItem={districtRenderItem}
                                        keyExtractor={item => item.id}
                                      />
                                    ) : (
                                      <View>
                                        {stateName === 'Lakshadweep' ? (
                                          <FlatList
                                            style={{paddingVertical: 10}}
                                            data={Lakshadweep_District}
                                            renderItem={districtRenderItem}
                                            keyExtractor={item => item.id}
                                          />
                                        ) : (
                                          <View>
                                            {stateName === 'Maharashtra' ? (
                                              <FlatList
                                                style={{paddingVertical: 10}}
                                                data={Maharashtra_District}
                                                renderItem={districtRenderItem}
                                                keyExtractor={item => item.id}
                                              />
                                            ) : (
                                              <View>
                                                {stateName === 'Odisha' ? (
                                                  <FlatList
                                                    style={{
                                                      paddingVertical: 10,
                                                    }}
                                                    data={Odisha_District}
                                                    renderItem={
                                                      districtRenderItem
                                                    }
                                                    keyExtractor={item =>
                                                      item.id
                                                    }
                                                  />
                                                ) : (
                                                  <View>
                                                    {stateName ===
                                                    'Puducherry' ? (
                                                      <FlatList
                                                        style={{
                                                          paddingVertical: 10,
                                                        }}
                                                        data={
                                                          Puducherry_District
                                                        }
                                                        renderItem={
                                                          districtRenderItem
                                                        }
                                                        keyExtractor={item =>
                                                          item.id
                                                        }
                                                      />
                                                    ) : (
                                                      <View>
                                                        {stateName ===
                                                        'Tamil Nadu' ? (
                                                          <FlatList
                                                            style={{
                                                              paddingVertical: 10,
                                                            }}
                                                            data={
                                                              Tamil_Nadu_District
                                                            }
                                                            renderItem={
                                                              districtRenderItem
                                                            }
                                                            keyExtractor={item =>
                                                              item.id
                                                            }
                                                          />
                                                        ) : (
                                                          <View>
                                                            {stateName === "West Bengal" ? (
                                                              <FlatList
                                                              style={{
                                                                paddingVertical: 10,
                                                              }}
                                                              data={
                                                                West_Bengal_District
                                                              }
                                                              renderItem={
                                                                districtRenderItem
                                                              }
                                                              keyExtractor={item =>
                                                                item.id
                                                              }
                                                            />
                                                            ):(
                                                              <View>
                                                                {/* <FlatList
                                                              style={{
                                                                paddingVertical: 10,
                                                              }}
                                                              data={
                                                                Lakshadweep_District
                                                              }
                                                              renderItem={
                                                                districtRenderItem
                                                              }
                                                              keyExtractor={item =>
                                                                item.id
                                                              }
                                                            /> */}
                                                              </View>
                                                            )}
                                                            
                                                          </View>
                                                        )}
                                                      </View>
                                                    )}
                                                  </View>
                                                )}
                                              </View>
                                            )}
                                          </View>
                                        )}
                                      </View>
                                    )}
                                  </View>
                                )}
                              </View>
                            )}
                          </View>
                        )}
                      </View>
                    )}
                  </CollapseBody>
                )}
                {/* <CollapseBody>
                <FlatList
                  style={{paddingVertical: 10}}
                  data={Tamil_Nadu_District}
                  renderItem={districtRenderItem}
                  keyExtractor={item => item.id}
                />
              </CollapseBody> */}
              </Collapse>
            )}
              <View style={{marginTop: '5%'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  Relative 1 Mobile Number <Text style={{color: 'red'}}>*</Text>
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
                  keyboardType={'numeric'}
                  value={relative1MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative1MobileNumber =>
                    setRelative1MobileNumber(relative1MobileNumber)
                  }
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
                  Relative 2 Mobile Number
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
                  keyboardType={'numeric'}
                  value={relative2MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative2MobileNumber =>
                    setRelative2MobileNumber(relative2MobileNumber)
                  }
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
                  Relative 3 Mobile Number
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
                  keyboardType={'numeric'}
                  value={relative3MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative3MobileNumber =>
                    setRelative3MobileNumber(relative3MobileNumber)
                  }
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
                  Relative 4 Mobile Number
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
                  keyboardType={'numeric'}
                  value={relative4MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative4MobileNumber =>
                    setRelative4MobileNumber(relative4MobileNumber)
                  }
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
                  Relative 5 Mobile Number
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
                  keyboardType={'numeric'}
                  value={relative5MobileNumber}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={relative5MobileNumber =>
                    setRelative5MobileNumber(relative5MobileNumber)
                  }
                />
              </View>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Dashboard')}
                onPress={() => addStateUserData()}
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
export default AddStateUser;
