import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from "react-native";
import BackgroundJob from 'react-native-background-actions';
import TabBar from './screens/navigation/TabBar';
import { MyContextProvider } from './screens/context/Context';
 
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App() {
  

  const isDarkMode = useColorScheme() === 'dark';
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'dodgerblue',
      background: isDarkMode ? Colors.darker : Colors.lighter,
    },
  };


  useEffect(()=>{
    init();
  },[])


  const init = async ()=>{
    await BackgroundJob.start(async ()=>{console.log("ready")}, options);
    await BackgroundJob.stop();
  }

  const options = {
      taskName: 'SearchSms',
      taskTitle: 'Listo',
      taskDesc: 'El sistema esta listo para enviar mensajes',
      taskIcon: {
          name: 'check_box',
          type: 'mipmap',
      },
      color: '#ffffff',
      linkingURI: 'whatsive://homescreen',
      parameters: {
          delay: 500,
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

export default App;
