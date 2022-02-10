import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import reducers from './src/Redux/Reducer/MainReducer';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import MainStackNavigator from './src/Navigation/MainStackNavigator';
import {createStore, applyMiddleware} from 'redux';

const middleWare = applyMiddleware(thunkMiddleware);

const store = createStore(reducers, middleWare);


const {Navigator, Screen} = createNativeStackNavigator();

function App() {
    return (
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
    );
  // }
  // return (
  //   <NavigationContainer>
  //     <AppStack />
  //   </NavigationContainer>
  // );
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
export default App;
