import React, {useState, useEffect} from 'react';
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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';

const MapsTypes = ({navigation, route}) => {
  const [stateName, setStateName] = useState('Select State');
  const [stateToggle, setStateToggle] = useState(false);
  const [titleName, setTitleName] = useState('')
  const [contryState, setContryState] = useState([
    {
      id: '1',
      title: 'Gujarat',
    },
    {
      id: '2',
      title: 'Rajasthan',
    },
    {
      id: '3',
      title: 'Maharastra',
    },
    {
      id: '4',
      title: 'Uttarpradesh',
    },
  ]);

  const Item = ({item, onPress}) => (
    <View>
      <TouchableOpacity onPress={onPress} style={{marginVertical: 5}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 13}}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const stateRenderItem = ({item}) => {
    return <Item item={item} onPress={() => onToggle(item)} />;
  };

  const onToggle = item => {
    setStateName(item.title);
    setStateToggle(false);
  };

  useEffect(() => {
    // setVisible(true)
    const Data = route.params;
    setTitleName(Data.WeatherName.toUpperCase());
    // setVisible(false)
  }, []);

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
              onPress={() => 
                {if(titleName !== "CYCLONIC WIND" && titleName !== "STORM SURGE" && titleName !== "FLOOD"){
                  navigation.navigate('WeatherTypes')
                }else{
                  
                  navigation.navigate('HydrometHazard')
                }}}
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
                {titleName}
              </Text>
            </View>

            <View style={styles.bell}></View>
          </View>

          {/* </Header> */}
        </View>
      </LinearGradient>
      
      <Collapse
        style={{borderWidth: 1, borderRadius: 15, borderColor: '#DFDFDF', marginHorizontal: '5%', marginVertical: 20}}
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
      <MapView
        style={{flex: 1}}
        //   provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 5.0922,
          longitudeDelta: 5.0421,
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
    fontSize: 12,
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

export default MapsTypes;
