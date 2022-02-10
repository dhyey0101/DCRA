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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_crowd_sourcing } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Video from 'react-native-video';
import ImagePicker from "react-native-image-crop-picker";

// import VideoPlayer from 'react-native-video-player';
// import Video from 'react-native-video';

const CrowdSourcingFourth = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let dropDownAlertRef = useRef();
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
  const [weather_phenomena_commnet, setweatherComment] = useState([]);
  const [flood_reason_comment, setfloodComment] = useState([]);
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [weather_phenomena_List, setWeather_phenomena_List] = useState([]);
  const [flood_Reason_List, setflood_Reason_List] = useState([]);

  const [date, setDate] = useState(new Date());
  const [imageSource, setImageSource] = useState([]);
  const [loader, setLoader] = useState(false);
  const [damge_video, setVideo] = useState("");
  const [load, setLoad] = useState(false)

  const [croudSourcingID, setCroudSourcingID] = useState("")


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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const Data = route.params;
    console.log('==============');
    console.log(Data);
    console.log('=========tttttttttttt=====');
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
    setVideo(Data.damge_video)
    // setCroudSourcingID(Data.croudSourcingID)

  };

  const selectImage = () => {
    try {
      let options = {
        title: 'You can choose one image',
        maxWidth: 256,
        maxHeight: 256,
        noData: true,
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
        },
      };

      launchImageLibrary(options, response => {
        setLoader(true);
        if (response.didCancel) {
          console.log('User cancelled photo picker');
          setLoader(false);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          setLoader(false);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          setLoader(false);
        } else {
          let source = { uri: response.assets[0].uri };
          // ADD THIS
          console.log('-----------========');
          console.log(source);
          console.log('-----------========');
          // setImageSource(source.uri);
          imageSource.push(source.uri);
          setLoader(false);
        }
      });
    } catch (error) { }
  };

  const deleteImage = e => {
    console.log(e, 'oooooooooiiiiiiiiiiiii');
    const deletedImage = imageSource.filter((item, index) => index !== e);
    setImageSource(deletedImage);
    // console.log(deletedImage,"=============")

    console.log('imageSource');
    console.log(imageSource);
    console.log('imageSource');
  };
  const selectVideo = () => {
    ImagePicker.openPicker({ mediaType: "video" })
      .then(setVideoToUpload => {
        console.log(setVideoToUpload.path, "========")
        setVideo(setVideoToUpload.path)
        // setVideoURL(setVideoToUpload.path)
      })
      .catch(console.error);
  };
  // const selectVideo = () => {
  //   try {
  //     // let options = {
  //     //   title: 'You can choose one image',
  //     //   maxWidth: 256,
  //     //   maxHeight: 256,
  //     //   noData: true,
  //     //   mediaType: 'photo',
  //     //   storageOptions: {
  //     //     skipBackup: true,
  //     //   },
  //     // };

  //     let options = {
  //       title: 'Video Picker',
  //       mediaType: 'video',
  //       storageOptions: {
  //         skipBackup: true,
  //         path: 'images',
  //       },
  //     };

  //     launchImageLibrary(options, response => {
  //       setLoader(true);
  //       if (response.didCancel) {
  //         console.log('User cancelled video picker');
  //         setLoader(false);
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //         setLoader(false);
  //       } else if (response.customButton) {
  //         console.log('User tapped custom button: ', response.customButton);
  //         setLoader(false);
  //       } else {
  //         let source = {uri: response.assets[0].uri};
  //         // ADD THIS
  //         console.log('---------VIDEO--========');
  //         console.log(source);
  //         console.log('----------VIDEO-========');
  //         setVideo(source.uri);
  //         // imageSource.push(source.uri);
  //         setLoader(false);
  //       }
  //     });
  //   } catch (error) {}
  // };

  const VideoItem = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Image source={item.uri} />
        {/* <View> */}
        <View style={{ alignSelf: 'flex-end', position: 'absolute', padding: 5 }}>
          <TouchableOpacity
            style={{
              // position: 'absolute',
              // flexDirection: 'row',
              borderRadius: 20,
              backgroundColor: '#fff',
              padding: 5,
              margin: 2,
            }}>
            <View>
              <Image
                source={require('../../../../assets/Delete.png')}
                style={{ width: 10, height: 11 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              // flexDirection: 'row',
              borderRadius: 20,
              // backgroundColor: '#fff',
              padding: 5,
              marginLeft: 2,
              marginBottom: 2,
            }}>
            <View>
              {/* <Image
                source={require('../../../../assets/VideoPlay.png')}
                //   style={{width: 10, height: 10}}
              /> */}
              <Video
                // source={require("./SampleVideo.mp4")}
                source={{
                  uri: damge_video,
                }}
                // style={{ width: 60, height: 60 }}
                // controls={true}

                ref={videoPlayer}
              />

              {/* <Image
                source={{uri: item}}
                style={{width: 60, height: 60, borderRadius: 10}}
              /> */}
            </View>
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item, index }) => {
    console.log('___________))))))))))))))))_______');
    console.log(item);
    console.log('___________))))))))))))))))_______');
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';
    return (
      <View>
        <TouchableOpacity style={styles.item}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Image
                source={{ uri: item }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  padding: 5,
                  margin: 2,
                }}
                onPress={() => deleteImage(index)}
              // onPress={() => imageSource.pop(item)}
              >
                <View>
                  <Image
                    source={require('../../../../assets/Delete.png')}
                    style={{ width: 10, height: 11 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
    // return <Item item={item} />;
  };
  const renderVideoItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return <VideoItem item={item} />;
  };

  const submitForm = async () => {
    const Token = await AsyncStorage.getItem('loginToken');

    if (additional_damage_details == '') {
      dropDownAlertRef.alertWithType(
        'error',
        'DCRA',
        'Please type additional damage description',
      );
      return;
    }
    if (questions_to_manager == '') {
      dropDownAlertRef.alertWithType(
        'error',
        'DCRA',
        'Please write questions to disaster manager',
      );
      return;
    }
    if (imageSource.length === 0) {
      dropDownAlertRef.alertWithType(
        'error',
        'DCRA',
        'Please select atleast one image',
      );
      return;
    }
    // if (questions_to_manager == '') {
    //   dropDownAlertRef.alertWithType(
    //     'error',
    //     'Error',
    //     'Please write questions to disaster manager',
    //   );
    //   return;
    // }
    setLoader(true)
    // const croudsourcingData = await dispatch(
    //   create_crowd_sourcing(
    //     Token,
    //     // croudSourcingID,
    //     cyclone_name,
    //     stateName,
    //     districtName,
    //     DOB,
    //     time,
    //     weather_phenomena_List,
    //     weather_phenomena_commnet,
    //     flood_Reason_List,
    //     flood_reason_comment,
    //     additional_damage_details,
    //     questions_to_manager,
    //     imageSource,
    //     damge_video,
    //     damageCause_List,
    //     damageCauseComment,
    //   ),
    // );
    // if (croudsourcingData.status == 200) {

    //   setLoader(false);
    //   await AsyncStorage.setItem(
    //     'croudSourcingID',
    //     JSON.stringify(croudsourcingData.data.id),
    //   );
    navigation.navigate('ReviewFormInfo',
      {
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
    );
    // } else {
    setLoader(false);
    //   dropDownAlertRef.alertWithType('error', 'Error', croudsourcingData.message);
    // }
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CrowdSourcingThird')}
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
                  4/4
                </Text>
              </View>
            </View>
            {/* </Header> */}
          </View>
        </LinearGradient>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginHorizontal: 10 }}>
          <View style={{ marginHorizontal: 10 }}>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: 'OpenSans-Regular',
                }}>
                Additional Damage Description (please type)
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
                value={additional_damage_details}
                onChangeText={additional_damage_details =>
                  setadditional_damage_details(additional_damage_details)
                }
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: 'OpenSans-Regular',
                }}>
                Questions to Disaster Managers
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
                placeholder={
                  'What additional questions, you would like to have in survey form ?'
                }
                multiline
                value={questions_to_manager}
                onChangeText={questions_to_manager =>
                  setquestions_to_manager(questions_to_manager)
                }
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: 'OpenSans-Regular',
                }}>
                Upload Images
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{ marginRight: 5 }}>
                <TouchableOpacity onPress={() => selectImage()}>
                  <View
                    style={{
                      borderRadius: 20,
                      padding: 20,
                      backgroundColor: 'rgba(56, 119, 241, 0.12)',
                    }}>
                    <Image
                      source={require('../../../../assets/ImageIcon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  style={{ marginRight: '20%' }}
                  horizontal={true}
                  data={imageSource}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                //   extraData={selectedId}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000',
                  fontFamily: 'OpenSans-Regular',
                }}>
                Upload Video (Max 1 Video allowed)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{ marginRight: 5 }}>
                <TouchableOpacity onPress={() => selectVideo()}>
                  <View
                    style={{
                      borderRadius: 20,
                      padding: 20,
                      backgroundColor: 'rgba(56, 119, 241, 0.12)',
                    }}>
                    <Image source={require('../../../../assets/Video.png')} />
                  </View>
                </TouchableOpacity>
              </View>
              {damge_video ? (
                <View>

                  <TouchableOpacity style={styles.item}>
                    <View style={{ alignSelf: 'flex-end', padding: 5, borderRadius: 10 }}>
                      <TouchableOpacity onPress={() => {setVideo('')}}
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          // flexDirection: 'row',
                          borderRadius: 20,
                          backgroundColor: '#fff',
                          padding: 5,
                          top: 13,
                          right: 3
                          // margin: 2,
                        }}>
                        <View>
                          <Image
                            source={require('../../../../assets/Delete.png')}
                            style={{ width: 10, height: 11 }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'flex-end', borderRadius: 20 }}>
                      <TouchableOpacity
                        style={{
                          // position: 'absolute',
                          // flexDirection: 'row',
                          borderRadius: 20,
                          // padding: 5,
                          marginLeft: 2,
                        }}
                      >

                        <Video
                          // source={require("./SampleVideo.mp4")}
                          source={{
                            uri: damge_video,
                          }}
                          resizeMode='stretch'
                          style={{
                            // position: 'absolute',
                            height: 80, width: 100

                          }}
                          maxBitRate={30000000}
                          muted={true}
                          // paused={load}
                          // onLoad={() => {
                          //   setInterval(() => {
                          //     setLoad(true)
                          //   }, 2000)
                          // }}
                          // paused={true}
                          // controls={true}
                          ref={videoPlayer}
                        />
                      </TouchableOpacity>
                    </View>

                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}

            </View>

            <TouchableOpacity
              onPress={() => submitForm()}
              style={{
                marginTop: 50,
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
                  Review Form
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
  categoryTypesText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  item: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 2,
    borderRadius: 40,
    // marginBottom: 20,
    // marginVertical: 5,
    // marginHorizontal: 10,
    // flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#E5E5E5',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 9,
  },
});
export default CrowdSourcingFourth;
