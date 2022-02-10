import React, {useState, useRef, useEffect} from 'react';
import {View, Alert} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';


import StartScreen from '../Screens/Auth/StartScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegistrationScreen from '../Screens/Auth/RegistrationScreen';
import MpinScreen from '../Screens/Auth/MpinScreen';
import forgotPasswordScreen from '../Screens/Auth/ForgotPasswordScreen';
import OTPVerification from '../Screens/Auth/OTPVerification';
import SetNewPassword from '../Screens/Auth/SetNewPassword';
import ThankYou from '../Screens/Auth/ThankYou';
import MpinLogin from '../Screens/App/MpinLogin';
import Dashboard from '../Screens/App/Dashboard';
import WeatherTypes from '../Screens/App/WeatherForcast/WeatherTypes';
import StateUsers from '../Screens/App/StateUser/StateUsers';
import AddStateUser from '../Screens/App/StateUser/AddStateUser';
import StateUserInfo from '../Screens/App/StateUser/StateUserInfo';
import DisasterManagers from '../Screens/App/DisasterManager/DisasterManagers';
import AddDisasterManager from '../Screens/App/DisasterManager/AddDisasterManager';
import DisasterManagerInfo from '../Screens/App/DisasterManager/DisasterManagerInfo';
import VerificationRequests from '../Screens/App/VerificationRequests/VerificationRequests';
import VerificationRequestInfo from '../Screens/App/VerificationRequests/VerificationRequestInfo';
import CrowdSourcingFirst from '../Screens/App/CrowdSourcing/CrowdSourcingFirst';
import CrowdSourcingSecond from '../Screens/App/CrowdSourcing/CrowdSourcingSecond';
import CrowdSourcingThird from '../Screens/App/CrowdSourcing/CrowdSourcingThird';
import CrowdSourcingFourth from '../Screens/App/CrowdSourcing/CrowdSourcingFourth';
import ReviewFormInfo from '../Screens/App/CrowdSourcing/ReviewFormInfo';
import ThankYouCrowdSourcing from '../Screens/App/CrowdSourcing/ThankYouCrowdSourcing';
import FeedTabs from '../Screens/App/Feed/FeedTabs';
import FeedPost from '../Screens/App/Feed/FeedPost';
import CreatePost from '../Screens/App/Feed/CreatePost';
import FeedBack from '../Screens/App/FeedBack/FeedBack';
import MapsTypes from '../Screens/App/MapsTypes/MapsTypes';
import Map from '../Screens/App/Map/Map';
import Notification from '../Screens/App/Notification/Notification';
import DrawerNavigator from '../Screens/App/Navigations/DrawerNavigator';
import HydrometHazard from '../Screens/App/HydrometHazard/HydrometHazard';
import Profile from '../Screens/App/Profile/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import SplashScreen from 'react-native-splash-screen'



const {Navigator, Screen} = createNativeStackNavigator();

// useEffect(() => {
//   const Data = route.params;
//   setResponse(Data);
// }, []);

// const CheckUserVerifyStatus = () => {
//   return fetch('https://reactnative.dev/movies.json')
//     .then(response => response.json())
//     .then(json => {
//       return json.movies;
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };



const MainStackNavigator = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [userMpin, setUserMpin] = useState('');
  const [userName, setUserName] = useState('');
  const [initialRoute, setInitialRoute] = useState(AuthStack);
  const [feedid, setFeedId] = useState("")
  // const navigation = useNavigation();

  
  useEffect(() => {
    SplashScreen.hide();
    // getToken();
    // checkPermission();
    loginInfo()

    handler()
  });

  const handler = async () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      await setFeedId(remoteMessage.data.object_id)
      console.log('Message handled in the background FEED!', feedid);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
      // navigation.navigate("ForgotPassword");
    });

    // // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          // setInitialRoute("ForgotPassword")
        }
      });
  }

  const loginInfo = async () => {
    const userID = await AsyncStorage.getItem('loginID'); 
    setUserID(userID)
    const userMpin = await AsyncStorage.getItem('loginMpin'); 
    setUserMpin(userMpin)
    const userName = await AsyncStorage.getItem('loginUserName'); 
    setUserName(userName)
  }
  const AuthStack = () => (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Start" component={StartScreen} />
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Registration" component={RegistrationScreen} />
      <Screen name="Mpin" component={MpinScreen} />
      <Screen name="ForgotPassword" component={forgotPasswordScreen} />
      <Screen name="OTPVerification" component={OTPVerification} />
      <Screen name="SetNewPassword" component={SetNewPassword} />
      <Screen name="ThankYou" component={ThankYou} />
      <Screen name="Dashboard" component={AppStack} />
    </Navigator>
  );
  const AppStack = () => (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      
      <Screen name="MpinLogin" component={MpinLogin} />
      <Screen name="Dashboard" component={Dashboard}/>
      <Screen name="WeatherTypes" component={WeatherTypes} />
      <Screen name="StateUsers" component={StateUsers} />
      <Screen name="AddStateUser" component={AddStateUser} />
      <Screen name="StateUserInfo" component={StateUserInfo} />
      <Screen name="DisasterManagers" component={DisasterManagers} />
      <Screen name="AddDisasterManager" component={AddDisasterManager} />
      <Screen name="DisasterManagerInfo" component={DisasterManagerInfo} />
      <Screen name="VerificationRequests" component={VerificationRequests} />
      <Screen
        name="VerificationRequestInfo"
        component={VerificationRequestInfo}
      />
      <Screen name="CrowdSourcingFirst" component={CrowdSourcingFirst} />
      <Screen name="CrowdSourcingSecond" component={CrowdSourcingSecond} />
      <Screen name="CrowdSourcingThird" component={CrowdSourcingThird} />
      <Screen name="CrowdSourcingFourth" component={CrowdSourcingFourth} />
      <Screen name="ReviewFormInfo" component={ReviewFormInfo} />
      <Screen name="ThankYouCrowdSourcing" component={ThankYouCrowdSourcing} />
      <Screen name="FeedTabs" component={FeedTabs} />
      <Screen name="FeedPost" component={FeedPost} />
      <Screen name="CreatePost" component={CreatePost} />
      <Screen name="FeedBack" component={FeedBack} />
      <Screen name="Profile" component={Profile} />
      <Screen name="MapsTypes" component={MapsTypes} />
      <Screen name="Map" component={DrawerNavigator} />
      <Screen name="HydrometHazard" component={HydrometHazard} />
      <Screen name="OTPVerification" component={OTPVerification} />
      <Screen name="SetNewPassword" component={SetNewPassword} />
      <Screen name="AuthStack" component={AuthStack} />
      <Screen name="Notification" component={Notification} />
    </Navigator>
  );
  // if (!loaded) {
  //   return null;
  // }
  if (!userID) {
    return (
      <NavigationContainer>
        <AuthStack />
        {/* <AppStack/> */}
      </NavigationContainer>
    );
  }else if(feedid && userID){
    return (
      <NavigationContainer initialRoute={"Notification"}>
        <AppStack />
      </NavigationContainer>
    );
  }
  else{
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  }
}
// if (!user) {
//   return (
//     <NavigationContainer>
//       <AuthStack />
//     </NavigationContainer>
//   );
// }

// return (
//   <NavigationContainer>
//     <AppStack />
//   </NavigationContainer>
// );
export default MainStackNavigator;
