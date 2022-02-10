import React, {Component} from 'react';
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
  ImageBackground,
} from 'react-native';

export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#3877F1" />
        <ImageBackground
          source={require('../../../assets/Splash_Background.png')}
          style={styles.image}>
          {/* <View style={{paddingHorizontal: 10}}> */}
          <View
            style={{
              marginTop: '20%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../assets/1_Logo.png')}
              style={{width: 148, height: 148, marginRight: 20}}
              // resizeMode={'stretch'}
            />

            <Image
              source={require('../../../assets/2_Logo.png')}
              style={{width: 84, height: 148}}
              // resizeMode={'stretch'}
            />
          </View>
          <View style={{paddingHorizontal: 10, marginTop: '-30%'}}>
            <View>
              <Text
                style={{
                  fontSize: 19,
                  color: '#fff',
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                Welcome To
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  color: '#fff',
                  fontFamily: 'OpenSans-Regular',
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                Web-DCRA and DSS Tool
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigate('Login')}
            style={{
              marginBottom: 20,
              borderRadius: 48,
              paddingVertical: 16,
              backgroundColor: '#0D2451',
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
                Get Started
              </Text>
            </View>
            <View>
              <Image
                source={require('../../../assets/Login_Arrow.png')}
                style={{width: 27.5, height: 26.7}}
              />
            </View>
          </TouchableOpacity>
          {/* </View> */}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
