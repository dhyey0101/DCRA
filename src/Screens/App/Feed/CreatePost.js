import React, {useState, useRef, useEffect} from 'react';
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
import {CreateFeedBackData} from '../../../Redux/Action/Admin';
import {useDispatch, useSelector} from 'react-redux';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import DropdownAlert from 'react-native-dropdownalert';

const CreatePost = ({navigation, route}) => {
  let dropDownAlertRef = useRef();
  const dispatch = useDispatch();
  let [loader, setLoader] = useState(false);
  const [feedID, setFeedID] = useState('');
  const [stateName, setStateName] = useState('Select State');
  const [districtName, setdistrictName] = useState('Select District');
  const [stateToggle, setStateToggle] = useState(false);
  const [districtToggle, setdistrictToggle] = useState(false);
  const [feed_text, setFeedText] = useState('');
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
    if (route.params) {
      getFeedData();
    }
  }, []);

  const getFeedData = () => {
    setLoader(true);
    const Data = route.params;

    console.log('+++++++++++++++++++++++++++');
    console.log(Data.FeedData.feedInfo);
    setFeedText(Data.FeedData.feedInfo.feed_text);
    setStateName(Data.FeedData.feedInfo.state);
    setdistrictName(Data.FeedData.feedInfo.district);
    setFeedID(Data.FeedData.feedInfo.id);
    console.log('+++++++++++++++++++++++++++');
    setLoader(false);
  };

  const Item = ({item, onPress}) => (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 13}}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
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

  const submitFeed = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    // const id = await AsyncStorage.getItem('loginID');

    if (feed_text == '') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Please write your message');
      return;
    }
    if (stateName == 'Select State') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Select state');
      return;
    }
    if (districtName == 'Select District') {
      dropDownAlertRef.alertWithType('error', 'DCRA', 'Select district');
      return;
    }

    setLoader(true);

    const sendFeedData = await dispatch(
      CreateFeedBackData(Token, feedID, feed_text, stateName, districtName),
    );
    if (sendFeedData.status == 200) {
      setFeedText(''), setStateName(''), setdistrictName(''), setLoader(false);
      navigation.navigate('FeedTabs');
    } else {
      setFeedText(''), setStateName(''), setdistrictName(''), setLoader(false);
      dropDownAlertRef.alertWithType('error', 'Error', sendFeedData.message);
    }
  };
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
              onPress={() => navigation.navigate('FeedTabs')}
              style={{width: '20%'}}>
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
                WRITE POST
              </Text>
            </View>

            <View style={styles.bell}></View>
          </View>

          {/* </Header> */}
        </View>
      </LinearGradient>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, paddingHorizontal: '3%'}}>
          <View
            style={{
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 15,
              padding: 10,
              // height: 250,
            }}>
            <AutoGrowingTextInput
              style={styles.textInput}
              placeholder={'Your Message'}
              value={feed_text}
              // height={400}
              onChangeText={feedText => setFeedText(feedText)}
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
                                                  keyExtractor={item => item.id}
                                                />
                                              ) : (
                                                <View>
                                                  {stateName ===
                                                  'Puducherry' ? (
                                                    <FlatList
                                                      style={{
                                                        paddingVertical: 10,
                                                      }}
                                                      data={Puducherry_District}
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
            </Collapse>
          )}
        </View>
        <TouchableOpacity
          onPress={() => submitFeed()}
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
            marginHorizontal: 10,
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
              Submit
            </Text>
          </View>
          <View>
            <Image
              source={require('../../../../assets/Login_Arrow.png')}
              style={{width: 27.5, height: 26.7}}
            />
          </View>
        </TouchableOpacity>
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
});

export default CreatePost;
