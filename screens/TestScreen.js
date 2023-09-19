import { useState, useEffect, useRef, useContext } from 'react';
import { Context } from './context/Context';
import styles from './styles/HomeScreenStyles';

import { View, Text,NativeModules, TouchableOpacity, TextInput, ScrollView, ToastAndroid, useColorScheme } from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
const {DirectSms} = NativeModules;

function TestScreen() {
  const [linkUrl, setLinkUrl] = useState("");
  const { token, id, isReady } = useContext(Context);
  const [body, setBody] = useState("{mensaje}");
  const [destinatario, setDestinatario] = useState("{destinatario]");
  const isDarkMode = useColorScheme() === 'dark';



  const enviarMensaje = async () => {
    if(isNaN(destinatario)){
      ToastAndroid.show("El destinatario no es valido",ToastAndroid.LONG);
      return;
    }
    if(destinatario>6){ 
      try {
        
        DirectSms.sendDirectSms(destinatario,body);
        ToastAndroid.show("Mensaje enviado",ToastAndroid.LONG);
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Error enviando el mensaje",ToastAndroid.LONG);
      }
    }else
    {
      ToastAndroid.show("El destinatario es muy corto",ToastAndroid.LONG);
    }
  }

  const handleChangeText = () =>{
    setLinkUrl(`https://api.whatsive.com/api/v1/sendMessage/?token=${token}&id=${id}&recipient=${destinatario}&type=sms&body=${body}`);
  }

  useEffect(()=>{
    setLinkUrl(`https://api.whatsive.com/api/v1/sendMessage/?token=${token}&id=${id}&recipient=${destinatario}&type=sms&body=${body}`);
  });

  return (
    <ScrollView style={{paddingHorizontal:10}}>
      <Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter, fontSize:25, marginTop:20}}>Probar envio de mensajes</Text>
      
      <View style={{marginTop:15, marginHorizontal:10}}>
          <Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter,fontSize:15}}>Cambie los datos abajo para ver ejemplos reales de peticion, le sugerimos usar el indicativo de pais (57 para Colombia)</Text>
      </View>
      <View style={{justifyContent: 'center',alignItems: 'center'}}>

          <View style={styles.containerInputs}>
            <View accessible={true}  style={styles.containerDatos}>
              <TextInput
                style={styles.input}
                value={destinatario}
                accessibilityLabel="destinatario de prueba"
                onChangeText={(text)=>{setDestinatario(text.replace(/[^0-9]/g, ''))}}
              />
            </View>
            <View accessible={true} accessibilityLabel="Editar aidi" style={styles.containerDatos}>
              <TextInput
                style={styles.input}
                value={body}
                accessibilityLabel="mensaje de prueba"
                onChangeText={(text)=>{setBody(text)}}
              />
            </View>
          </View>
        </View>
      <View>
        <View style={{marginTop:0, marginHorizontal:10, backgroundColor:"gray"}}>
          <TextInput multiline onChangeText={handleChangeText} selectTextOnFocus={true} value={linkUrl} style={{color: !isDarkMode ? Colors.darker : Colors.lighter,fontSize:15}}></TextInput>
        </View>
        <View style={{alignItems: 'center', marginTop:10}}>
              <TouchableOpacity
                style={styles.Button3}
                disabled={!isReady}
                onPress={enviarMensaje}
                ><Text style={{color: !isDarkMode ? "white" : "white",marginLeft:6, marginTop:2}}>Probar envio de mensaje</Text></TouchableOpacity>
            </View>
      </View>
      
    </ScrollView>
  );
}

export default TestScreen;
