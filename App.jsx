import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from "react-native";
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

  

  return (
    <MyContextProvider>
      <NavigationContainer theme={theme}>
        <TabBar />
      </NavigationContainer>
    </MyContextProvider>
  );
}

export default App;
