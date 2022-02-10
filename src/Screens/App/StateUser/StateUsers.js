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
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUser, deleteUserData } from '../../../Redux/Action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, reset } from '../../../Navigation/RootNavigation';
import { useIsFocused } from '@react-navigation/native';


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

const StateUsers = ({ navigation, props }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const refRBSheet = useRef();
  let [loader, setLoader] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [stateUserData, setStateUserData] = useState([]);
  const [delete_User_Data, set_Delete_User_Data] = useState([]);
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState('');
  let [searchFilterList, setSearchFilterList] = useState([]);
  const [newStateUserData, setNewStateUserData] = useState([]);
  const [stateUserTempList, setStateUserTempList] = useState([]);
  const [flatListLoader, setFlatListLoader] = useState(false)
  const [offset, setOffset] = useState(0)


  const [flag, setFlag] = useState(true)
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
  useEffect(() => {
    setLoader(true)
    getUser()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    setLoader(true)
    getUser()
  }, [isFocused])
  
  const getUser = async () => {
    setLoader(true);
    // this.setState({isAPILoading: true});
    const Token = await AsyncStorage.getItem('loginToken');

    console.log(Token, 'user token================');
    const getUserData = await dispatch(GetUser(Token, offset));
    if (getUserData.status == 200) {
      setStateUserData(getUserData.data);
      setNewStateUserData(getUserData.data);
      setStateUserTempList(getUserData.data);
      setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(getUserData.msg);
      return
    }
  };

  const AccordianItem = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.AccordianTitle}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const Item = ({ item, onPress }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <View>
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.title}>{item.first_name}</Text>
            <Text style={styles.info}>{item.state}</Text>
            <Text style={styles.info}>{item.district}</Text>
            <Text style={styles.info}>{item.mobile}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => editUser(item)}>
            <View style={{ margin: 5 }}>
              <Image source={require('../../../../assets/Edit.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteUser(item.id)}>
            <View style={{ margin: 5 }}>
              <Image source={require('../../../../assets/Delete.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const onToggle = item => {
    setStateName(item.title);
    setStateToggle(false);
  };
  const districtonToggle = item => {
    setdistrictName(item.title);
    setdistrictToggle(false);
  };

  const stateRenderItem = ({ item }) => {
    return <AccordianItem item={item} onPress={() => onToggle(item)} />;
  };
  const districtRenderItem = ({ item }) => {
    return <AccordianItem item={item} onPress={() => districtonToggle(item)} />;
  };



  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  

  const onRefresh = async () => {
    if (stateName === 'Select State' && districtName === 'Select District' && search === "") {
      const refreshOffSet = 0
      console.log("ENTER IN IF")
      setSearch('');
      searchUser('');
      //offset
      // getUser();
      const Token = await AsyncStorage.getItem('loginToken');

      console.log(Token, 'user token================');
      const getUserData = await dispatch(GetUser(Token, refreshOffSet));

      if (getUserData.status == 200) {
        setStateUserData(getUserData.data);
        setNewStateUserData(getUserData.data);
        setStateUserTempList(getUserData.data);
      } else {
        setFlatListLoader(false);
        Alert.alert(getUserData.msg);
        return
      }
      //offset

    } else if (search !== "") {
      searchUser(search);
    } else {
      console.log("ENTER IN ELSEF")
      filterUser();
    }
  };
  // , []);

  
  const loadStateUser = async () => {
    setFlatListLoader(true);

    const offsetLength = stateUserTempList.length;
    console.log(offsetLength, "lemdt")

    const Token = await AsyncStorage.getItem('loginToken')
    const getUserData = await dispatch(
      GetUser(Token, offsetLength),
    );
    if (getUserData.status == 200) {
      const Addition = offsetLength + getUserData.data.length
      setStateUserData(getUserData.data)
      stateUserTempList.push(...getUserData.data)
      console.log(stateUserTempList, "_+_+_+_+_")
      setOffset(Addition);
      console.log(offset, "OFFSET")
      setFlatListLoader(false);
      return
    } else {
      setFlatListLoader(false);
      Alert.alert(getUserData.msg);
      return
    }
  }
  // const renderFooterStateuser = () => {
  //   return (
  //     //Footer View with Load More button
  //     flatListLoader ?
  //       <View style={styles.footer}>
  //         <ActivityIndicator size={"large"} />
  //       </View>
  //       : null
  //   );
  // };

  const renderItem = ({ item }) => {
    setUserId(item.id);
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate('StateUserInfo', { userInfo: item, id: item.id })
        }
      />
    );
  };


  const editUser = item => {
    navigation.navigate('AddStateUser', { userInfo: item, flag: 'editUser' });
  };

  const deleteUser = id => {

    Alert.alert(
      'DCRA',
      'Are you sure want to delete?',
      [
        { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
        { text: 'Yes', onPress: () => DeleteUser(id) },
      ],
      {
        cancelable: false
      }
    );


  };

  const DeleteUser = async (id) => {
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});

    console.log(Token, 'user token================');
    const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    if (delete_User_Data_Response.status == 200) {
      console.log(delete_User_Data_Response.data, "DELETE DI State")
      set_Delete_User_Data(delete_User_Data_Response.data);
      getUser();
      // setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(delete_User_Data_Response.msg);
    }
  }
  const close = async () => {
    if (stateName === 'Select State' && districtName === 'Select District') {
      setLoader(true);
      setSearch(''),
        searchUser('');


      //offset
      // getUser();
      const Token = await AsyncStorage.getItem('loginToken');
      const offset = 0;
      console.log(Token, 'user token================');
      const getUserData = await dispatch(GetUser(Token, offset));
      if (getUserData.status == 200) {
        setStateUserData(getUserData.data);
        setNewStateUserData(getUserData.data);
        setStateUserTempList(getUserData.data);
        setLoader(false)
      } else {
        setLoader(false)
        Alert.alert(getUserData.msg);
      }
      //offset
    } else {
      setSearch('')
      // filterUser();

      //offset

      if (stateName && districtName === "Select District") {

        // var data = newStateUserData.filter(
        var data = stateUserData.filter(
          listItem =>
            listItem.state
              .toLowerCase()
              .includes(stateName.toString().toLowerCase())
        );

        // setStateUserData(data);
        setStateUserTempList(data)
        setLoader(false);
      } else {
        // var data = newStateUserData.filter(
        var data = stateUserData.filter(
          listItem =>
            listItem.state
              .toLowerCase()
              .includes(stateName.toString().toLowerCase()) && listItem.district
                .toLowerCase()
                .includes(districtName.toString().toLowerCase()),
        );

        // setStateUserData(data);
        setStateUserTempList(data)
        setLoader(false);
      }
      //offset

    }
  }
  const searchUser = search => {
    setLoader(true);

    if (search === "") {
      // setStateUserData(newStateUserData);
      setStateUserTempList(newStateUserData);
      setLoader(false);
    } else {
      // var data = stateUserData.filter(listItem =>
      var data = stateUserTempList.filter(listItem =>
        listItem.first_name
          .toLowerCase()
          .includes(search.toString().toLowerCase()),
      );
      // setStateUserData(data)
      setStateUserTempList(data)
      setLoader(false);
    }
  };
  const filterUser = () => {
    refRBSheet.current.close();

    if (stateName && districtName === "Select District") {

      // var data = newStateUserData.filter(
      var data = stateUserTempList.filter(
        listItem =>
          listItem.state
            .toLowerCase()
            .includes(stateName.toString().toLowerCase())
      );

      // setStateUserData(data);
      setStateUserTempList(data)
      setLoader(false);
    } else {
      // var data = newStateUserData.filter(
      var data = stateUserTempList.filter(
        listItem =>
          listItem.state
            .toLowerCase()
            .includes(stateName.toString().toLowerCase()) && listItem.district
              .toLowerCase()
              .includes(districtName.toString().toLowerCase()),
      );

      setStateUserData(data);
      setStateUserTempList(data)
      setLoader(false);
    }
    // setSearchFilterList(data);
    // setStateName('Select State'),
    // setdistrictName('Select District');
  };

  const resetFilter = async () => {
    setLoader(true)
    setStateName('Select State'),
      setdistrictName('Select District');
    setSearch('')
    // getUser();

    // Offset
    const Token = await AsyncStorage.getItem('loginToken');
    const offset = 0;
    console.log(Token, 'user token================');
    const getUserData = await dispatch(GetUser(Token, offset));
    if (getUserData.status == 200) {
      setStateUserData(getUserData.data);
      setNewStateUserData(getUserData.data);
      setStateUserTempList(getUserData.data);
      setLoader(false)
    } else {
      setLoader(false)
      Alert.alert(getUserData.msg);
    }

    refRBSheet.current.close();
  }
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
            onPress={loadStateUser}
            //On Click of button load more data
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>

          </TouchableOpacity>
        )}

      </View>
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
                  MANAGE STATE USERS
                </Text>
              </View>
              <TouchableOpacity
                style={styles.bell}
                onPress={() =>
                  navigation.navigate('AddStateUser', { userInfo: '', flag: '' })
                }>
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
              // onSubmitEditing={(e) => console.log(e,"--------")}
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
            {/* <TouchableOpacity>
            <View>
              <Image source={require('../../../../assets/Search.png')} />
            </View>
          </TouchableOpacity> */}
          </View>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../../../assets/Filter.png')} />
              <Text style={styles.filterText}>FILTER</Text>
            </View>
          </TouchableOpacity>
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
                                                  renderItem={
                                                    districtRenderItem
                                                  }
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
                                                              {stateName ===
                                                                'West Bengal' ? (
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
        </View>

        {/* {searchFilterList === [] ||
        searchFilterList === null ||
        searchFilterList === '' ? ( */}
        {/* {stateUserData.length > 0 ? (
          // {searchFilterList === [] ? (
          <FlatList
            style={{ flex: 1 }}
            data={stateUserData}
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
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
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
            style={{ flex: 1 }}
            data={searchFilterList}
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
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            refreshControl={
              <RefreshControl
                refreshing={loader}
                onRefresh={onRefresh}
              // colors={[Colors.darkorange]}
              />
            }
          />
        )} */}

        {search !== "" || stateUserData.length < 10 || stateName !== "Select State" ? (
          // {searchFilterList === [] ? (
          <FlatList
            style={{ flex: 1 }}
            data={stateUserTempList}
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
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
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
            style={{ flex: 1 }}
            data={stateUserTempList}
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
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            // onEndReached={loadStateUser}
            // ListFooterComponent={renderFooterStateuser}
            ListFooterComponent={renderFooterMy}
            refreshControl={
              <RefreshControl
                refreshing={loader}
                onRefresh={onRefresh}
              // colors={[Colors.darkorange]}
              />
            }
          />
        )}
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
    padding: 15,
    marginTop: 2,
    borderRadius: 10,
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
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '700',
    color: '#0D2451',
  },
  AccordianTitle: {
    marginTop: 20,
    // fontWeight: "bold",
    fontSize: 14,
    fontFamily: 'Metropolis_SemiBold',
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
    fontSize: 12,
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
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default StateUsers;
