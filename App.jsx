import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from "react-native";
import TabBar from './screens/navigation/TabBar';
import firebase from '@react-native-firebase/app';
import { withIAPContext } from 'react-native-iap';
import { MyContextProvider } from './screens/context/Context';
 
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {

  const firebaseConfig = {
    apiKey: "{apikey}",
    authDomain: "{authdomain}",
    projectId: "{projectid}",
    storageBucket: "{storageBucket}",
    messagingSenderId: "{messaginSenderId}",
    appId: "{appId}",
    databaseURL: '{databaseUrl}'
  };
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }



  useEffect(()=>{
  },[])  

  const isDarkMode = useColorScheme() === 'dark';
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'dodgerblue',
      background: isDarkMode ? Colors.darker : Colors.lighter,
    },
  };
  return (
    <MyContextProvider>
      <NavigationContainer theme={theme}>
        <TabBar />
      </NavigationContainer>
    </MyContextProvider>
  );
}

export default withIAPContext(App);
