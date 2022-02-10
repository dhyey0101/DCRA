import React, {useState, useEffect} from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CustomDrawer = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginBottom: 20}}>
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'OpenSans-Regular',
              }}>
              Layers
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <View>
            <Image source={require('../../../../assets/Cross_Black.png')}/>
          </View>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Cone Of Uncertainity
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Observed Track
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Tehsil Boundary
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Flood Hazard 500yr
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              District Boundary
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Tehsil Boundary
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Village Boundary 
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Surge Hazard
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Flood Hazard
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Wind Hazard
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Affected Population
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Affected Population Density
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              State Boundary
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'OpenSans-Semibold',
                fontSize: 14,
              }}>
              Rainfall
            </Text>
          </View>
          </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 40,
    // alignItems: "center",
    // paddingHorizontal: 30,
    // justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainView: {
    ...Platform.select({
      android: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        marginTop: '22.2%',
      },
      ios: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: 'center',
        marginTop: '5%',
      },
    }),
  },
  goldImage: {
    ...Platform.select({
      android: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginHorizontal: '26%',
        // justifyContent:'center'
      },
      ios: {
        position: 'absolute',
        alignSelf: 'flex-end',
        // paddingHorizontal: "18%",
        marginHorizontal: '25%',
      },
    }),
  },
  title: {
    marginTop: 20,
    // fontWeight: "bold",
    fontSize: 20,
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
    ...Platform.select({
      ios: {
        marginTop: 22,
        // backgroundColor: "#FE8312",
        borderRadius: 25,
        paddingVertical: 15,
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
      android: {
        marginTop: 22,
        // backgroundColor: "#FE8312",
        borderRadius: 52,
        paddingVertical: 15,
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
    }),
  },
  signupText: {
    marginTop: 36,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default CustomDrawer;