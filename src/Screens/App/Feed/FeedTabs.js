// import React, { useState, useRef, useEffect } from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   TextInput,
//   ScrollView,
//   BackHandler,
//   Alert,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// // import RBSheet from 'react-native-raw-bottom-sheet';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GetFeedListData } from '../../../Redux/Action/Admin';
// import { useDispatch, useSelector } from 'react-redux';
// import { types } from '@babel/core';
// import moment from 'moment';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import {
//   Collapse,
//   CollapseHeader,
//   CollapseBody,
//   AccordionList,
// } from 'accordion-collapse-react-native';


// const FeedTabs = ({ navigation }) => {
//   const refRBSheet = useRef();
//   const dispatch = useDispatch();
//   let [loader, setLoader] = useState(false);
//   // const refRBSheet = useRef();
//   const [search, setSearch] = useState('');
//   const [selectedId, setSelectedId] = useState(null);
//   const [publicFeed, setPublicFeed] = useState(true);
//   const [myFeed, setMyFeed] = useState(false);
//   const [stateName, setStateName] = useState('Select State');
//   const [districtName, setdistrictName] = useState('Select District');
//   const [stateToggle, setStateToggle] = useState(false);
//   const [districtToggle, setdistrictToggle] = useState(false);
//   const [feedData, setFeedData] = useState([]);
//   const [feedDataType, setFeedDataType] = useState('public');
//   let [searchFilterList, setSearchFilterList] = useState([]);
//   const [newFeedData, setNewFeedData] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [flatListLoader, setFlatListLoader] = useState("false")

//   const [contryState, setContryState] = useState([
//     {
//       id: '28',
//       title: 'Andhra Pradesh',
//     },
//     {
//       id: '25',
//       title: 'Daman & Diu',
//     },
//     {
//       id: '30',
//       title: 'Goa',
//     },
//     {
//       id: '24',
//       title: 'Gujarat',
//     },
//     {
//       id: '29',
//       title: 'Karnataka',
//     },
//     {
//       id: '32',
//       title: 'Kerala',
//     },
//     {
//       id: '27',
//       title: 'Maharashtra',
//     },
//     {
//       id: '34',
//       title: 'Puducherry',
//     },
//     {
//       id: '21',
//       title: 'Odisha',
//     },
//     {
//       id: '33',
//       title: 'Tamil Nadu',
//     },
//     {
//       id: '19',
//       title: 'West Bengal',
//     },
//     {
//       id: '35',
//       title: 'Andaman & Nicobar Islands',
//     },
//     {
//       id: '31',
//       title: 'Lakshadweep',
//     },
//   ]);

//   const [gujaratDistrict, setGujaratDistrict] = useState([
//     {
//       id: '474',
//       title: 'Ahmadabad',
//     },
//     {
//       id: '480',
//       title: 'Amreli',
//     },
//     {
//       id: '482',
//       title: 'Anand',
//     },
//     {
//       id: '469',
//       title: 'Banas Kantha',
//     },
//     {
//       id: '488',
//       title: 'Bharuch',
//     },
//     {
//       id: '481',
//       title: 'Bhavnagar',
//     },
//     {
//       id: '477',
//       title: 'Jamnagar',
//     },
//     {
//       id: '479',
//       title: 'Junagadh',
//     },
//     {
//       id: '468',
//       title: 'Kachchh',
//     },
//     {
//       id: '483',
//       title: 'Kheda',
//     },
//     {
//       id: '487',
//       title: 'Narmada',
//     },
//     {
//       id: '490',
//       title: 'Navsari',
//     },
//     {
//       id: '470',
//       title: 'Patan',
//     },
//     {
//       id: '478',
//       title: 'Porbandar',
//     },
//     {
//       id: '476',
//       title: 'Rajkot',
//     },
//     {
//       id: '492',
//       title: 'Surat',
//     },
//     {
//       id: '475',
//       title: 'Surendranagar',
//     },
//     {
//       id: '486',
//       title: 'Vadodara',
//     },
//     {
//       id: '491',
//       title: 'Valsad',
//     },
//   ]);

//   const [
//     Andaman_Nicobar_Islands_District,
//     setAndaman_Nicobar_Islands_District,
//   ] = useState([
//     {
//       id: '638',
//       title: 'Nicobars',
//     },
//     {
//       id: '639',
//       title: 'North & Middle Andaman',
//     },
//     {
//       id: '640',
//       title: 'South Andaman',
//     },
//   ]);

//   const [Daman_Diu_District, setDaman_Diu_District] = useState([
//     {
//       id: '495',
//       title: 'Daman',
//     },
//     {
//       id: '494',
//       title: 'Diu',
//     },
//   ]);

//   const [Andhra_Pradesh_District, setAndhra_Pradesh_District] = useState([
//     {
//       id: '545',
//       title: 'East Godavari',
//     },
//     {
//       id: '548',
//       title: 'Guntur',
//     },
//     {
//       id: '547',
//       title: 'Krishna',
//     },
//     {
//       id: '549',
//       title: 'Prakasam',
//     },
//     {
//       id: '550',
//       title: 'Sri Potti Sriramulu Nellore',
//     },
//     {
//       id: '542',
//       title: 'Srikakulam',
//     },
//     {
//       id: '544',
//       title: 'Vishakhapatnam',
//     },
//     {
//       id: '543',
//       title: 'Vizianagaram',
//     },
//     {
//       id: '546',
//       title: 'West Godavari',
//     },
//   ]);

//   const [Goa_District, setGoa_District] = useState([
//     {
//       id: '585',
//       title: 'North Goa',
//     },
//     {
//       id: '586',
//       title: 'South Goa',
//     },
//   ]);

//   const [Karnataka_District, setKarnataka_District] = useState([
//     {
//       id: '575',
//       title: 'Dakshina Kannada',
//     },
//     {
//       id: '569',
//       title: 'Udupi',
//     },
//     {
//       id: '563',
//       title: 'Uttara Kannada',
//     },
//     {
//       id: '598',
//       title: 'Alappuzha',
//     },
//     {
//       id: '595',
//       title: 'Ernakulam',
//     },
//     {
//       id: '589',
//       title: 'Kannur',
//     },
//     {
//       id: '588',
//       title: 'Kasaragod',
//     },
//     {
//       id: '600',
//       title: 'Kollam',
//     },
//     {
//       id: '597',
//       title: 'Kottayam',
//     },
//     {
//       id: '591',
//       title: 'Kozhikode',
//     },
//     {
//       id: '592',
//       title: 'Malappuram',
//     },
//     {
//       id: '593',
//       title: 'Palakkad',
//     },
//     {
//       id: '599',
//       title: 'Pathanamthitta',
//     },
//     {
//       id: '594',
//       title: 'Thiruvananthapuram',
//     },
//   ]);

//   const [Lakshadweep_District, setLakshadweep_District] = useState([
//     {
//       id: '587',
//       title: 'Lakshadweep',
//     },
//   ]);

//   const [Maharashtra_District, setMaharashtra_District] = useState([
//     {
//       id: '519',
//       title: 'Mumbai',
//     },
//     {
//       id: '518',
//       title: 'Mumbai(Suburban)',
//     },
//     {
//       id: '520',
//       title: 'Raigarh',
//     },
//     {
//       id: '528',
//       title: 'Ratnagiri',
//     },
//     {
//       id: '529',
//       title: 'Sindhudurg',
//     },
//     {
//       id: '517',
//       title: 'Thane',
//     },
//   ]);

//   const [Odisha_District, setOdisha_District] = useState([
//     {
//       id: '377',
//       title: 'Baleswar',
//     },
//     {
//       id: '378',
//       title: 'Bhadrak',
//     },
//     {
//       id: '381',
//       title: 'Cuttack',
//     },
//     {
//       id: '388',
//       title: 'Ganjam',
//     },
//     {
//       id: '380',
//       title: 'Jagatsinghpur',
//     },
//     {
//       id: '382',
//       title: 'Jajpur',
//     },
//     {
//       id: '386',
//       title: 'Khordha',
//     },
//     {
//       id: '376',
//       title: 'Mayurbhanj',
//     },
//     {
//       id: '387',
//       title: 'Puri',
//     },
//   ]);

//   const [Puducherry_District, setPuducherry_District] = useState([
//     {
//       id: '637',
//       title: 'Karaikal',
//     },
//     {
//       id: '636',
//       title: 'Mahe',
//     },
//     {
//       id: '635',
//       title: 'Puducherry',
//     },
//     {
//       id: '634',
//       title: 'Yanam',
//     },
//   ]);

//   const [Tamil_Nadu_District, setTamil_Nadu_District] = useState([
//     {
//       id: '603',
//       title: 'Chennai',
//     },
//     {
//       id: '617',
//       title: 'Cuddalore',
//     },
//     {
//       id: '604',
//       title: 'Kancheepuram',
//     },
//     {
//       id: '629',
//       title: 'Kanniyakumari',
//     },
//     {
//       id: '618',
//       title: 'Nagapattinam',
//     },
//     {
//       id: '621',
//       title: 'Pudukkottai',
//     },
//     {
//       id: '626',
//       title: 'Ramanathapuram',
//     },
//     {
//       id: '620',
//       title: 'Thanjavur',
//     },
//     {
//       id: '602',
//       title: 'Thiruvallur',
//     },
//     {
//       id: '619',
//       title: 'Thiruvarur',
//     },
//     {
//       id: '627',
//       title: 'Thoothukkudi',
//     },
//     {
//       id: '628',
//       title: 'Tirunelveli',
//     },
//     {
//       id: '607',
//       title: 'Viluppuram',
//     },
//   ]);

//   const [West_Bengal_District, setWest_Bengal_District] = useState([
//     {
//       id: '341',
//       title: 'Haora',
//     },
//     {
//       id: '338',
//       title: 'Hugli',
//     },
//     {
//       id: '342',
//       title: 'Kolkata',
//     },
//     {
//       id: '337',
//       title: 'North Twenty Four Parganas',
//     },
//     {
//       id: '344',
//       title: 'Paschim Medinipur',
//     },
//     {
//       id: '345',
//       title: 'Purba Medinipur',
//     },
//     {
//       id: '343',
//       title: 'South Twenty Four Parganas',
//     },
//   ]);
//   const DATA = [
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'Rajesh Patel',
//       state: 'Gujarat',
//       city: 'Junagadh,Rajkot',
//       number: '92193 84854',
//     },
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'Rajesh Patel',
//       state: 'Gujarat',
//       city: 'Junagadh,Rajkot',
//       number: '92193 84854',
//     },
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'Rajesh Patel',
//       state: 'Gujarat',
//       city: 'Junagadh,Rajkot',
//       number: '92193 84854',
//     },
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'Rajesh Patel',
//       state: 'Gujarat',
//       city: 'Junagadh,Rajkot',
//       number: '92193 84854',
//     },
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'Rajesh Patel',
//       state: 'Gujarat',
//       city: 'Junagadh,Rajkot',
//       number: '92193 84854',
//     },
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'Rajesh Patel',
//       state: 'Gujarat',
//       city: 'Junagadh,Rajkot',
//       number: '92193 84854',
//     },
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'Rajesh Patel',
//       state: 'Gujarat',
//       city: 'Junagadh,Rajkot',
//       number: '92193 84854',
//     },
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'Rajesh Patel',
//       state: 'Gujarat',
//       city: 'Junagadh,Rajkot',
//       number: '92193 84854',
//     },
//   ];

//   useEffect(() => {
//     getFeedList();
//     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
//     return () => {
//       BackHandler.removeEventListener(
//         'hardwareBackPress',
//         handleBackButtonClick,
//       );
//     };
//   }, []);
//   function handleBackButtonClick() {
//     navigation.goBack();
//     return true;
//   }
//   const stateRenderItem = ({ item }) => {
//     return <LocationItem item={item} onPress={() => onToggle(item)} />;
//   };
//   const districtRenderItem = ({ item }) => {
//     return <LocationItem item={item} onPress={() => districtonToggle(item)} />;
//   };
//   const onToggle = item => {
//     setStateName(item.title);
//     setdistrictName('Select District')
//     setStateToggle(false);
//     setdistrictToggle(false);

//   };
//   const districtonToggle = item => {
//     setdistrictName(item.title);
//     setdistrictToggle(false);
//   };
//   const filterUser = () => {
//     refRBSheet.current.close();
//     if (stateName && districtName === "Select District") {
//     var data = newFeedData.filter(
//       listItem =>
//         listItem.state
//           .toLowerCase()
//           .includes(stateName.toString().toLowerCase()) 

//     );

//     //  return
//     setFeedData(data);
//     }else{
//       var data = newFeedData.filter(
//         listItem =>
//           listItem.state
//             .toLowerCase()
//             .includes(stateName.toString().toLowerCase()) 
//             && listItem.district
//               .toLowerCase()
//               .includes(districtName.toString().toLowerCase()),
//       );

//       //  return
//       setFeedData(data);
//     }
//     // setStateName('Select State'),
//     //   setdistrictName('Select District');
//     setLoader(false);
//   };
//   const LocationItem = ({ item, onPress }) => (
//     <View>
//       <TouchableOpacity onPress={onPress}>
//         <View style={{ flexDirection: 'row' }}>
//           <View style={{ marginLeft: 13 }}>
//             <Text style={styles.title}>{item.title}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
//   const getFeedList = async () => {
//     setLoader(true);
//     setPublicFeed(true);
//     setMyFeed(false);
//     // this.setState({isAPILoading: true});
//     const Token = await AsyncStorage.getItem('loginToken')
//     setOffset(offset + 1);
//     const getFeedListData = await dispatch(
//       GetFeedListData(Token, feedDataType, offset ),
//     )
//     if (getFeedListData.status == 200) {

//       setFeedData(getFeedListData.data)
//       setNewFeedData(getFeedListData.data)
//       setLoader(false);
//     } else {
//       Alert.alert(getFeedListData.msg);
//     }
//     setLoader(false);
//     return feedData;
//   };

//   const resetFilter = () => {
//     setStateName('Select State'),
//       setdistrictName('Select District');
//     setSearch(''),
//       getFeedList();
//     refRBSheet.current.close();
//   }

// const Item = ({ item, onPress }) => (
//   <View>
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate('FeedPost', {
//           feedInfo: item,
//         })
//       }
//       style={styles.item}>
//       <View
//         style={{
//           flexDirection: 'row',
//           // alignItems: 'center',
//           // marginVertical: 10,
//         }}>
//         <View style={{ justifyContent: 'center' }}>
//           <Image
//             source={{ uri: item.profile_image }}
//             style={{ width: 25, height: 25 }}
//           />
//         </View>
//         <View style={{ marginLeft: 13, paddingBottom: 13 }}>
//           <Text style={styles.title}>{item.name}</Text>
//           <Text style={styles.info}>{item.state}, {item.district}</Text>
//         </View>
//         {/* White Icon */}
//         <View>
//           <Image source={require('../../../../assets/MenuIcon.png')} />
//         </View>
//       </View>
//       <View>
//         <Text
//           style={{
//             fontSize: 12,
//             fontFamily: 'Metropolis-Regular',
//             fontWeight: '400',
//           }}>
//           {item.feed_text}
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginTop: 10,
//         }}>
//         <View
//           style={{
//             borderRadius: 20,
//             paddingVertical: 5,
//             paddingHorizontal: 10,
//             backgroundColor: '#C4C4C4',
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}>
//           <Image source={require('../../../../assets/FeedChat.png')} />
//           <Text style={{ fontFamily: '', fontSize: 11, marginLeft: 5 }}>
//             Comment ({item.comments})
//           </Text>
//         </View>
//         <View>
//           <Text
//             style={{
//               fontFamily: 'OpenSans-Regular',
//               fontSize: 9,
//               color: '#000',
//             }}>
//             {/* Today, 2:00 PM */}
//             {moment(item.date).calendar()}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   </View>
// );
//   const renderItem = ({ item }) => {
//     // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
//     // const color = item.id === selectedId ? 'white' : 'black';

//     return (
//       <Item
//         item={item}
//         // onPress={() => {
//         //   item.name === 'First Item'
//         //     ? navigation.navigate('WeatherTypes', {
//         //         id: item.id,
//         //         name: item.title,
//         //       })
//         //     : navigation.navigate('WeatherTypes', {
//         //         id: item.id,
//         //         name: item.title,
//         //       });
//         // }}
//         onPress={() =>
//           navigation.navigate('FeedPost', {
//             feedInfo: item,
//           })
//         }
//       // backgroundColor={{backgroundColor}}
//       // textColor={{color}}
//       />
//     );
//   };

//   const publicFeedTab = async (e, types) => {
//     setLoader(true)
//     if (myFeed === e) {
//       setMyFeed(false);
//       setPublicFeed(true);
//       const Token = await AsyncStorage.getItem('loginToken');

//       console.log(feedDataType, '===================TYPE');
//       console.log(Token, 'user token================');
//       const getFeedListData = await dispatch(GetFeedListData(Token, types));
//       if (getFeedListData.status == 200) {

//         setFeedData(getFeedListData.data);
//         setLoader(false);
//       } else {
//         Alert.alert(getFeedListData.msg);
//       }
//     }
//     return feedData;
//   };

//   const myPublicFeedTab = async (e, types) => {
//     setLoader(true)
//     setStateName("Select State");
//     setdistrictName("Select District")
//     if (publicFeed === e) {
//       setMyFeed(true);
//       setPublicFeed(false);
//       const Token = await AsyncStorage.getItem('loginToken')
//       setFeedDataType(feedDataType)
//       const getFeedListData = await dispatch(GetFeedListData(Token, types))
//       if (getFeedListData.status == 200) {
//         setFeedData(getFeedListData.data)
//         setLoader(false);
//       } else {
//         Alert.alert(getFeedListData.msg);
//       }
//       // getFeedList();
//     }
//   };
//   const onRefresh = async () => {
//     if (stateName === 'Select State' && districtName === 'Select District' && search === "") {
//       console.log("ENTER IN IF")
//       // setSearch('');
//       // searchUser('');

//       if (myFeed === true) {
//         const types = "my"
//         console.log("enter")
//         const Token = await AsyncStorage.getItem('loginToken')
//         setFeedDataType(feedDataType)
//         const getFeedListData = await dispatch(GetFeedListData(Token, types))
//         if (getFeedListData.status == 200) {
//           setFeedData(getFeedListData.data)
//           console.log(feedData, "REFERESH FEED")
//           setLoader(false);
//         } else {
//           Alert.alert(getFeedListData.msg);
//         }
//       } else {
//         const Token = await AsyncStorage.getItem('loginToken');
//         const getFeedListData = await dispatch(
//           GetFeedListData(Token, feedDataType),
//         );
//         if (getFeedListData.status == 200) {

//           setFeedData(getFeedListData.data);
//           setLoader(false);
//         } else {
//           Alert.alert(getFeedListData.msg);
//         }
//       }

//     } else if(search !== "") {      
//       searchUser(search);
//     }else{
//       console.log("ENTER IN ELSEF")
//       filterUser();
//     }


//   };

//   const searchUser = search => {
//     setLoader(true);
//     if (search === "") {
//       setFeedData(newFeedData);
//     } else {
//       var data = feedData.filter(listItem =>
//         listItem.name
//           .toLowerCase()
//           .includes(search.toString().toLowerCase()),
//       );
//       setFeedData(data);
//     }
//     setLoader(false);
//   };

//   const close = () => {
//     if (stateName === 'Select State' && districtName === 'Select District') {
//       setLoader(true);
//       setSearch(''),
//       searchUser('');
//       getFeedList();
//       setLoader(false);
//     }else{
//       setSearch(''),
//       filterUser();
//     }
//   }

//   const loadMore = () => {
//     setOffset(offset+1)
//     // setFlatListLoader(true)
//   }

//   const loadPublicFeed = async () => {
//     // setLoader(true);
//     setFlatListLoader(true)    
//     const Token = await AsyncStorage.getItem('loginToken')
//     const getFeedListData = await dispatch(
//       GetFeedListData(Token, feedDataType, offset ),
//     )
//     if (getFeedListData.status == 200) {
//       setOffset(offset + 1);
//       // setFeedData(feedData.concat(getFeedListData.data))
//       setFeedData(getFeedListData.data)
//       setNewFeedData(getFeedListData.data)
//       setFlatListLoader(false)
//       setLoader(false);
//     } else {
//       Alert.alert(getFeedListData.msg);
//     }
//     setLoader(false);
//     // return feedData;
//   }

//   const loadMyFeed = async () => {
//     setLoader(true);

//     const feed = "my"
//     const Token = await AsyncStorage.getItem('loginToken')
//     const getFeedListData = await dispatch(
//       GetFeedListData(Token, feed, offset ),
//     )
//     if (getFeedListData.status == 200) {
//       setOffset(offset + 1);
//       setFeedData(getFeedListData.data)
//       setNewFeedData(getFeedListData.data)
//       setLoader(false);
//     } else {
//       Alert.alert(getFeedListData.msg);
//     }
//     setLoader(false);
//   }


//   const renderFooterPublic = () => {
//     return (
//       //Footer View with Load More button
//       flatListLoader ? 
//         <View style={styles.footer}>
//         <ActivityIndicator size={"large"}/>
//       </View>
//       :null
//     );
//   };
//   // const renderFooterMy = () => {
//   //   return (
//   //     //Footer View with Load More button
//   //     <View style={styles.footer}>
//   //       <TouchableOpacity
//   //         activeOpacity={0.9}
//   //         onPress={loadMyFeed}
//   //         //On Click of button load more data
//   //         style={styles.loadMoreBtn}>
//   //         <Text style={styles.btnText}>Load More</Text>
//   //         {loader ? (
//   //           <ActivityIndicator
//   //             color="white"
//   //             style={{marginLeft: 8}} />
//   //         ) : null}
//   //       </TouchableOpacity>
//   //     </View>
//   //   );
//   // };

//   // const renderFooterPublic = () => {
//   //   if(feedData.length-1){
//   //     getFeedList()
//   //   }
//   // }

//   if (!loader) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar backgroundColor="#3877F1" />
//         <LinearGradient
//           colors={['#3877F1', '#215ACA']}
//           style={styles.linearGradient}>
//           <View
//             style={{
//               //   backgroundColor: '#5B4CDF',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Image source={require('../../../../assets/Ellipse_Head.png')} />
//             {/* <Header> */}
//             <View
//               style={{
//                 position: 'absolute',
//                 flexDirection: 'row',
//                 width: '100%',
//                 paddingHorizontal: 20,
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Dashboard')}
//                 style={{ width: '20%' }}>
//                 <View>
//                   <Image
//                     source={require('../../../../assets/Back_Arrow_White.png')}
//                   />
//                 </View>
//               </TouchableOpacity>
//               <View>
//                 <Text
//                   style={{
//                     color: '#fff',
//                     fontSize: 16,
//                     fontFamily: 'OpenSans-Regular',
//                     fontWeight: '700',
//                   }}>
//                   FEED
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.bell}
//                 onPress={() => navigation.navigate('CreatePost')}>
//                 <View>
//                   <Image source={require('../../../../assets/Plus.png')} />
//                 </View>
//               </TouchableOpacity>
//             </View>

//             {/* </Header> */}
//           </View>
//         </LinearGradient>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginHorizontal: '25%',
//             marginTop: 20,
//             borderRadius: 20,
//             backgroundColor: '#EDEDED',
//             paddingHorizontal: 10,
//             paddingVertical: 5,
//           }}>
//           {publicFeed === true ? (
//             //   <TouchableOpacity>
//             <View
//               style={{
//                 backgroundColor: '#fff',
//                 padding: 3,
//                 borderRadius: 20,
//                 paddingHorizontal: 10,
//               }}>
//               <Text style={styles.TabsFont}>Public Feed</Text>
//             </View>
//           ) : (
//             //   </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => publicFeedTab(true, 'public')}>
//               <View
//                 style={{
//                   padding: 3,
//                   borderRadius: 20,
//                   justifyContent: 'center',
//                 }}>
//                 <Text style={styles.TabsFont}>Public Feed</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           {myFeed === false ? (
//             <TouchableOpacity
//               onPress={() => myPublicFeedTab(true, 'my')}>
//               <View
//                 style={{
//                   padding: 3,
//                   borderRadius: 20,
//                   justifyContent: 'center',
//                 }}>
//                 <Text style={styles.TabsFont}>My Feed</Text>
//               </View>
//             </TouchableOpacity>
//           ) : (
//             //   <TouchableOpacity>
//             <View
//               style={{
//                 backgroundColor: '#fff',
//                 padding: 3,
//                 paddingHorizontal: 10,
//                 borderRadius: 20,
//               }}>
//               <Text style={styles.TabsFont}>My Feed</Text>
//             </View>
//             //   </TouchableOpacity>
//           )}
//         </View>
//         {publicFeed === true ? (
//           <View>
//             <View
//               style={{
//                 backgroundColor: '#fff',
//                 paddingHorizontal: 20,
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginVertical: 20,
//                 flexDirection: 'row',
//               }}>
//               <View style={styles.searchBar}>
//                 <View style={{ width: '90%' }}>
//                   <TextInput
//                     style={{ fontSize: 15, color: '#000' }}
//                     placeholderTextColor={'#000'}
//                     placeholder={'Search'}
//                     // keyboardType='email-address'
//                     value={search}
//                     onChangeText={event => setSearch(event)}
//                     returnKeyType="search"
//                     onSubmitEditing={() => onRefresh()}
//                   />
//                 </View>
//                 {search == null || search == '' ? (
//                   <TouchableOpacity
//                   // onPress={() => searchUser(search)}
//                   >
//                     <Image
//                       style={{ width: 25, height: 25 }}
//                       source={require('../../../../assets/Search.png')}
//                     />
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={() => {
//                       close();
//                     }}>
//                     <Image
//                       style={{ width: 25, height: 25 }}
//                       source={require('../../../../assets/Cross_Black.png')}
//                     />
//                   </TouchableOpacity>
//                 )}
//               </View>
//               <TouchableOpacity onPress={() => refRBSheet.current.open()}>
//                 <View style={{ alignItems: 'center' }}>
//                   <Image source={require('../../../../assets/Filter.png')} />
//                   <Text style={styles.filterText}>FILTER</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               style={{ marginBottom: '55%' }}
//               data={feedData}
//               renderItem={renderItem}
//               keyExtractor={item => item.id}
//               extraData={selectedId}
//               // onEndReached={loadPublicFeed}

//               // ListFooterComponent={renderFooterPublic}

//               ListEmptyComponent={
//                 <View
//                   style={{
//                     marginTop: '50%',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text>Result Not Found</Text>
//                 </View>
//               }
//               refreshControl={
//                 <RefreshControl
//                   refreshing={loader}
//                   onRefresh={onRefresh}
//                 // colors={[Colors.darkorange]}
//                 />
//               }
//             />
//           </View>
//         ) : (
//           <View style={{marginTop: 20}}>

//             <FlatList
//               style={{ marginBottom: '32%' }}
//               data={feedData}
//               renderItem={renderItem}
//               keyExtractor={item => item.id}
//               extraData={selectedId}
//               // ListFooterComponent={renderFooterMy}
//               ListEmptyComponent={
//                 <View
//                   style={{
//                     marginTop: '50%',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text>Result Not Found</Text>
//                 </View>
//               }
//               refreshControl={
//                 <RefreshControl
//                   refreshing={loader}
//                   onRefresh={onRefresh}
//                 // colors={[Colors.darkorange]}
//                 />
//               }
//             />
//           </View>
//         )}
//         <RBSheet
//           ref={refRBSheet}
//           closeOnDragDown={true}
//           // closeOnPressMask={false}
//           height={380}
//           dragFromTopOnly={true}
//           customStyles={{
//             container: { paddingHorizontal: 20, borderRadius: 20 },
//             draggableIcon: {
//               backgroundColor: '#000',
//             },
//           }}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View>
//               <Text style={styles.bottomSheetTitleText}>Filter By:</Text>
//             </View>
//             <View style={{ marginTop: '5%' }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#000000',
//                   fontFamily: 'OpenSans-Regular',
//                   fontWeight: '400',
//                 }}>
//                 State
//               </Text>
//             </View>
//             <Collapse
//               style={{ borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF' }}
//               isExpanded={stateToggle}
//               onToggle={isExpanded => setStateToggle(isExpanded)}>
//               <CollapseHeader
//                 style={{
//                   borderRadius: 14,
//                   borderWidth: 1,
//                   borderColor: '#DFDFDF',
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   paddingVertical: 17,
//                   paddingHorizontal: 10,
//                   alignItems: 'center',
//                 }}>
//                 <View>
//                   <Text>{stateName}</Text>
//                 </View>
//                 <Image
//                   source={require('../../../../assets/DownArrow.png')}
//                 //   style={{width: 22, height: 20}}
//                 // resizeMode={'stretch'}
//                 />
//               </CollapseHeader>
//               <CollapseBody>
//                 <FlatList
//                   style={{ paddingVertical: 10 }}
//                   data={contryState}
//                   renderItem={stateRenderItem}
//                   keyExtractor={item => item.id}
//                 />
//               </CollapseBody>
//             </Collapse>
//             {/* </View> */}
//             <View style={{ marginTop: '5%' }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#000000',
//                   fontFamily: 'OpenSans-Regular',
//                   fontWeight: '400',
//                 }}>
//                 District
//               </Text>
//             </View>
//             {stateName === 'Gujarat' ? (
//               <Collapse
//                 style={{
//                   borderWidth: 1,
//                   borderRadius: 15,
//                   borderColor: '#DFDFDF',
//                 }}
//                 isExpanded={districtToggle}
//                 onToggle={isExpanded => setdistrictToggle(isExpanded)}>
//                 <CollapseHeader
//                   style={{
//                     borderRadius: 14,
//                     borderWidth: 1,
//                     borderColor: '#DFDFDF',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     paddingVertical: 17,
//                     paddingHorizontal: 10,
//                     alignItems: 'center',
//                   }}>
//                   <View>
//                     <Text>{districtName}</Text>
//                   </View>
//                   <Image
//                     source={require('../../../../assets/DownArrow.png')}
//                   //   style={{width: 22, height: 20}}
//                   // resizeMode={'stretch'}
//                   />
//                 </CollapseHeader>
//                 <CollapseBody>
//                   <FlatList
//                     style={{ paddingVertical: 10 }}
//                     data={gujaratDistrict}
//                     renderItem={districtRenderItem}
//                     keyExtractor={item => item.id}
//                   />
//                 </CollapseBody>
//               </Collapse>
//             ) : (
//               <Collapse
//                 style={{
//                   borderWidth: 1,
//                   borderRadius: 15,
//                   borderColor: '#DFDFDF',
//                 }}
//                 isExpanded={districtToggle}
//                 onToggle={isExpanded => setdistrictToggle(isExpanded)}>
//                 <CollapseHeader
//                   style={{
//                     borderRadius: 14,
//                     borderWidth: 1,
//                     borderColor: '#DFDFDF',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     paddingVertical: 17,
//                     paddingHorizontal: 10,
//                     alignItems: 'center',
//                   }}>
//                   <View>
//                     <Text>{districtName}</Text>
//                   </View>
//                   <Image
//                     source={require('../../../../assets/DownArrow.png')}
//                   //   style={{width: 22, height: 20}}
//                   // resizeMode={'stretch'}
//                   />
//                 </CollapseHeader>
//                 {stateName === 'Andaman & Nicobar Islands' ? (
//                   <CollapseBody>
//                     <FlatList
//                       style={{ paddingVertical: 10 }}
//                       data={Andaman_Nicobar_Islands_District}
//                       renderItem={districtRenderItem}
//                       keyExtractor={item => item.id}
//                     />
//                   </CollapseBody>
//                 ) : (
//                   <CollapseBody>
//                     {stateName === 'Andhra Pradesh' ? (
//                       <View>
//                         <FlatList
//                           style={{ paddingVertical: 10 }}
//                           data={Andhra_Pradesh_District}
//                           renderItem={districtRenderItem}
//                           keyExtractor={item => item.id}
//                         />
//                       </View>
//                     ) : (
//                       <View>
//                         {stateName === 'Daman & Diu' ? (
//                           <FlatList
//                             style={{ paddingVertical: 10 }}
//                             data={Daman_Diu_District}
//                             renderItem={districtRenderItem}
//                             keyExtractor={item => item.id}
//                           />
//                         ) : (
//                           <View>
//                             {stateName === 'Goa' ? (
//                               <FlatList
//                                 style={{ paddingVertical: 10 }}
//                                 data={Goa_District}
//                                 renderItem={districtRenderItem}
//                                 keyExtractor={item => item.id}
//                               />
//                             ) : (
//                               <View>
//                                 {stateName === 'Karnataka' ? (
//                                   <FlatList
//                                     style={{ paddingVertical: 10 }}
//                                     data={Karnataka_District}
//                                     renderItem={districtRenderItem}
//                                     keyExtractor={item => item.id}
//                                   />
//                                 ) : (
//                                   <View>
//                                     {stateName === 'Kerala' ? (
//                                       <FlatList
//                                         style={{ paddingVertical: 10 }}
//                                         data={Karnataka_District}
//                                         renderItem={districtRenderItem}
//                                         keyExtractor={item => item.id}
//                                       />
//                                     ) : (
//                                       <View>
//                                         {stateName === 'Lakshadweep' ? (
//                                           <FlatList
//                                             style={{ paddingVertical: 10 }}
//                                             data={Lakshadweep_District}
//                                             renderItem={districtRenderItem}
//                                             keyExtractor={item => item.id}
//                                           />
//                                         ) : (
//                                           <View>
//                                             {stateName === 'Maharashtra' ? (
//                                               <FlatList
//                                                 style={{ paddingVertical: 10 }}
//                                                 data={Maharashtra_District}
//                                                 renderItem={districtRenderItem}
//                                                 keyExtractor={item => item.id}
//                                               />
//                                             ) : (
//                                               <View>
//                                                 {stateName === 'Odisha' ? (
//                                                   <FlatList
//                                                     style={{
//                                                       paddingVertical: 10,
//                                                     }}
//                                                     data={Odisha_District}
//                                                     renderItem={
//                                                       districtRenderItem
//                                                     }
//                                                     keyExtractor={item =>
//                                                       item.id
//                                                     }
//                                                   />
//                                                 ) : (
//                                                   <View>
//                                                     {stateName ===
//                                                       'Puducherry' ? (
//                                                       <FlatList
//                                                         style={{
//                                                           paddingVertical: 10,
//                                                         }}
//                                                         data={
//                                                           Puducherry_District
//                                                         }
//                                                         renderItem={
//                                                           districtRenderItem
//                                                         }
//                                                         keyExtractor={item =>
//                                                           item.id
//                                                         }
//                                                       />
//                                                     ) : (
//                                                       <View>
//                                                         {stateName ===
//                                                           'Tamil Nadu' ? (
//                                                           <FlatList
//                                                             style={{
//                                                               paddingVertical: 10,
//                                                             }}
//                                                             data={
//                                                               Tamil_Nadu_District
//                                                             }
//                                                             renderItem={
//                                                               districtRenderItem
//                                                             }
//                                                             keyExtractor={item =>
//                                                               item.id
//                                                             }
//                                                           />
//                                                         ) : (
//                                                           <View>
//                                                             {stateName === "West Bengal" ? (
//                                                               <FlatList
//                                                                 style={{
//                                                                   paddingVertical: 10,
//                                                                 }}
//                                                                 data={
//                                                                   West_Bengal_District
//                                                                 }
//                                                                 renderItem={
//                                                                   districtRenderItem
//                                                                 }
//                                                                 keyExtractor={item =>
//                                                                   item.id
//                                                                 }
//                                                               />
//                                                             ) : (
//                                                               <View>
//                                                                 {/* <FlatList
//                                                               style={{
//                                                                 paddingVertical: 10,
//                                                               }}
//                                                               data={
//                                                                 Lakshadweep_District
//                                                               }
//                                                               renderItem={
//                                                                 districtRenderItem
//                                                               }
//                                                               keyExtractor={item =>
//                                                                 item.id
//                                                               }
//                                                             /> */}
//                                                               </View>
//                                                             )}

//                                                           </View>
//                                                         )}
//                                                       </View>
//                                                     )}
//                                                   </View>
//                                                 )}
//                                               </View>
//                                             )}
//                                           </View>
//                                         )}
//                                       </View>
//                                     )}
//                                   </View>
//                                 )}
//                               </View>
//                             )}
//                           </View>
//                         )}
//                       </View>
//                     )}
//                   </CollapseBody>
//                 )}
//                 {/* <CollapseBody>
//                 <FlatList
//                   style={{paddingVertical: 10}}
//                   data={Tamil_Nadu_District}
//                   renderItem={districtRenderItem}
//                   keyExtractor={item => item.id}
//                 />
//               </CollapseBody> */}
//               </Collapse>
//             )}
//             <TouchableOpacity
//               onPress={() => filterUser()}
//               style={{
//                 marginTop: 20,
//                 borderRadius: 48,
//                 paddingVertical: 16,
//                 backgroundColor: '#3877F1',
//                 shadowColor: '#3877F1',
//                 shadowOffset: {
//                   width: 0,
//                   height: 2,
//                 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 2,
//                 elevation: 5,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 paddingHorizontal: 10,
//               }}>
//               <View style={{ width: 10 }}></View>
//               <View
//                 style={{
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginLeft: 15,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     color: '#fff',
//                     fontFamily: 'OpenSans-Regular',
//                     fontWeight: '700',
//                   }}>
//                   Apply
//                 </Text>
//               </View>
//               <View>
//                 <Image
//                   source={require('../../../../assets/Login_Arrow.png')}
//                   style={{ width: 27.5, height: 26.7 }}
//                 />
//               </View>
//             </TouchableOpacity>
//             <View style={styles.resetFilter}>
//               <TouchableOpacity
//                 onPress={() => {
//                   resetFilter();
//                 }}>
//                 <Text style={styles.resetFilterText}>Reset Filter</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </RBSheet>
//       </SafeAreaView>
//     );
//   } else {
//     return <ActivityIndicator style={{ justifyContent: 'center', flex: 1 }} />;
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   message: {
//     borderWidth: 1,
//     borderRadius: 10,
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderColor: '#E5E5E5',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 9,
//   },
//   alertMessage: {
//     borderRadius: 25,
//     width: 80,
//     backgroundColor: '#FB7429',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 3,
//     marginBottom: 6,
//   },
// item: {
//   backgroundColor: '#fff',
//   justifyContent: 'space-between',
//   paddingBottom: 10,
//   paddingHorizontal: 10,
//   // marginTop: 2,
//   borderRadius: 10,
//   marginBottom: 20,
//   // marginVertical: 5,
//   marginHorizontal: 16,
//   // flexDirection: 'row',
//   borderWidth: 1,
//   borderColor: '#E5E5E5',
//   shadowColor: '#000',
//   shadowOffset: {
//     width: 0,
//     height: 2,
//   },
//   shadowOpacity: 0.1,
//   shadowRadius: 2,
//   elevation: 3,
// },
//   // title: {
//   //   fontSize: 12,
//   //   fontFamily: 'OpenSans-Regular',
//   //   fontWeight: '700',
//   //   color: '#0D2451',
//   // },

//   title: {
//     marginTop: 20,
//     // fontWeight: "bold",
//     fontSize: 14,
//     fontFamily: 'Metropolis_SemiBold',
//   },
//   bell: {
//     alignItems: 'flex-end',
//     padding: 5,
//     width: '20%',
//   },
//   bellNotify: {
//     width: 15,
//     height: 15,
//     borderRadius: 7.5,
//     position: 'absolute',
//     backgroundColor: '#EB4335',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 10,
//     marginTop: -4,
//   },
//   searchBar: {
//     borderWidth: 1,
//     borderRadius: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     width: '85%',
//   },
//   filterText: {
//     fontSize: 9,
//     color: '#000',
//     fontFamily: 'OpenSans-Regular',
//     fontWeight: '600',
//   },
//   info: {
//     fontSize: 9,
//     fontFamily: 'OpenSans-Regular',
//     color: '#000',
//     marginTop: 3,
//   },
//   bottomSheetTitleText: {
//     fontSize: 15,
//     fontFamily: 'OpenSans-Regular',
//     fontWeight: '700',
//     color: '#000',
//   },
//   resetFilter: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   resetFilterText: {
//     color: '#EB4335',
//     fontFamily: 'OpenSans-Bold',
//     fontSize: 18,
//   },
//   TabsFont: {
//     fontFamily: 'Metropolis-Regular',
//     fontSize: 12,
//     color: '#000',
//   },
//   footer: {
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   loadMoreBtn: {
//     padding: 10,
//     backgroundColor: '#3877F1',
//     borderRadius: 4,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10
//   },
//   btnText: {
//     color: 'white',
//     fontSize: 15,
//     textAlign: 'center',
//   },
// });

// export default FeedTabs;







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
  ScrollView,
  BackHandler,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetFeedListData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { types } from '@babel/core';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';


const FeedTabs = ({ navigation }) => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  let [loader, setLoader] = useState(false);
  // const refRBSheet = useRef();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [publicFeed, setPublicFeed] = useState(true);
  const [myFeed, setMyFeed] = useState(false);
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [feedDataType, setFeedDataType] = useState('public');
  let [searchFilterList, setSearchFilterList] = useState([]);
  const [newFeedData, setNewFeedData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [flatListLoader, setFlatListLoader] = useState(false)

  const [feedTemp, setFeedTemp] = useState([]);
  const [myFeedTemp, setMyFeedTemp] = useState([]);

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
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rajesh Patel',
      state: 'Gujarat',
      city: 'Junagadh,Rajkot',
      number: '92193 84854',
    },
  ];
  const isFocused = useIsFocused();
  useEffect(() => {
    // alert("Hello")
    // return
    setOffset(0)
    getFeedList();

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    // alert("Hello Return")
    // return
    setFeedTemp([])
    getFeedList();

  }, [isFocused])
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  const stateRenderItem = ({ item }) => {
    return <LocationItem item={item} onPress={() => onToggle(item)} />;
  };
  const districtRenderItem = ({ item }) => {
    return <LocationItem item={item} onPress={() => districtonToggle(item)} />;
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
  // const filterUser = () => {
  //   refRBSheet.current.close();
  //   // var data = newFeedData.filter(
  //   var data = feedTemp.filter(
  //     listItem =>
  //       listItem.state
  //         .toLowerCase()
  //         .includes(stateName.toString().toLowerCase()) && listItem.district
  //           .toLowerCase()
  //           .includes(districtName.toString().toLowerCase()),
  //   );

  //   console.log(data = feedTemp.filter(
  //     listItem =>
  //       listItem.state
  //         .toLowerCase()
  //         .includes(stateName.toString().toLowerCase()) && listItem.district
  //           .toLowerCase()
  //           .includes(districtName.toString().toLowerCase()),
  //   ), "DATA CHECK FOR STATE")
  //   //  return
  //   // setFeedData(data);
  //   setFeedTemp(data)

  //   setLoader(false);
  // };
  const filterUser = () => {
    refRBSheet.current.close();
    if (stateName && districtName === "Select District") {
    var data = feedTemp.filter(
      listItem =>
        listItem.state
          .toLowerCase()
          .includes(stateName.toString().toLowerCase()) 

    );

    //  return
    setFeedData(data);
    setFeedTemp(data)
    setLoader(false);

    }else{
      var data = feedTemp.filter(
        listItem =>
          listItem.state
            .toLowerCase()
            .includes(stateName.toString().toLowerCase()) 
            && listItem.district
              .toLowerCase()
              .includes(districtName.toString().toLowerCase()),
      );

      //  return
      setFeedData(data);
      setFeedTemp(data)
      setLoader(false);

    }
    // setStateName('Select State'),
    //   setdistrictName('Select District');
  };
  const LocationItem = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const getFeedList = async () => {
    setLoader(true)
    setPublicFeed(true);
    setMyFeed(false);
    // this.setState({isAPILoading: true});
    const Token = await AsyncStorage.getItem('loginToken')
    const getFeedListData = await dispatch(
      GetFeedListData(Token, feedDataType, offset),
    )
    if (getFeedListData.status == 200) {
      // setOffset(offset + 1);
      setFeedData(getFeedListData.data)
      setFeedTemp(getFeedListData.data)
      setNewFeedData(getFeedListData.data)
      setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(getFeedListData.msg);
    }
  };

  const resetFilter = async () => {
    setOffset(0)
    setStateName('Select State'),
      setdistrictName('Select District');
    setSearch(''),
      setLoader(true);
    setPublicFeed(true);
    setMyFeed(false);
    const offset = 0
    // this.setState({isAPILoading: true});
    const Token = await AsyncStorage.getItem('loginToken')
    const getFeedListData = await dispatch(
      GetFeedListData(Token, feedDataType, offset),
    )
    if (getFeedListData.status == 200) {
      // setOffset(offset + 1);
      setFeedData(getFeedListData.data)
      setFeedTemp(getFeedListData.data)
      setNewFeedData(getFeedListData.data)
      setLoader(false);
    } else {
      Alert.alert(getFeedListData.msg);
    }
    setLoader(false);
    // getFeedList();
    refRBSheet.current.close();
  }

  const Item = ({ item, onPress }) => (

    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('FeedPost', {
            feedInfo: item,
          })
        }
        style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // marginVertical: 10,
          }}>
          <View style={{ justifyContent: 'center' }}>
            <Image
              source={{ uri: item.profile_image }}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View style={{ marginLeft: 13, paddingBottom: 13 }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.info}>{item.state}, {item.district}</Text>
          </View>
          {/* White Icon */}
          {/* <View>
            <Image source={require('../../../../assets/MenuIcon.png')} />
          </View> */}
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Metropolis-Regular',
              fontWeight: '400',
              color: "#000"
            }}>
            {item.feed_text}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              borderRadius: 20,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: '#C4C4C4',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={require('../../../../assets/FeedChat.png')} />
            <Text style={{ fontFamily: '', fontSize: 11, marginLeft: 5 }}>
              Comment ({item.comments})
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 9,
                color: '#000',
              }}>
              {/* Today, 2:00 PM */}
              {moment(item.date).calendar()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        // onPress={() => {
        //   item.name === 'First Item'
        //     ? navigation.navigate('WeatherTypes', {
        //         id: item.id,
        //         name: item.title,
        //       })
        //     : navigation.navigate('WeatherTypes', {
        //         id: item.id,
        //         name: item.title,
        //       });
        // }}
        onPress={() =>
          navigation.navigate('FeedPost', {
            feedInfo: item,
          })
        }
      // backgroundColor={{backgroundColor}}
      // textColor={{color}}
      />
    );
  };

  const publicFeedTab = async (e, types) => {
    setLoader(true)
    if (myFeed === e) {
      setMyFeed(false);
      setPublicFeed(true);
      const Token = await AsyncStorage.getItem('loginToken');

      const offset = 0;
      const getFeedListData = await dispatch(GetFeedListData(Token, types, offset));
      if (getFeedListData.status == 200) {

        setFeedData(getFeedListData.data);
        setFeedTemp(getFeedListData.data)
        setLoader(false);
      } else {
        Alert.alert(getFeedListData.msg);
      }
    }
  };

  const myPublicFeedTab = async (e, types) => {
    setLoader(true)
    if (publicFeed === e) {
      setMyFeed(true);
      setPublicFeed(false);
      const Token = await AsyncStorage.getItem('loginToken')
      setFeedDataType(feedDataType)
      const offset = 0;
      const getFeedListData = await dispatch(GetFeedListData(Token, types, offset))
      if (getFeedListData.status == 200) {
        setFeedData(getFeedListData.data)
        setMyFeedTemp(getFeedListData.data)
        setLoader(false);
      } else {
        Alert.alert(getFeedListData.msg);
      }
      // getFeedList();
    }
  };
  const onRefresh = async () => {
    // console.log("REFRESH")
    setLoader(true)
    setOffset(0)

    // return
    if (stateName === 'Select State' && districtName === 'Select District' && search === "") {
      console.log("IF ENTER")
      if (myFeed === true) {
        setMyFeedTemp([])
        const types = "my"
        console.log("enter")
        const Token = await AsyncStorage.getItem('loginToken')
        const refreshOffset = 0;
        setFeedDataType(feedDataType)
        const getFeedListData = await dispatch(GetFeedListData(Token, types, refreshOffset))
        if (getFeedListData.status == 200) {
          setFeedData(getFeedListData.data)
          setMyFeedTemp(getFeedListData.data)
          console.log(feedData, "REFERESH FEED")
          setLoader(false);
        } else {
          setLoader(false);
          Alert.alert(getFeedListData.msg);
        }
      } else {
        setFeedTemp([])
        console.log("IF -> ELSE ENTER")
        const Token = await AsyncStorage.getItem('loginToken');
        const refreshOffset = 0;
        const getFeedListData = await dispatch(
          GetFeedListData(Token, feedDataType, refreshOffset),
        );
        if (getFeedListData.status == 200) {

          setFeedData(getFeedListData.data);
          setFeedTemp(getFeedListData.data)
          setLoader(false);
        } else {
          setLoader(false);
          Alert.alert(getFeedListData.msg);
        }
      }
    } else if (search !== "") {
      searchUser(search);
    } else {
      console.log("ENTER IN ELSEF")
      filterUser();
    }
  };

  const searchUser = search => {
    setLoader(true);
    if (search === "") {
      // setFeedData(newFeedData);
      setFeedTemp(newFeedData);
    } else {
      var data = feedTemp.filter(listItem =>
        listItem.name
          .toLowerCase()
          .includes(search.toString().toLowerCase()),
      );
      console.log(data, "SEARCH DATA")
      setFeedTemp(data)
      // setFeedData(data);
    }
    setLoader(false);
  };

  const close = async () => {
    setLoader(true);
    setSearch(''),
      searchUser('');
    setPublicFeed(true);
    setMyFeed(false);
    const offset = 0
    // this.setState({isAPILoading: true});
    const Token = await AsyncStorage.getItem('loginToken')
    const getFeedListData = await dispatch(
      GetFeedListData(Token, feedDataType, offset),
    )
    if (getFeedListData.status == 200) {
      // setOffset(offset + 1);
      setFeedData(getFeedListData.data)
      setFeedTemp(getFeedListData.data)
      setNewFeedData(getFeedListData.data)
      setLoader(false);
    } else {
      Alert.alert(getFeedListData.msg);
    }
    setLoader(false);

  }


  const loadPublicFeed = async () => {
    setFlatListLoader(true);

    const offsetLength = feedTemp.length;

    const Token = await AsyncStorage.getItem('loginToken')
    const getFeedListData = await dispatch(
      GetFeedListData(Token, feedDataType, offsetLength),
    )
    if (getFeedListData.status == 200) {
      const Addition = offsetLength + getFeedListData.data.length
      setFeedData(getFeedListData.data)
      feedTemp.push(...getFeedListData.data)
      console.log(feedTemp, "_+_+_+_+_")

      // return
      setFeedData(getFeedListData.data)
      setNewFeedData(getFeedListData.data)
      setOffset(Addition);
      console.log(offset, "OFFSET")
      setFlatListLoader(false);
      return
    } else {
      setFlatListLoader(false);
      Alert.alert(getFeedListData.msg);
      return
    }

  }

  const loadMyFeed = async () => {
    console.log("MY FEED LOAD")
    // return
    setFlatListLoader(true);

    const offsetLength = feedTemp.length;

    const feed = "my"
    const Token = await AsyncStorage.getItem('loginToken')
    const getFeedListData = await dispatch(
      GetFeedListData(Token, feed, offsetLength),
    )
    if (getFeedListData.status == 200) {
      const Addition = offsetLength + getFeedListData.data.length
      setFeedData(getFeedListData.data)
      myFeedTemp.push(...getFeedListData.data)
      console.log(myFeedTemp, "MYFEED TEMP")
      setNewFeedData(getFeedListData.data)
      setOffset(Addition);
      console.log(offset, "OFFSET")
      setFlatListLoader(false);
      return
    } else {
      setFlatListLoader(false);
      Alert.alert(getFeedListData.msg);
    }
    setLoader(false);
  }


  // const renderFooterPublic = () => {
  //   return (
  //     //Footer View with Load More button
  //     flatListLoader ?
  //       <View style={styles.footer}>
  //         <ActivityIndicator size={"large"} />
  //       </View>
  //       : null
  //   );
  // };
  const renderFooterMy = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {flatListLoader ? (
          <ActivityIndicator
            color="#3877F1"
            style={{ marginLeft: 8 }} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={loadMyFeed}
            //On Click of button load more data
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>

          </TouchableOpacity>
        )}

      </View>
    );
  };
  const renderFooterPublic = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {flatListLoader ? (
          <ActivityIndicator
            color="#3877F1"
            style={{ marginLeft: 8 }} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={loadPublicFeed}
            //On Click of button load more data
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>

          </TouchableOpacity>
        )}

      </View>
    );
  };

  // const renderFooter = () => {
  //   if(feedData.length-1){
  //     getFeedList()
  //   }
  // }

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
                  FEED
                </Text>
              </View>
              <TouchableOpacity
                style={styles.bell}
                onPress={() => navigation.navigate('CreatePost')}>
                <View>
                  <Image source={require('../../../../assets/Plus.png')} />
                </View>
              </TouchableOpacity>
            </View>

            {/* </Header> */}
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '25%',
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: '#EDEDED',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          {publicFeed === true ? (
            //   <TouchableOpacity>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 3,
                borderRadius: 20,
                paddingHorizontal: 10,
              }}>
              <Text style={styles.TabsFont}>Public Feed</Text>
            </View>
          ) : (
            //   </TouchableOpacity>
            <TouchableOpacity
              onPress={() => publicFeedTab(true, 'public')}>
              <View
                style={{
                  padding: 3,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <Text style={styles.TabsFont}>Public Feed</Text>
              </View>
            </TouchableOpacity>
          )}
          {myFeed === false ? (
            <TouchableOpacity
              onPress={() => myPublicFeedTab(true, 'my')}>
              <View
                style={{
                  padding: 3,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <Text style={styles.TabsFont}>My Feed</Text>
              </View>
            </TouchableOpacity>
          ) : (
            //   <TouchableOpacity>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 3,
                paddingHorizontal: 10,
                borderRadius: 20,
              }}>
              <Text style={styles.TabsFont}>My Feed</Text>
            </View>
            //   </TouchableOpacity>
          )}
        </View>
        {publicFeed === true ? (
          <View>
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 20,
                flexDirection: 'row',
              }}>
              <View style={styles.searchBar}>
                <View style={{ width: '90%' }}>
                  <TextInput
                    style={{ fontSize: 15, color: '#000' }}
                    placeholderTextColor={'#000'}
                    placeholder={'Search'}
                    // keyboardType='email-address'
                    value={search}
                    onChangeText={event => setSearch(event)}
                    returnKeyType="search"
                    onSubmitEditing={() => onRefresh()}
                  />
                </View>
                {search == null || search == '' ? (
                  <TouchableOpacity
                  // onPress={() => searchUser(search)}
                  >
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('../../../../assets/Search.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      close();
                    }}>
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('../../../../assets/Cross_Black.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <View style={{ alignItems: 'center' }}>
                  <Image source={require('../../../../assets/Filter.png')} />
                  <Text style={styles.filterText}>FILTER</Text>
                </View>
              </TouchableOpacity>
            </View>
            {search !== "" || feedData.length < 10 || stateName !== "Select State" ? (
              <FlatList
                style={{ marginBottom: '55%' }}
                data={feedTemp}
                // data={feedData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                ListEmptyComponent={
                  <View
                    style={{
                      marginTop: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Result Not Found</Text>
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={loader}
                    onRefresh={onRefresh}
                  // colors={[Colors.darkorange]}
                  />
                }
              />
            ) : (

              <FlatList
                style={{ marginBottom: '55%' }}
                data={feedTemp}
                // data={feedData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                // onEndReached={loadPublicFeed}
                ListFooterComponent={renderFooterPublic}
                ListEmptyComponent={
                  <View
                    style={{
                      marginTop: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Result Not Found</Text>
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={loader}
                    onRefresh={onRefresh}
                  // colors={[Colors.darkorange]}
                  />
                }
              />
            )}
          </View>
        ) : (
          <View style={{ marginTop: 10 }}>
            {feedData.length < 10 ? (
              <FlatList
                style={{ marginBottom: '32%' }}
                data={myFeedTemp}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                // ListFooterComponent={renderFooterMy}
                // onEndReached={loadMyFeed}
                // ListFooterComponent={renderFooterPublic}


                ListEmptyComponent={
                  <View
                    style={{
                      marginTop: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Result Not Found</Text>
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={loader}
                    onRefresh={onRefresh}
                  // colors={[Colors.darkorange]}
                  />
                }
              />
            ) : (
              <FlatList
                style={{ marginBottom: '32%' }}
                data={myFeedTemp}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                ListFooterComponent={renderFooterMy}
                // onEndReached={loadMyFeed}
                // ListFooterComponent={renderFooterPublic}


                ListEmptyComponent={
                  <View
                    style={{
                      marginTop: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Result Not Found</Text>
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={loader}
                    onRefresh={onRefresh}
                  // colors={[Colors.darkorange]}
                  />
                }
              />
            )}




            {/* {feedData.length == 0 ? (
              <FlatList
                style={{ marginBottom: '50%' }}
                data={myFeedTemp}
                // data={feedData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                ListEmptyComponent={
                  <View
                    style={{
                      marginTop: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Result Not Found</Text>
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={loader}
                    onRefresh={onRefresh}
                  // colors={[Colors.darkorange]}
                  />
                }
              />
            ) : ( */}

            {/* <FlatList
                style={{ marginBottom: '38%' }}
                data={myFeedTemp}
                // data={feedData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                onEndReached={loadMyFeed}
                ListFooterComponent={renderFooterPublic}
                ListEmptyComponent={
                  <View
                    style={{
                      marginTop: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Result Not Found</Text>
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={loader}
                    onRefresh={onRefresh}
                  // colors={[Colors.darkorange]}
                  />
                }
              /> */}
            {/* )} */}
          </View>
        )}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          // closeOnPressMask={false}
          height={380}
          dragFromTopOnly={true}
          customStyles={{
            container: { paddingHorizontal: 20, borderRadius: 20 },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.bottomSheetTitleText}>Filter By:</Text>
            </View>
            <View style={{ marginTop: '5%' }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '400',
                }}>
                State
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
            {/* </View> */}
            <View style={{ marginTop: '5%' }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '400',
                }}>
                District
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
            <TouchableOpacity
              onPress={() => filterUser()}
              style={{
                marginTop: 20,
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
                elevation: 5,
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
                  Apply
                </Text>
              </View>
              <View>
                <Image
                  source={require('../../../../assets/Login_Arrow.png')}
                  style={{ width: 27.5, height: 26.7 }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.resetFilter}>
              <TouchableOpacity
                onPress={() => {
                  resetFilter();
                }}>
                <Text style={styles.resetFilterText}>Reset Filter</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </RBSheet>
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
    paddingBottom: 10,
    paddingHorizontal: 10,
    // marginTop: 2,
    borderRadius: 10,
    marginBottom: 20,
    // marginVertical: 5,
    marginHorizontal: 16,
    // flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    marginTop: 20,
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#0D2451',
  },

  // title: {
  //   marginTop: 20,
  //   // fontWeight: "bold",
  //   fontSize: 14,
  //   fontFamily: 'Metropolis_SemiBold',
  // },
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
  searchBar: {
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '85%',
  },
  filterText: {
    fontSize: 9,
    color: '#000',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
  },
  info: {
    fontSize: 9,
    fontFamily: 'OpenSans-Regular',
    color: '#000',
    marginTop: 3,
  },
  bottomSheetTitleText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#000',
  },
  resetFilter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resetFilterText: {
    color: '#EB4335',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  TabsFont: {
    fontFamily: 'Metropolis-Regular',
    fontSize: 12,
    color: '#000',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#3877F1',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default FeedTabs;
