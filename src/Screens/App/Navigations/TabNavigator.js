import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserRating from "../App/UserRating";
import News from "../App/News";
import Profile from "../App/Profile";
import { Image } from 'react-native';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarItemStyle: {marginTop: 8}}} >
      <Tab.Screen 
        name="UserRating" 
        component={UserRating}
        options={{
          tabBarLabel: 'Ranking',
          tabBarActiveTintColor: '#000',
          activeTintColor: '#000',
          inactiveTintColor: '#E5E5E5',
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={
                focused 
                ? require("../../Images/Trophi.png")
                : require("../../Images/Trophi-Gray.png")}
                style={{width: 28, height: 25}} />
          ),
        }}
      />
      <Tab.Screen 
        name="News" 
        component={News}
        options={{
          tabBarLabel: 'News',
          activeTintColor: '#000',
          inactiveTintColor: '#E5E5E5',
          tabBarActiveTintColor: '#000',
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={
                focused 
                ? require("../../Images/News.png")
                : require("../../Images/News-Gray.png")}
                style={{width: 28, height: 25}} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        
        options={{
          tabBarLabel: 'Profile',
          activeTintColor: '#000',
          inactiveTintColor: '#E5E5E5',
          tabBarActiveTintColor: '#000',
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={
                focused 
                ? require("../../Images/User.png")
                : require("../../Images/User-Gray.png")}
                style={{width: 28, height: 25}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;