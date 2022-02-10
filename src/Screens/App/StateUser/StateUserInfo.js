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
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GetUser, deleteUserData} from '../../../Redux/Action/Admin';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const StateUserInfo = ({navigation, route}) => {
  const dispatch = useDispatch();
  let [loader, setLoader] = useState(false);
  const [response, setResponse] = useState('');
  const [userId, setUserId] = useState('');
  const [delete_User_Data, set_Delete_User_Data] = useState([]);

  useEffect(() => {
    const Data = route.params;
    setUserId(Data.id);
    setResponse(Data.userInfo);
  }, []);

  const editUser = () => {
    navigation.navigate('AddStateUser', {userInfo: response, flag: 'editUser'});
  };

  const deleteUser = () => {

    Alert.alert(
      'DCRA',
      'Are you sure want to delete?',
      [
        {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
        {text: 'Yes', onPress: () => DeleteUser()},
      ],
      { 
        cancelable: false 
      }
    );    
  };

  const DeleteUser = async () => {
    const id = userId;
    console.log(id, '------------------------');
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});

    console.log(Token, 'user token================');
    const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    set_Delete_User_Data(delete_User_Data_Response.data);
    if (delete_User_Data_Response.status == 200) {
      setLoader(false);
      navigation.navigate('StateUsers');
    } else {
      setLoader(false);
      Alert.alert(delete_User_Data_Response.msg);
    }
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
                onPress={() => navigation.navigate('StateUsers')}
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
                  {response.first_name}
                </Text>
              </View>
              <View style={(styles.bell, [{flexDirection: 'row'}])}>
                <TouchableOpacity onPress={() => editUser()}>
                  <View>
                    <Image
                      source={require('../../../../assets/Edit-White.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => deleteUser()}>
                  <View>
                    <Image
                      source={require('../../../../assets/Delete-White.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{paddingVertical: 10}}>
              <View>
                <Text style={styles.textTitle}>Full Name</Text>
                <Text style={styles.text}>
                  {response.first_name}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={styles.textTitle}>Username</Text>
                <Text style={styles.text}>{response.username}</Text>
              </View>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderColor: '#c5c5c5',
              }}>
              <View>
                <Text style={styles.textTitle}>Date Of Birth</Text>
                <Text style={styles.text}>{response.date_of_birth}</Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={styles.textTitle}>Mobile Number</Text>
                <Text style={styles.text}>
                  {response.relative_mobile_number_1}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.textTitle}>State</Text>
            <Text style={styles.text}>{response.state}</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.textTitle}>District</Text>
            <Text style={styles.text}>{response.district}</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.textTitle}>Relative 1 Mobile Number</Text>
            {response.relative_mobile_number_1 ? (
              <Text style={styles.text}>
                {response.relative_mobile_number_1}
              </Text>
            ) : (
              <Text style={styles.text}>-</Text>
            )}
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.textTitle}>Relative 2 Mobile Number</Text>
            {response.relative_mobile_number_2 ? (
              <Text style={styles.text}>
                {response.relative_mobile_number_2}
              </Text>
            ) : (
              <Text style={styles.text}>-</Text>
            )}
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.textTitle}>Relative 3 Mobile Number</Text>
            {response.relative_mobile_number_3 ? (
              <Text style={styles.text}>
                {response.relative_mobile_number_3}
              </Text>
            ) : (
              <Text style={styles.text}>-</Text>
            )}
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.textTitle}>Relative 4 Mobile Number</Text>
            {response.relative_mobile_number_4 ? (
              <Text style={styles.text}>
                {response.relative_mobile_number_4}
              </Text>
            ) : (
              <Text style={styles.text}>-</Text>
            )}
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.textTitle}>Relative 5 Mobile Number</Text>
            {response.relative_mobile_number_5 ? (
              <Text style={styles.text}>
                {response.relative_mobile_number_5}
              </Text>
            ) : (
              <Text style={styles.text}>-</Text>
            )}
          </View>
        </View>
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
});

export default StateUserInfo;
