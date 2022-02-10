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
const CrowdSourcingThird = ({ navigation, route }) => {
  let dropDownAlertRef = useRef();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);
  const [toggleCheckBox4, setToggleCheckBox4] = useState(false);
  const [toggleCheckBox5, setToggleCheckBox5] = useState(false);
  const [toggleCheckBox6, setToggleCheckBox6] = useState(false);
  const [toggleCheckBox7, setToggleCheckBox7] = useState(false);
  const [toggleCheckBox8, setToggleCheckBox8] = useState(false);
  const [toggleCheckBox9, setToggleCheckBox9] = useState(false);
  const [toggleCheckBox10, setToggleCheckBox10] = useState(false);
  const [toggleCheckBox11, setToggleCheckBox11] = useState(false);
  const [toggleCheckBox12, setToggleCheckBox12] = useState(false);
  const [toggleCheckBox13, setToggleCheckBox13] = useState(false);
  const [toggleCheckBox14, setToggleCheckBox14] = useState(false);
  const [toggleCheckBox15, setToggleCheckBox15] = useState(false);
  const [toggleCheckBox16, setToggleCheckBox16] = useState(false);
  const [toggleCheckBox17, setToggleCheckBox17] = useState(false);
  const [toggleCheckBox18, setToggleCheckBox18] = useState(false);
  const [toggleCheckBox19, setToggleCheckBox19] = useState(false);
  const [toggleCheckBox20, setToggleCheckBox20] = useState(false);
  const [toggleCheckBox21, setToggleCheckBox21] = useState(false);

  const [damageCause_List, set_DamageCause_List] = useState([]);
  const [damageCauseComment, setdamageCauseComment] = useState("");
  const [DOB, setDOB] = useState('');
  const [time, setTime] = useState('');
  const [cyclone_name, setCycloneName] = useState('');
  const [weather_phenomena_commnet, setweatherComment] = useState([]);
  const [flood_reason_comment, setfloodComment] = useState([]);
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([])
  const [flood_Reason_List, setflood_Reason_List] = useState([])
  const [croudSourcingID, setCroudSourcingID] = useState("")
  const [questions_to_manager, setquestions_to_manager] = useState('');
  // const [damge_video, setdamge_video] = useState('');
  const [additional_damage_details, setadditional_damage_details] =
    useState('');

  const [imageSource, setImageSource] = useState([]);
  const [damge_video, setVideo] = useState("");

  const Item_1 = (newValue) => {
    setToggleCheckBox(newValue)
    if (toggleCheckBox === false) {
      damageCause_List.push("Tree branches breaking")
    } else {
      damageCause_List.pop("Tree branches breaking")
    }
  }

  const Item_2 = (newValue) => {
    setToggleCheckBox2(newValue)
    if (toggleCheckBox2 === false) {
      damageCause_List.push("Small tree uprooting")
    } else {
      damageCause_List.pop("Small tree uprooting")
    }
  }
  const Item_3 = (newValue) => {
    setToggleCheckBox3(newValue)
    if (toggleCheckBox3 === false) {
      damageCause_List.push("Big tree uprooting")
    } else {
      damageCause_List.pop("Big tree uprooting")
    }
  }
  const Item_4 = (newValue) => {
    setToggleCheckBox4(newValue)
    if (toggleCheckBox4 === false) {
      damageCause_List.push("Electric pole (Concrete) damaged by bending")
    } else {
      damageCause_List.pop("Electric pole (Concrete) damaged by bending")
    }
  }
  const Item_5 = (newValue) => {
    setToggleCheckBox5(newValue)
    if (toggleCheckBox5 === false) {
      damageCause_List.push("Electric pole (Concrete) damaged by uprooting")
    } else {
      damageCause_List.pop("Electric pole (Concrete) damaged by uprooting")
    }
  }
  const Item_6 = (newValue) => {
    setToggleCheckBox6(newValue)
    if (toggleCheckBox6 === false) {
      damageCause_List.push("Electric pole (Iron) damaged by bending")
    } else {
      damageCause_List.pop("Electric pole (Iron) damaged by bending")
    }
  }
  const Item_7 = (newValue) => {
    setToggleCheckBox7(newValue)
    if (toggleCheckBox7 === false) {
      damageCause_List.push("Electric pole (Iron) damaged by uprooting")
    } else {
      damageCause_List.pop("Electric pole (Iron) damaged by uprooting")
    }
  }
  const Item_8 = (newValue) => {
    setToggleCheckBox8(newValue)
    if (toggleCheckBox8 === false) {
      damageCause_List.push("Electric Tower damaged by bending")
    } else {
      damageCause_List.pop("Electric Tower damaged by bending")
    }
  }
  const Item_9 = (newValue) => {
    setToggleCheckBox9(newValue)
    if (toggleCheckBox9 === false) {
      damageCause_List.push("Electric Towers damaged other towers")
    } else {
      damageCause_List.pop("Electric Towers damaged other towers")
    }
  }
  const Item_10 = (newValue) => {
    setToggleCheckBox10(newValue)
    if (toggleCheckBox10 === false) {
      damageCause_List.push("Telephone pole / Mobile tower damaged by bending")
    } else {
      damageCause_List.pop("Telephone pole / Mobile tower damaged by bending")
    }
  }
  const Item_11 = (newValue) => {
    setToggleCheckBox11(newValue)
    if (toggleCheckBox11 === false) {
      damageCause_List.push("Telephone pole / Mobile tower damaged by uprooting")
    } else {
      damageCause_List.pop("Telephone pole / Mobile tower damaged by uprooting")
    }
  }
  const Item_12 = (newValue) => {
    setToggleCheckBox12(newValue)
    if (toggleCheckBox12 === false) {
      damageCause_List.push("Telecommunication Tower  damaged by bending")
    } else {
      damageCause_List.pop("Telecommunication Tower  damaged by bending")
    }
  }
  const Item_13 = (newValue) => {
    setToggleCheckBox13(newValue)
    if (toggleCheckBox13 === false) {
      damageCause_List.push("Telecommunication Tower  damaged by uprooting")
    } else {
      damageCause_List.pop("Telecommunication Tower  damaged by uprooting")
    }
  }
  const Item_14 = (newValue) => {
    setToggleCheckBox14(newValue)
    if (toggleCheckBox14 === false) {
      damageCause_List.push('"Damage to Huts (houses, cowsheds) - Roof damaged"')
    } else {
      damageCause_List.pop('"Damage to Huts (houses, cowsheds) - Roof damaged"')
    }
  }
  const Item_15 = (newValue) => {
    setToggleCheckBox15(newValue)
    if (toggleCheckBox15 === false) {
      damageCause_List.push('"Damage to Kutcha structures (houses, cowsheds)"')
    } else {
      damageCause_List.pop('"Damage to Kutcha structures (houses, cowsheds)"')
    }
  }
  const Item_16 = (newValue) => {
    setToggleCheckBox16(newValue)
    if (toggleCheckBox16 === false) {
      damageCause_List.push('"Damage to Semi-Pukka structures (houses, shelters) -GI Sheet Roof uprooted"')
    } else {
      damageCause_List.pop('"Damage to Semi-Pukka structures (houses, shelters) -GI Sheet Roof uprooted "')
    }
  }
  const Item_17 = (newValue) => {
    setToggleCheckBox17(newValue)
    if (toggleCheckBox17 === false) {
      damageCause_List.push('"Damage to Pukka structures (houses, shelters)"')
    } else {
      damageCause_List.pop('"Damage to Pukka structures (houses, shelters)"')
    }
  }
  const Item_18 = (newValue) => {
    setToggleCheckBox18(newValue)
    if (toggleCheckBox18 === false) {
      damageCause_List.push("Flooding of land")
    } else {
      damageCause_List.pop("Flooding of land")
    }
  }
  const Item_19 = (newValue) => {
    setToggleCheckBox19(newValue)
    if (toggleCheckBox19 === false) {
      damageCause_List.push("Damage/Death to livestock")
    } else {
      damageCause_List.pop("Damage/Death to livestock")
    }
  }
  const Item_20 = (newValue) => {
    setToggleCheckBox20(newValue)
    if (toggleCheckBox20 === false) {
      damageCause_List.push("Damage/Death to Humans")
    } else {
      damageCause_List.pop("Damage/Death to Humans")
    }
  }
  const Item_21 = (newValue) => {
    setToggleCheckBox21(newValue)
    if (toggleCheckBox21 === false) {
      damageCause_List.push("Damage to vegetation/crop")
    } else {
      damageCause_List.pop("Damage to vegetation/crop")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const Data = route.params;
    console.log("==========THIRD====")
    console.log(Data)
    setCycloneName(Data.cyclone_name);
    setStateName(Data.stateName);
    setdistrictName(Data.districtName);
    setTime(Data.time);
    setDOB(Data.DOB);
    setWeather_phenomena_List(Data.weather_phenomena_List)
    setflood_Reason_List(Data.flood_Reason_List)
    setweatherComment(Data.weather_phenomena_commnet)
    setfloodComment(Data.flood_reason_comment)

    set_DamageCause_List(Data.damageCause_List);
    setdamageCauseComment(Data.damageCauseComment);
    setadditional_damage_details(Data.additional_damage_details)
    setquestions_to_manager(Data.questions_to_manager)
    setImageSource(Data.imageSource)
    setVideo(Data.damge_video)
    // setCroudSourcingID(Data.croudSourcingID)

    if (Data.damageCause_List.includes("Tree branches breaking")) {
      setToggleCheckBox(true)
    }
    if (Data.damageCause_List.includes("Small tree uprooting")) {
      setToggleCheckBox2(true)
    }

    if (Data.damageCause_List.includes("Big tree uprooting")) {
      setToggleCheckBox3(true)
    }
    if (Data.damageCause_List.includes("Electric pole (Concrete) damaged by bending")) {
      setToggleCheckBox4(true)
    }
    if (Data.damageCause_List.includes("Electric pole (Concrete) damaged by uprooting")) {
      setToggleCheckBox5(true)
    }
    if (Data.damageCause_List.includes("Electric pole (Iron) damaged by bending")) {
      setToggleCheckBox6(true)
    }
    if (Data.damageCause_List.includes("Electric pole (Iron) damaged by uprooting")) {
      setToggleCheckBox7(true)
    }
    if (Data.damageCause_List.includes("Electric Tower damaged by bending")) {
      setToggleCheckBox8(true)
    }
    if (Data.damageCause_List.includes("Electric Towers damaged other towers")) {
      setToggleCheckBox9(true)
    }
    if (Data.damageCause_List.includes("Telephone pole / Mobile tower damaged by bending")) {
      setToggleCheckBox10(true)
    }
    if (Data.damageCause_List.includes("Telephone pole / Mobile tower damaged by uprooting")) {
      setToggleCheckBox11(true)
    }
    if (Data.damageCause_List.includes("Telecommunication Tower  damaged by bending")) {
      setToggleCheckBox12(true)
    }
    if (Data.damageCause_List.includes("Telecommunication Tower  damaged by uprooting")) {
      setToggleCheckBox13(true)
    }
    if (Data.damageCause_List.includes('"Damage to Huts (houses, cowsheds) - Roof damaged"')) {
      setToggleCheckBox14(true)
    }
    if (Data.damageCause_List.includes('"Damage to Kutcha structures (houses, cowsheds)"')) {
      setToggleCheckBox15(true)
    }
    if (Data.damageCause_List.includes('"Damage to Semi-Pukka structures (houses, shelters) -GI Sheet Roof uprooted"')) {
      setToggleCheckBox16(true)
    }
    if (Data.damageCause_List.includes('"Damage to Pukka structures (houses, shelters)"')) {
      setToggleCheckBox17(true)
    }
    if (Data.damageCause_List.includes("Flooding of land")) {
      setToggleCheckBox18(true)
    }
    if (Data.damageCause_List.includes("Damage/Death to livestock")) {
      setToggleCheckBox19(true)
    }
    if (Data.damageCause_List.includes("Damage/Death to Humans")) {
      setToggleCheckBox20(true)
    }
    if (Data.damageCause_List.includes("Damage to vegetation/crop")) {
      setToggleCheckBox21(true)
    }
    console.log("==============")
  }

  const submit = () => {
    if (damageCause_List.length === 0) {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Please select damage caused type atleast one');
      return;
    }
    if (damageCauseComment == '') {
      dropDownAlertRef.alertWithType(
        'error',
        'DCRA',
        'Please write comment',
      );
      return;
    }
    console.log(damageCauseComment, "COMMENT")
    console.log(damageCause_List, "LIST  ")

    navigation.navigate('CrowdSourcingFourth', {
      // croudSourcingID: croudSourcingID,
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
                onPress={() => navigation.navigate('CrowdSourcingSecond')}
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
                3/4
              </Text>
            </View>
          </View>
          {/* </Header> */}
        </View>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginHorizontal: 10 }}>
        <View style={{ marginHorizontal: 10 }}>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: '#000',
                fontFamily: 'OpenSans-Regular',
              }}>
              Damage Caused:
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => Item_1(newValue)}
            />
            <Text
              style={{
                color: '#3877F1',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Tree branches breaking
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
              value={damageCauseComment}
              onChangeText={damageCauseComment => setdamageCauseComment(damageCauseComment)}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox2}
                  onValueChange={newValue => Item_2(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Small tree uprooting
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox3}
                  onValueChange={newValue => Item_3(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Big tree uprooting
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox4}
                  onValueChange={newValue => Item_4(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Electric pole (Concrete) damaged by bending
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox5}
                  onValueChange={newValue => Item_5(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Electric pole (Concrete) damaged by uprooting
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox6}
                  onValueChange={newValue => Item_6(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Electric pole (Iron) damaged by bending
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox7}
                  onValueChange={newValue => Item_7(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Electric pole (Iron) damaged by uprooting
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox8}
                  onValueChange={newValue => Item_8(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Electric Tower damaged by bending
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox9}
                  onValueChange={newValue => Item_9(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Electric Towers damaged other towers
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox10}
                  onValueChange={newValue => Item_10(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Telephone pole / Mobile tower damaged by bending
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox11}
                  onValueChange={newValue => Item_11(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Telephone pole / Mobile tower damaged by uprooting
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox12}
                  onValueChange={newValue => Item_12(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Telecommunication Tower  damaged by bending
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox13}
                  onValueChange={newValue => Item_13(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Telecommunication Tower  damaged by uprooting
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox14}
                  onValueChange={newValue => Item_14(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  "Damage to Huts (houses, cowsheds) - Roof damaged"
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox15}
                  onValueChange={newValue => Item_15(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  "Damage to Kutcha structures (houses, cowsheds)"
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox16}
                  onValueChange={newValue => Item_16(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  "Damage to Semi-Pukka structures (houses, shelters) -GI Sheet Roof uprooted "
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox17}
                  onValueChange={newValue => Item_17(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  "Damage to Pukka structures (houses, shelters)"
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox18}
                  onValueChange={newValue => Item_18(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>Flooding of land</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox19}
                  onValueChange={newValue => Item_19(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Damage/Death to livestock
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox20}
                  onValueChange={newValue => Item_20(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Damage/Death to Humans
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View>
                <CheckBox
                  value={toggleCheckBox21}
                  onValueChange={newValue => Item_21(newValue)}
                />
              </View>
              <View>
                <Text style={styles.categoryTypesText}>
                  Damage to vegetation/crop
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            // onPress={() => navigation.navigate('CrowdSourcingFourth')}
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
  categoryTypesText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});
export default CrowdSourcingThird;
