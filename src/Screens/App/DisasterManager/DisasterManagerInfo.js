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
  Alert,
  BackHandler,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GetUser, deleteUserData} from '../../../Redux/Action/Admin';
import {useDispatch, useSelector} from 'react-redux';

const DisasterManagerInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [response, setResponse] = React.useState('');
  const [userId, setUserId] = useState('')
  const [delete_User_Data, set_Delete_User_Data] = useState([]);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    const Data = route.params;
    console.log(Data, "000000000000")
    setUserId(Data.id)
    setResponse(Data.userInfo);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const deleteUser = async () => {


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
  }
  
  const DeleteUser = async () => {
    const id = userId
    console.log(id, "------------------------")
    setLoader(true);
    const Token = await AsyncStorage.getItem('loginToken');
    // this.setState({isAPILoading: true});

    console.log(Token, 'user token================');
    const delete_User_Data_Response = await dispatch(deleteUserData(Token, id));
    set_Delete_User_Data(delete_User_Data_Response.data);
    if(delete_User_Data_Response.status == 200){
      navigation.navigate("DisasterManagers")
      setLoader(false)

    }else{      
      setLoader(false)
      Alert.alert(delete_User_Data_Response.msg)
    }
  }
  const editUser = () => {
    navigation.navigate("AddDisasterManager", {userInfo: response, flag: "editDisasterManager"})
  }
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
              onPress={() => navigation.navigate('DisasterManagers')}
              style={{ width: '20%' }}>
              <View>
                <Image
                  source={require('../../../../assets/Back_Arrow_White.png')}
                />
              </View>
            </TouchableOpacity>
            <View style={{width: "60%"}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                }}
                numberOfLines={1}>
                
                {response.first_name}
              </Text>
            </View>
            <View style={(styles.bell, [{ flexDirection: 'row', marginLeft: 10}])}>
              <TouchableOpacity onPress={() => editUser()}>
                <View>
                  <Image
                    source={require('../../../../assets/Edit-White.png')}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => deleteUser()}>
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
      <View style={{ padding: 20 }}>
        <View>
          <View style={{ paddingVertical: 10 }}>
            <View>
              <Text style={styles.textTitle}>Full Name</Text>
              {response.first_name ? (

                <Text style={styles.text}>{response.first_name}</Text>
              ) : (
                <Text style={styles.text}>-</Text>
              )}
              {/* <Text style={styles.text}>{response.first_name} {response.last_name}</Text> */}
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.textTitle}>Mobile Number</Text>
              {response.mobile ? (

                <Text style={styles.text}>{response.mobile}</Text>
              ) : (
                <Text style={styles.text}>-</Text>
              )}
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.textTitle}>State</Text>
            {response.state ? (

              <Text style={styles.text}>{response.state}</Text>
            ) : (
              <Text style={styles.text}>-</Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
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

export default DisasterManagerInfo;
