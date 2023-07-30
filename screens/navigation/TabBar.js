import React from "react";
import { Text, View, Image, StyleSheet, useColorScheme, useWindowDimensions } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeScreen from '../HomeScreen';
import DetailScreen from '../DetailScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function Navbar(){
    const windowDimensions = useWindowDimensions();
    const isPortrait = windowDimensions.height > windowDimensions.width;
    const Tab = createBottomTabNavigator();
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    function LogoTitle() {
        return (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../../public/logo.png')}
            />
            <Text style={styles.text}>Whatsive Api</Text>
          </View>
        );
    }

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
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;
                    if (route.name === 'Home') {
                      iconSource = focused
                        ? require('../../public/black_home.png')
                        : require('../../public/white_home.png');
                    } else if (route.name === 'Detail') {
                      iconSource = focused
                        ? require('../../public/black_config.png')
                        : require('../../public/white_config.png');
                    }
                    return <Image source={iconSource} style={{ width: 30, height: 30 }} />;
                }
            })}
        >
            <Tab.Screen name="Home" options={{ title: ()=>{return(<Text style={{fontWeight: 'bold'}}>{isPortrait?("Inicio"):("")}</Text>)} , headerTitle: (props) => <LogoTitle {...props} /> }} component={HomeScreen} />
            <Tab.Screen name="Detail" options={{title: ()=>{return(<Text style={{fontWeight: 'bold'}}>{isPortrait?("Configuración"):("")}</Text>)} , headerTitle: (props) => <LogoTitle {...props} /> }} component={DetailScreen} />
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