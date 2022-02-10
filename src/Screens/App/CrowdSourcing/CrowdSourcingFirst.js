import React, { useEffect, useState, useRef } from 'react';
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
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddStateUserData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';

const CrowdSourcingFirst = ({ navigation, route }) => {

  let dropDownAlertRef = useRef();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DOB, setDOB] = useState('');
  const [time, setTime] = useState('');
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [cyclone_name, setCycloneName] = useState("")

  const [damageCause_List, set_DamageCause_List] = useState([]);
  const [damageCauseComment, setdamageCauseComment] = useState('');
  const [questions_to_manager, setquestions_to_manager] = useState('');
  // const [damge_video, setdamge_video] = useState('');
  const [additional_damage_details, setadditional_damage_details] =
    useState('');
  const [weather_phenomena_commnet, setweatherComment] = useState('');
  const [flood_reason_comment, setfloodComment] = useState('');
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([]);
  const [flood_Reason_List, setflood_Reason_List] = useState([]);

  const [imageSource, setImageSource] = useState([]);
  const [damge_video, setVideo] = useState("");

  const [modalVisible, setModalVisible] = useState(false)
  const [croudSourcingID, setCroudSourcingID] = useState("")
  var [loader, setLoader] = useState(false);
  const [editResponse, setEditResponse] = useState("");
  const [flag, setFlag] = useState(true);
  const [screen, setScreen] = useState("")
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
  const Item = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );


  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    console.log("ENTER")
    if(route.params){
    setEditResponse(route.params)
    console.log("===============ROUTE=======R========")
    console.log(route.params)
    console.log("===============ROUTE===============")
    

    
    setScreen(route.params.screen);
    setCycloneName(route.params.cyclone_name);
    console.log(route.params.cyclone_name,"CCCCCCCCCcc")
    setStateName(route.params.stateName);
    setdistrictName(route.params.districtName);
    setTime(route.params.time);
    setDOB(route.params.DOB);
    setWeather_phenomena_List(route.params.weather_phenomena_List);
    setflood_Reason_List(route.params.flood_Reason_List);
    setweatherComment(route.params.weather_phenomena_commnet);
    setfloodComment(route.params.flood_reason_comment);
    set_DamageCause_List(route.params.damageCause_List);
    setdamageCauseComment(route.params.damageCauseComment);
    setadditional_damage_details(route.params.additional_damage_details)
    setquestions_to_manager(route.params.questions_to_manager)
    setImageSource(route.params.imageSource)
    setVideo(route.params.damge_video)
    
    // if (flag === true) {
    // getData();
    // }
  }

    
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };

  }, [route]);

  // const getData = async () => {
  //   setLoader(true)
  //   const Data = route.params;

  //   await setEditResponse(Data)
  //   setLoader(false)
  //   setFlag(false)
    // if(Data.screen === "edit")
  // }


  const onChangeTime = (event, time) => {
    console.log(time, "================")
    // var formated_time = moment(time).format('HH:mm');
    console.log(moment(time).format('HH:mm'), '======');
    setShow(Platform.OS === 'ios');
    setTime(moment(time).format('HH:mm'));
  };

  const handleConfirmDate = (event, date) => {
    setModalVisible(false);
    var formated_date = moment(date).format('YYYY-MM-DD');
    // var day_name = t(moment(date).format('dddd'));
    setDOB(formated_date)
    // this.setState({
    //   DOB: formated_date,
    // });
  }

  const hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode('time');
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

  const stateRenderItem = ({ item }) => {
    return <Item item={item} onPress={() => onToggle(item)} />;
  };
  const districtRenderItem = ({ item }) => {
    return <Item item={item} onPress={() => districtonToggle(item)} />;
  };

  const submit = () => {
    if (cyclone_name == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Cyclone name required');
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
    if (DOB == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Select DOB');
      return;
    }
    if (time == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Select time');
      return;
    }


    navigation.navigate('CrowdSourcingSecond', {
      // croudSourcingID: croudSourcingID, 
      screen: screen,
      cyclone_name: cyclone_name, 
      stateName: stateName, 
      districtName: districtName, 
      DOB: DOB, 
      time: time,
      weather_phenomena_List: weather_phenomena_List,
      flood_Reason_List: flood_Reason_List,
      weather_phenomena_commnet: weather_phenomena_commnet,
      flood_reason_comment:flood_reason_comment,
      damageCause_List:damageCause_List,
      damageCauseComment: damageCauseComment,
      additional_damage_details: additional_damage_details,
      questions_to_manager:questions_to_manager,
      imageSource:imageSource,
      damge_video: damge_video

    })


  }

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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Dashboard')}
                  style={{ width: '20%' }}>
                  <View>
                    <Image
                      source={require('../../../../assets/Back_Arrow_White.png')}
                    />
                  </View>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: 'OpenSans-Regular',
                      fontWeight: '700',
                    }}>
                    Crowd Sourcing form
                  </Text>
                </View>
              </View>

              <View style={{ width: '20%', alignItems: 'flex-end' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                  }}>
                  1/4
                </Text>
              </View>
            </View>
            {/* </Header> */}
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <View style={{ marginTop: '5%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  Cyclone name <Text style={{ color: 'red' }}>*</Text>
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
                  value={cyclone_name}
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 17,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '600',
                    color: '#0D2451',
                  }}
                  onChangeText={cyclone_name => setCycloneName(cyclone_name)}
                />
              </View>

              <View style={{ marginVertical: '3%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  State <Text style={{ color: 'red' }}>*</Text>
                </Text>
              </View>
              <Collapse
                style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
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
                    style={{ paddingVertical: 10 }}
                    data={contryState}
                    renderItem={stateRenderItem}
                    keyExtractor={item => item.id}
                  />
                </CollapseBody>
              </Collapse>
              <View style={{ marginVertical: '3%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  District <Text style={{ color: 'red' }}>*</Text>
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
                      style={{ paddingVertical: 10 }}
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
                        style={{ paddingVertical: 10 }}
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
                            style={{ paddingVertical: 10 }}
                            data={Andhra_Pradesh_District}
                            renderItem={districtRenderItem}
                            keyExtractor={item => item.id}
                          />
                        </View>
                      ) : (
                        <View>
                          {stateName === 'Daman & Diu' ? (
                            <FlatList
                              style={{ paddingVertical: 10 }}
                              data={Daman_Diu_District}
                              renderItem={districtRenderItem}
                              keyExtractor={item => item.id}
                            />
                          ) : (
                            <View>
                              {stateName === 'Goa' ? (
                                <FlatList
                                  style={{ paddingVertical: 10 }}
                                  data={Goa_District}
                                  renderItem={districtRenderItem}
                                  keyExtractor={item => item.id}
                                />
                              ) : (
                                <View>
                                  {stateName === 'Karnataka' ? (
                                    <FlatList
                                      style={{ paddingVertical: 10 }}
                                      data={Karnataka_District}
                                      renderItem={districtRenderItem}
                                      keyExtractor={item => item.id}
                                    />
                                  ) : (
                                    <View>
                                      {stateName === 'Kerala' ? (
                                        <FlatList
                                          style={{ paddingVertical: 10 }}
                                          data={Karnataka_District}
                                          renderItem={districtRenderItem}
                                          keyExtractor={item => item.id}
                                        />
                                      ) : (
                                        <View>
                                          {stateName === 'Lakshadweep' ? (
                                            <FlatList
                                              style={{ paddingVertical: 10 }}
                                              data={Lakshadweep_District}
                                              renderItem={districtRenderItem}
                                              keyExtractor={item => item.id}
                                            />
                                          ) : (
                                            <View>
                                              {stateName === 'Maharashtra' ? (
                                                <FlatList
                                                  style={{ paddingVertical: 10 }}
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
                                                              ) : (
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

              {/* </View> */}
              <View style={{ marginVertical: '3%' }}>
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
              {/* <TouchableOpacity onPress={showDatepicker}> */}
              <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                    <Image source={require('../../../../assets/Calendar.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              {/* {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="default"
                onChange={onChange}
              />
            )} */}
              {modalVisible && (
                <DateTimePicker
                  value={date}
                  placeholderText={'DOB'}
                  mode={'date'}
                  // maximumDate={moment(today).add(1, 'day').format('DD-MM-YYYY')}
                  // minimumDate={nextDate}
                  display="default"
                  format="YYYY/MM/DD"
                  onChange={(event, date) =>
                    handleConfirmDate(event, date)
                  }
                  onCancel={() => setModalVisible(false)}
                />
              )}
              <View style={{ marginVertical: '3%' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '400',
                  }}>
                  Time of Weather Event: <Text style={{ color: 'red' }}>*</Text>
                </Text>
              </View>
              <TouchableOpacity onPress={showTimepicker}>
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
                      {time}
                    </Text>
                  </View>
                  {/* <View>
                  <Image source={require('../../../../assets/Calendar.png')} />
                </View> */}
                </View>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"time"}
                  display="default"
                  onChange={(event, time) => onChangeTime(event, time)}
                // onChange={(e) => console.log(e)}
                />
              )}
            </View>
            <TouchableOpacity
              // onPress={() => navigation.navigate('CrowdSourcingSecond')}
              onPress={() => submit()}
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
                  Confirm & Continue
                </Text>
              </View>
              <View>
                <Image
                  source={require('../../../../assets/Login_Arrow.png')}
                  style={{ width: 27.5, height: 26.7 }}
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
    return <ActivityIndicator style={{ justifyContent: 'center', flex: 1 }} />;
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
export default CrowdSourcingFirst;
