import React from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, useColorScheme } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeScreen from '../HomeScreen';
import DetailScreen from '../DetailScreen';
import  StartToSend  from "./StartToSend";
import TestScreen from "../TestScreen";

export default function Navbar(){
    const windowDimensions = useWindowDimensions();
    const isPortrait = windowDimensions.height > windowDimensions.width;
    const Tab = createBottomTabNavigator();

    function LogoTitle() {
        return (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../../public/logo.png')}
            />
            <Text style={styles.text}>MikrotispSms</Text>
          </View>
        );
    }
    const isDarkMode = useColorScheme() === 'dark';
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#111111',
                },
                tabBarStyle: { backgroundColor: '#2bb741' }, 
                tabBarActiveBackgroundColor: '#15952b', 
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarIcon: ({ focused }) => {
                    let iconSource;
                    if (route.name === 'Home') {
                      iconSource = focused
                        ? require('../../public/black_home.png')
                        : require('../../public/white_home.png');
                    } else if (route.name === 'Detail') {
                      iconSource = focused
                        ? require('../../public/black_config.png')
                        : require('../../public/white_config.png');
                    }else if (route.name === 'Test') {
                      iconSource = focused
                        ? require('../../public/chemical-black.png')
                        : require('../../public/chemical-white.png');
                    }
                    return <Image source={iconSource} style={{ width: 30, height: 30 }} />;
                }
            })}
        >
            <Tab.Screen name="Home" options={{ title: ()=>{return(<Text style={{color: !isDarkMode ? "#000000" : "white", fontWeight: 'bold'}}>{isPortrait?("Inicio"):("")}</Text>)} , headerTitle: (props) => <LogoTitle {...props} />,headerRight:() => <StartToSend/>, }} component={HomeScreen} />
            <Tab.Screen name="Test" options={{title: ()=>{return(<Text style={{color: !isDarkMode ? "#000000" : "white",fontWeight: 'bold'}}>{isPortrait?("Probar"):("")}</Text>)} , headerTitle: (props) => <LogoTitle {...props} /> }} component={TestScreen} />
            <Tab.Screen name="Detail" options={{title: ()=>{return(<Text style={{color: !isDarkMode ? "#000000" : "white",fontWeight: 'bold'}}>{isPortrait?("Configuración"):("")}</Text>)} , headerTitle: (props) => <LogoTitle {...props} /> }} component={DetailScreen} />
        </Tab.Navigator>
    ); 
}

const styles = StyleSheet.create({
    container: {
      position: 'relative', // Importante establecer esto para que los elementos se superpongan correctamente
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 50,
      height: 50,
      position: 'absolute', // Posiciona la imagen de manera absoluta
      top: -25,
      left:-5
    },
    text: {
      position: 'absolute', // Posiciona el texto de manera absoluta
      top: -10, // Ajusta la posición vertical del texto para superponerlo a la imagen
      fontSize: 16,
      left:50,
      fontWeight: 'bold',
      color:'white'
    },
  });