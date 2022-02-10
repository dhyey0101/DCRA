import React, { useRef, useState, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import DropdownAlert from 'react-native-dropdownalert';

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
const CrowdSourcingSecond = ({ navigation, route }) => {
  let dropDownAlertRef = useRef();

  const [date, setDate] = useState(new Date());
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [rainToggleCheckBox, setRainToggleCheckBox] = useState(false);
  const [drizzleToggleCheckBox, setDrizzleToggleCheckBox] = useState(false);
  const [stromSurgeToggleCheckBox, setStromSurgeToggleCheckBox] = useState(false);
  const [rainFallToggleCheckBox, setRainFallToggleCheckBox] = useState(false);
  const [rainFallStormSurgeToggleCheckBox, setRainFallStormSurgeToggleCheckBox] = useState(false);
  const [bothToggleCheckBox, setBothToggleCheckBox] = useState(false);
  const [weather_phenomena_commnet, setweatherComment] = useState([]);
  const [flood_reason_comment, setFloodComment] = useState([]);
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([]);
  const [flood_Reason_List, setFlood_Reason_List] = useState([]);

  const [damageCause_List, set_DamageCause_List] = useState([]);
  const [damageCauseComment, setdamageCauseComment] = useState('');
  const [questions_to_manager, setquestions_to_manager] = useState('');
  // const [damge_video, setdamge_video] = useState('');
  const [additional_damage_details, setadditional_damage_details] =
    useState('');

  const [imageSource, setImageSource] = useState([]);
  const [damge_video, setVideo] = useState("");

  const [DOB, setDOB] = useState('');
  const [time, setTime] = useState('');
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [cyclone_name, setCycloneName] = useState("")
  const [croudSourcingID, setCroudSourcingID] = useState("")
  const [screen, setScreen] = useState("")
  const [selectedFruits, setSelectedFruits] = useState([])

  const [weatherPhenomenaList, setWeatherPhenomenaList] = useState([
    {
      id: '1',
      lable: 'Gusty Wind (62 KM/H)'
    },
    {
      id: '2',
      lable: 'Rain'
    },
    {
      id: '3',
      lable: 'Drizzle'
    },
    {
      id: '4',
      lable: 'Storm Surge'
    }
  ])

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const Data = route.params;
    console.log("========SECOND======")


    console.log(Data)
    setScreen(Data.screen);
    setCycloneName(Data.cyclone_name);
    setStateName(Data.stateName);
    setdistrictName(Data.districtName);
    setTime(Data.time);
    setDOB(Data.DOB);
    setWeather_phenomena_List(Data.weather_phenomena_List);
    setFlood_Reason_List(Data.flood_Reason_List);
    setweatherComment(Data.weather_phenomena_commnet);
    setFloodComment(Data.flood_reason_comment);
    set_DamageCause_List(Data.damageCause_List);
    setdamageCauseComment(Data.damageCauseComment);
    setadditional_damage_details(Data.additional_damage_details)
    setquestions_to_manager(Data.questions_to_manager)
    setImageSource(Data.imageSource)
    setVideo(Data.damge_video)

    if(Data.weather_phenomena_List.includes("Gusty Wind (62 KM/H)")){
      setToggleCheckBox(true)
    }
    if(Data.weather_phenomena_List.includes("Rain")){
      setRainToggleCheckBox(true)
    }
    if(Data.weather_phenomena_List.includes("Drizzle")){
      setDrizzleToggleCheckBox(true)
    }
    if(Data.weather_phenomena_List.includes("Storm Surge")){
      setStromSurgeToggleCheckBox(true)
    }

    if(Data.flood_Reason_List.includes("Rainfall")){
      setRainFallToggleCheckBox(true)
    }
    if(Data.flood_Reason_List.includes("Storm Surge")){
      setRainFallStormSurgeToggleCheckBox(true)
    }
    if(Data.flood_Reason_List.includes("Both")){
      setRainFallToggleCheckBox(true)
      setRainFallStormSurgeToggleCheckBox(true)
      setBothToggleCheckBox(true)
    }


    console.log("==============")
  }

  const AddWeather_phenomena_list = (newValue) => {
    // console.log(newValue,"_______________")
    // return
    setToggleCheckBox(newValue)
    if (toggleCheckBox === false) {
      weather_phenomena_List.push("Gusty Wind (62 KM/H)")
    } else {
      weather_phenomena_List.pop("Gusty Wind (62 KM/H)")
    }
  }
  const rainToggle = (newValue) => {
    setRainToggleCheckBox(newValue)
    if (rainToggleCheckBox === false) {
      weather_phenomena_List.push("Rain")
    } else {
      weather_phenomena_List.pop("Rain")
    }
  }
  const drizzleToggle = (newValue) => {
    setDrizzleToggleCheckBox(newValue)
    if (drizzleToggleCheckBox === false) {
      weather_phenomena_List.push("Drizzle")
    } else {
      weather_phenomena_List.pop("Drizzle")
    }
  }
  const weather_Storm_Sutge_Toggle = (newValue) => {
    setStromSurgeToggleCheckBox(newValue)
    if (stromSurgeToggleCheckBox === false) {
      weather_phenomena_List.push("Storm Surge")
    } else {
      weather_phenomena_List.pop("Storm Surge")
    }
  }
  const rainfall_Toggle = (newValue) => {
    setRainFallToggleCheckBox(newValue)
    if (rainFallToggleCheckBox === false) {
      flood_Reason_List.push("Rainfall")
    } else {
      flood_Reason_List.pop("Rainfall")
    }
  }
  const rainfall_Storm_Surhe_Toggle = (newValue) => {
    setRainFallStormSurgeToggleCheckBox(newValue)
    if (rainFallStormSurgeToggleCheckBox === false) {
      flood_Reason_List.push("Storm Surge")
    } else {
      flood_Reason_List.pop("Storm Surge")
    }
  }
  const both_Toggle = (newValue) => {
    setBothToggleCheckBox(newValue)
    if (bothToggleCheckBox === false) {
      flood_Reason_List.push("Both")
    } else {
      flood_Reason_List.pop("Both")
    }
  }

  const submit = () => {

    console.log(weather_phenomena_List, "WWWWWWWWWWWWWWWWWWW")
    console.log(flood_Reason_List, "fffffffffffffffffffffffff")
    console.log(flood_reason_comment, "fffffffffffffffffffffffff")
    console.log(weather_phenomena_commnet, "fffffffffffffffffffffffff")
    if (weather_phenomena_List.length === 0) {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Please select Weather phenomena type atleast one');
      return;
    }
    if (weather_phenomena_commnet == '') {
      dropDownAlertRef.alertWithType(
        'error',
        'DCRA',
        'Weather phenomena comment required',
      );
      return;
    }
    if (flood_Reason_List.length === 0) {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Please select Flood type atleast one');
      return;
    }

    if (flood_reason_comment == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Flood comment required');
      return;
    }

    navigation.navigate('CrowdSourcingThird', {
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
      flood_reason_comment: flood_reason_comment,
      damageCause_List: damageCause_List,
      damageCauseComment: damageCauseComment,
      additional_damage_details: additional_damage_details,
      questions_to_manager: questions_to_manager,
      imageSource: imageSource,
      damge_video: damge_video

    })
  }

  // const onchecked = (id) => {
  //   const data = weatherPhenomenaList
  //   const index=data.findIndex(x=>x.id===id)
  //   data[index].checked=!data[index].checked
  //   console.log(data,"=--======")
  //   setWeatherPhenomenaList(data)

  // }

  //   const renderItemSelection = ({item, key}) => {
  //     console.log("============")
  //     console.log(item)
  //     console.log("==========")
  //     // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
  //     // const color = item.id === selectedId ? 'white' : 'black';
  //     // return verificationRequestDataList.map((item, key) => {
  //     return (
  //       <View>
  //         <TouchableOpacity key={key} onPress={()=> onchecked(item.id)}>
  //           <View style={{flexDirection: 'row', width: '70%'}}>
  //             <CheckBox
  //             value={item.checked}
  //             onValueChange={() => onchecked(item.id)}
  //             // onValueChange={newValue => CHECKBOX(item.id)}
  //           />
  //           <Text>{item.lable}</Text>

  //       </View>
  //       </TouchableOpacity>
  //       </View>
  //     );

  //   };
  const onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    setSelectedFruits(selectedFruits)
  }
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
                onPress={() => navigation.navigate('CrowdSourcingFirst')}
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
                2/4
              </Text>
            </View>
          </View>
          {/* </Header> */}
        </View>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'OpenSans-Regular',
                fontWeight: '600',
                color: '#000',
              }}>
              Weather Phenomena
            </Text>
          </View>

          {/* <FlatList
            style={{marginBottom: 90}}
            data={weatherPhenomenaList}
            renderItem={renderItemSelection}
            keyExtractor={item => item.id}
            
            
            // extraData={selectedId}
          /> */}

          

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => AddWeather_phenomena_list(newValue)}
            />
            <Text
              style={{
                color: '#3877F1',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Gusty Wind (62 KM/H)
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              paddingBottom: 20,
              borderRadius: 20,
              borderColor: '#E5E5E5',
              paddingHorizontal: 10,
            }}>
            <TextInput
              placeholder={'Write Your Comment'}
              multiline
              value={weather_phenomena_commnet}
              onChangeText={weather_phenomena_commnet => setweatherComment(weather_phenomena_commnet)}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <View>
                <CheckBox
                  value={rainToggleCheckBox}
                  onValueChange={newValue => rainToggle(newValue)}
                />
              </View>
              <View><Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, fontWeight: '400', color: "#000" }}>Rain</Text></View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <View>
                <CheckBox
                  value={drizzleToggleCheckBox}
                  onValueChange={newValue => drizzleToggle(newValue)}
                />
              </View>
              <View><Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, fontWeight: '400', color: "#000" }}>Drizzle</Text></View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <View>
                <CheckBox
                  value={stromSurgeToggleCheckBox}
                  onValueChange={newValue => weather_Storm_Sutge_Toggle(newValue)}
                />
              </View>
              <View><Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, fontWeight: '400', color: "#000" }}>Storm Surge</Text></View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 17, color: "#000", fontFamily: 'OpenSans-Regular' }}>Flooding at your location due to (Cyclone Induced Rainfall, Storm Surge, or both)</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <CheckBox
              value={rainFallToggleCheckBox}
              onValueChange={newValue => rainfall_Toggle(newValue)}
            />
            <Text
              style={{
                color: '#3877F1',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Rainfall
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              paddingBottom: 20,
              borderRadius: 20,
              borderColor: '#E5E5E5',
              paddingHorizontal: 10,
            }}>
            <TextInput
              placeholder={'Write Your Comment'}
              multiline
              value={flood_reason_comment}
              onChangeText={flood_reason_comment => setFloodComment(flood_reason_comment)}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <View>
                <CheckBox
                  value={rainFallStormSurgeToggleCheckBox}
                  onValueChange={newValue => rainfall_Storm_Surhe_Toggle(newValue)}
                />
              </View>
              <View><Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, fontWeight: '400', color: "#000" }}>Storm Surge</Text></View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <View>
                <CheckBox
                  value={bothToggleCheckBox}
                  onValueChange={newValue => both_Toggle(newValue)}
                />
              </View>
              <View><Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, fontWeight: '400', color: "#000" }}>Both</Text></View>
            </View>

          </View>
          <TouchableOpacity
            // onPress={() => navigation.navigate('CrowdSourcingThird')}
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
                Continue
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
export default CrowdSourcingSecond;
