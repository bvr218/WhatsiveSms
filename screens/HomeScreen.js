import React,{useEffect, useContext} from 'react';
import { View, Text, useColorScheme, ScrollView,ToastAndroid, Linking  } from 'react-native';
import { Button } from '@rneui/themed';
import ViewNetwork  from './navigation/ViewNetwork';
import { Context } from './context/Context';
import ModalI from './modals/ModalCharging';
import InfoSend from './navigation/InfoSend';
import { functions as fc } from '../request/request'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';



const configureLinkingURI = async () => {
  const linkingURI = 'whatsapp://';

  const isSupported = await Linking.canOpenURL(linkingURI);

  if (isSupported) {
    Linking.addEventListener('url', handleDeepLink);
  } else {
    console.log(`El enlace URI ${linkingURI} no es compatible en este dispositivo.`);
  }
};

const handleDeepLink = (event) => {
  const url = event.url;
  console.log('URI abierto:', url);
};




function HomeScreen({ navigation }) {
  const { setIsReady, setIsRunning, setIsLoading } = useContext(Context);
  useEffect(()=>{
    ViewNetwork(setIsReady,setIsRunning,navigation);
    configureLinkingURI();
    return () => {
      // Eliminar la suscripción al desmontar el componente
      Linking.removeEventListener('url', handleDeepLink);
    };
  },[])

  const cargarMensajes = async ()=>{
    setIsLoading(true);
    let salida = await fc.getMessages();
    if(salida.salida == "exito"){
      if(salida.response.salida == "exito"){
        AsyncStorage.removeItem("sms");
        let mensajes = salida.response.sms;
        AsyncStorage.setItem("sms",JSON.stringify(mensajes));
        setIsLoading(false);
        ToastAndroid.show('Mensajes cargados correctamente', ToastAndroid.SHORT);
      }else{
        setIsLoading(false);
        ToastAndroid.show('Error al cargar los mensajes', ToastAndroid.SHORT);
      }
    }else{
      setIsLoading(false);
      ToastAndroid.show('Error de conexión a internet', ToastAndroid.SHORT);
    }
  }

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    alignItems: 'center',
  };
  return (
    <ScrollView>
      <View>

        <View style={backgroundStyle}>
          <Text style={{fontSize:25, marginTop:20}}>Bienvenido a WHATSIVE</Text>
        </View>
        <View style={{marginTop:20, marginHorizontal:10}}>
          <Text style={{fontSize:15}}>Desde aqui usted podrá enviar mensajes desde su telefono usandolo como api, para hacerlo siga estos pasos:</Text>
        </View>
        <View style={{marginTop:20, marginHorizontal:20}}>
          <Text style={{fontSize:15}}>1.Si no lo ha hecho, configure la instancia.</Text>
        </View>
        <View style={{marginTop:15, marginHorizontal:20}}>
          <Text style={{fontSize:15}}>2.Cargue los mensajes haciendo click en el boton.</Text>
          <Button onPress={cargarMensajes} title={"Cargar mensajes"} containerStyle={{alignItems:"center", marginTop:20}} buttonStyle={{width:200}}></Button>
        </View>
        <View style={{marginTop:15, marginHorizontal:20}}>
          <Text style={{fontSize:15}}>3.Cuando la carga haya terminado haga click verde en el boton ubicado a la derecha del titulo, una vez presionado el boton iniciara la tarea de enviar mensajes puede salirse o permanecer en la app si quiere.</Text>
        </View>
        <InfoSend/>
      </View>
      <ModalI/>
    </ScrollView>
  );
}

export default HomeScreen;
