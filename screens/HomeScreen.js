import React,{useEffect, useContext} from 'react';
import { View, Text, useColorScheme, ScrollView } from 'react-native';
import ViewNetwork  from './navigation/ViewNetwork';
import { Context } from './context/Context';
import ModalI from './modals/ModalCharging';
import InfoSend from './navigation/InfoSend';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';








function HomeScreen({ navigation }) {
  const { setIsReady, setIsRunning, less, setLess } = useContext(Context);
  useEffect(()=>{
    ViewNetwork(setIsReady,setIsRunning,setLess,navigation);
  },[])

  

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? Colors.darker : Colors.lighter,

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
          <Text style={{fontSize:15}}>2.Una vez este configurada la instancia, se habilitara el boton e la esquina superior derecha, solo habilitelo y el sistema seguira el proceso en automatico y en segundo plano.</Text>
          {/* <Button onPress={cargarMensajes} title={"Cargar mensajes"} containerStyle={{alignItems:"center", marginTop:20}} buttonStyle={{width:200}}></Button> */}
        </View>
        <View style={{marginTop:15, marginHorizontal:10}}>
          <Text style={{fontSize:15}}>Nota: para un mejor funcionamiento deshabilite el ahorro de bateria de esta app.</Text>
          <Text style={{fontSize:15}}>Recuerda registrarte en https://api.whatsive.com para obtener los datos de su instancia.</Text>
        </View>
        <InfoSend/>
        <View style={{alignItems:"center", justifyContent:"center"}}>
          {less<10?(<Text style={{fontSize:16, marginTop:60}}>La instancia vence en: <Text style={{color:"red"}}>{less}</Text> dias</Text>):(<></>)}
          

        </View>
      </View>
      <ModalI/>
    </ScrollView>
  );
}

export default HomeScreen;
