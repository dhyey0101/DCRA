import React, { useState, useRef, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_crowd_sourcing } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'react-native-reanimated';

const ReviewFormInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const videoPlayer = useRef(null);


  const [damageCause_List, set_DamageCause_List] = useState([]);
  const [damageCauseComment, setdamageCauseComment] = useState('');
  const [questions_to_manager, setquestions_to_manager] = useState('');
  // const [damge_video, setdamge_video] = useState('');
  const [additional_damage_details, setadditional_damage_details] =
    useState('');
  const [DOB, setDOB] = useState('');
  const [time, setTime] = useState('');
  const [cyclone_name, setCycloneName] = useState('');
  const [weather_phenomena_commnet, setweatherComment] = useState('');
  const [flood_reason_comment, setfloodComment] = useState('');
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([]);
  const [flood_Reason_List, setflood_Reason_List] = useState([]);

  const [date, setDate] = useState(new Date());
  const [imageSource, setImageSource] = useState([]);
  const [loader, setLoader] = useState(false);
  const [damge_video, setVideo] = useState("");

  const [flag, setFlag] = useState(true)

  useEffect(() => {
    if (flag === true)
      getData();
  }, [imageSource]);


  const getData = () => {
    const Data = route.params;
    console.log(Data, ";;;;;;;")
    setCycloneName(Data.cyclone_name);
    setStateName(Data.stateName);
    setdistrictName(Data.districtName);
    setTime(Data.time);
    setDOB(Data.DOB);
    setWeather_phenomena_List(Data.weather_phenomena_List);
    setflood_Reason_List(Data.flood_Reason_List);
    setweatherComment(Data.weather_phenomena_commnet);
    setfloodComment(Data.flood_reason_comment);
    set_DamageCause_List(Data.damageCause_List);
    setdamageCauseComment(Data.damageCauseComment);
    setadditional_damage_details(Data.additional_damage_details)
    setquestions_to_manager(Data.questions_to_manager)
    setImageSource(Data.imageSource)
    console.log(Data.imageSource, "[[[[[[")
    console.log(imageSource, "000000")
    setVideo(Data.damge_video)


  }
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'State Users',
      uri: require('../../../../assets/DumyImage.png'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'State Users',
      uri: require('../../../../assets/DumyImage.png'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'State Users',
      uri: require('../../../../assets/DumyImage.png'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'State Users',
      uri: require('../../../../assets/DumyImage.png'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'State Users',
      uri: require('../../../../assets/DumyImage.png'),
    },
  ];
  const DATAVIDEO = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'State Users',
      uri: require('../../../../assets/DumyImage.png'),
    },
  ];
  const Item = ({ item, onPress }) => (

    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>
       
        <Image source={{uri: item}} style={{ width: 80, height: 80, borderRadius: 10 }} />
       
      </TouchableOpacity>
    </View>
  );
  const VideoItem = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Image source={item.uri} />
        
        <View style={{ position: 'absolute', alignSelf: 'center', marginVertical: "40%" }}>
          <Image
            source={require('../../../../assets/VideoPlay.png')}
            style={{ width: 30, height: 30 }}
          />
        </View>
        {/* </TouchableOpacity>
        </View> */}

        {/* </View> */}
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    console.log(item, "---------000000000000-----------")
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return <Item item={item} />;
  };
  const renderVideoItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return <VideoItem item={item} />;
  };


  const submit = async () => {
    setLoader(true)
    const Token = await AsyncStorage.getItem('loginToken');
    let new_weather_phenomena_List = []
    //name append in new array and pass that array in api
    // .at.....
    const croudsourcingData = await dispatch(
      create_crowd_sourcing(
        Token,
        // croudSourcingID,
        cyclone_name,
        stateName,
        districtName,
        DOB,
        time,
        weather_phenomena_List,
        weather_phenomena_commnet,
        flood_Reason_List,
        flood_reason_comment,
        additional_damage_details,
        questions_to_manager,
        imageSource,
        damge_video,
        damageCause_List,
        damageCauseComment,
      ),
    );
    if (croudsourcingData.status == 200) {

      setLoader(false);
      navigation.navigate('ThankYouCrowdSourcing')
      // { croudSourcingID: croudsourcingData.data.id,
      // cyclone_name: cyclone_name,
      // stateName: stateName,
      // districtName: districtName,
      // DOB: DOB,
      // time: time,
      // weather_phenomena_List: weather_phenomena_List,
      // weather_phenomena_commnet: weather_phenomena_commnet,
      // flood_Reason_List:flood_Reason_List,
      // flood_reason_comment: flood_reason_comment,
      // additional_damage_details: additional_damage_details,
      // questions_to_manager: questions_to_manager,
      // imageSource: imageSource,
      // damge_video: damge_video,
      // damageCause_List: damageCause_List,
      // damageCauseComment: damageCauseComment
      // }
    } else {
      setLoader(false);
      dropDownAlertRef.alertWithType('error', 'DCRA', croudsourcingData.message);
    }
  }


  const edit = () => {
    setLoader(true)
    navigation.navigate('CrowdSourcingFirst', {
      screen: "edit",
      cyclone_name: cyclone_name,
      stateName: stateName,
      districtName: districtName,
      DOB: DOB,
      time: time,
      weather_phenomena_List: weather_phenomena_List,
      weather_phenomena_commnet: weather_phenomena_commnet,
      flood_Reason_List: flood_Reason_List,
      flood_reason_comment: flood_reason_comment,
      additional_damage_details: additional_damage_details,
      questions_to_manager: questions_to_manager,
      imageSource: imageSource,
      damge_video: damge_video,
      damageCause_List: damageCause_List,
      damageCauseComment: damageCauseComment
    }
    )
    setLoader(false)
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
              //   backgroundColor: '#5B4CDF',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={require('../../../../assets/Ellipse_Head.png')} />
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
                onPress={() => navigation.navigate('CrowdSourcingFourth')}
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
                  Review Form
                </Text>
              </View>
              <View style={(styles.bell, [{ flexDirection: 'row', width: '20%', justifyContent:'flex-end' }])}>
                <TouchableOpacity onPress={() => edit()}>
                  <View>
                    <Image
                      source={require('../../../../assets/Edit-White.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ padding: 20 }}>
            <View>
              <Text style={styles.textTitle}>Cyclone name</Text>
              <Text style={styles.text}>{cyclone_name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ paddingVertical: 10 }}>
                <View>
                  <Text style={styles.textTitle}>State</Text>
                  <Text style={styles.text}>{stateName}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.textTitle}>Date</Text>
                  <Text style={styles.text}>{moment(DOB).format('ll')}</Text>
                </View>
              </View>
              <View
                style={{
                  //   borderLeftWidth: 1,
                  //   paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: '#c5c5c5',
                }}>
                <View>
                  <Text style={styles.textTitle}>District</Text>
                  <Text style={styles.text}>{districtName}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.textTitle}>Time of Weather Event:</Text>
                  <Text style={styles.text}>{time}</Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text
                style={
                  (styles.textTitle,
                    [
                      {
                        color: 'rgba(56, 119, 241, 1)',
                        fontFamily: 'OpenSans-Semibold',
                      },
                    ])
                }>
                Weather Phenomena:
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={(styles.textTitle, [{ color: '#000' }])}>
                {/* Gusty Wind (62 KM/H) */}
                {/* {goods.map(image => <div><Product images={image.pictures} /></div>)} */}
                {weather_phenomena_List.join(", \n")}
              </Text>
              <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular' }}>
                {/* Very Heavy Please help asap */}
                {weather_phenomena_commnet}
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={
                  (styles.textTitle,
                    [
                      {
                        color: 'rgba(56, 119, 241, 1)',
                        fontFamily: 'OpenSans-Semibold',
                      },
                    ])
                }>
                {/* Flooding at your location due to{' '} */}
                {flood_Reason_List}
              </Text>
              {/* <Text style={styles.text}>92193 84854</Text> */}
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={(styles.textTitle, [{ color: '#000' }])}>Rainfall</Text>
              <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular' }}>
                {/* Very Heavy Please help asap */}
                {flood_reason_comment}
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={
                  (styles.textTitle,
                    [
                      {
                        color: 'rgba(56, 119, 241, 1)',
                        fontFamily: 'OpenSans-Semibold',
                      },
                    ])
                }>
                Damage Caused:
              </Text>
              {/* <Text style={styles.text}>92193 84854</Text> */}
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={(styles.textTitle, [{ color: '#000' }])}>
                {/* Small tree uprooting */}
                {damageCause_List.join(", \n")}
              </Text>
              <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular' }}>
                {/* Need to solve asap otherwise roads will be blocked */}
                {damageCauseComment}
              </Text>
            </View>

            <FlatList
            style={{marginVertical: 20}}
            horizontal={true}
            data={imageSource}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            //   extraData={selectedId}
          />
            {/* <View><Image source={imageSource} style={{width: 20, height: 20}}/></View> */}
            {/* <FlatList
            horizontal={true}
            data={damge_video}
            renderItem={renderVideoItem}
            keyExtractor={item => item.id}
            //   extraData={selectedId}
          /> */}
            {/* <View>
              <Image
                source={{ uri: imageSource }}
              //   style={{width: 10, height: 10}}
              />
            </View> */}
            <View style={{ marginTop: 10 }}>
              <Video
                // source={require("./SampleVideo.mp4")}
                source={{
                  uri: damge_video,
                }}
                resizeMode='stretch'
                style={{
                  // position: 'absolute',
                  height: 80, width: 100, borderRadius: 20
                }}
                muted={true}
                // controls={true}
                ref={videoPlayer}
              />
            </View>
            <TouchableOpacity
              // onPress={() => navigation.navigate('ThankYouCrowdSourcing')}
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
                  Submit
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
  info: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: '#000',
    marginTop: 3,
  },
  text: {
    fontFamily: 'OpenSans-Semibold',
    fontWeight: '600',
    color: '#000',
    fontSize: 17,
  },
  textTitle: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 2,
    borderRadius: 40,
  },
});

export default ReviewFormInfo;
