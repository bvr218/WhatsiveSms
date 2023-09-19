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
    apiKey: "AIzaSyBBmJinEnmxh2QyMzanQT-EgSx2Xu5HBec",
    authDomain: "gleaming-design-350716.firebaseapp.com",
    projectId: "gleaming-design-350716",
    storageBucket: "gleaming-design-350716.appspot.com",
    messagingSenderId: "429162633258",
    appId: "1:429162633258:android:feaa9cc8e812a41ed34b53",
    databaseURL: 'https://gleaming-design-350716-default-rtdb.firebaseio.com/'
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
