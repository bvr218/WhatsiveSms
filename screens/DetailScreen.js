import { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, ToastAndroid  } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/DetailScreenStyle';
import ModalI from './modals/ModalCharging';
import { functions as fc } from "../request/request";
import { Context } from './context/Context';


function DetailScreen() {
  const [port,setPort] = useState("");
  const [key,setKey] = useState("");
  const IdInput = useRef(null);
  const TokenInput = useRef(null);
  const { setIsLoading, setIsReady } = useContext(Context);

  useEffect(()=>{
    AsyncStorage.getItem('port').then((value) => {
      setPort(value)
    });
    AsyncStorage.getItem('key').then((value) => {
      setKey(value)
    });
  },[])
  const saveChanges = async ()=>{
    setIsLoading(true);
    
    if(port !="" && key != "" && port !=null && key != null && port !=undefined && key != undefined){
      let request = await fc.validaInstancia(port,key);
      setIsLoading(false);
      if(request.salida=="error"){
        Alert.alert(
          'Error de conexión',
          'No pudimos conectarnos a la red, verifica tu conexion a internet y vuelve a intentarlo.',
          [
            { text: 'Aceptar', onPress: ()=>{} },
          ],
          { cancelable: true }
        );
      }else{
        if(request.response.salida == "exito"){
          AsyncStorage.setItem('port', port);
          AsyncStorage.setItem('key', key);
          setIsReady(true);
          ToastAndroid.show('Datos guardados correctamente', ToastAndroid.SHORT);
        }else{
          Alert.alert(
            'Datos invalidos',
            request.response.message,
            [
              { text: 'Aceptar', onPress: ()=>{} },
            ],
            { cancelable: true }
          );
        }
      }
    }else{
      setIsLoading(false);
      if(!port){
        IdInput.current.focus();
      }else{
        if(key){
          TokenInput.current.focus();
        }
      }
      ToastAndroid.show('Rellena todos los datos', ToastAndroid.SHORT);
    }
  }
  const revisarPermisos = async ()=>{
    try {
      const result = await check(PERMISSIONS.ANDROID.SEND_SMS);
      if(result === RESULTS.GRANTED){
        ToastAndroid.show('Los permisos ya estan listos, continua con el paso 2.', ToastAndroid.SHORT);
      }else{
        Alert.alert(
          'Sin permisos',
          'Aun no estamos listos para enviar mensajes, presiona aceptar y configura los permisos.',
          [
            { text: 'Aceptar', onPress: solicitarPermisos },
            { text: 'Cancelar', onPress: ()=>{} },
          ],
          { cancelable: true }
        );
      }
    } catch (error) {
      console.warn('Error al verificar permisos:', error);
    }
  }
  const solicitarPermisos = async ()=>{
    try {
      const result = await request(PERMISSIONS.ANDROID.SEND_SMS);
      if(result === RESULTS.GRANTED){
        ToastAndroid.show('Permiso para enviar SMS concedido', ToastAndroid.SHORT);
      }else{
        solicitarPermisos()
      }
    } catch (error) {
      console.warn('Error al solicitar permisos:', error);
    }
  }
  const handleChangePort = (port)=>{
    setPort(port);
  }
  const handleChangeToken = (port)=>{
    setKey(port);
  }

  return (
    <ScrollView style={{paddingHorizontal:10}}>
      <View>
        <Text style={styles.Title}>Pasos para instalar:</Text>
        <Text style={styles.SubTitle}>Para poder hacer uso de esta Api hemos organizado para usted estos sencillos pasos:</Text>
        <Text>1.Permitale a la app enviar mensajes de texto. por su seguridad solo solicitamos permisos de envio, no de lectura.</Text>
        <Text style={styles.SubTitle1}>-Para hacerlo haga click en el siguiente boton</Text>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
          style={styles.Button}
          onPress={revisarPermisos}
          ><Text style={{marginLeft:6}}>Habilitar permisos</Text></TouchableOpacity>
        </View>
        <Text>2.Ingrese los datos de su instancia, recuerde que para poder acceder a este beneficio su instancia debe ser de pago.</Text>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
          <View style={styles.containerInputs}>
            <View accessible={true} accessibilityLabel="Doble click para editar el aidi de la instancia" style={styles.containerDatos}>
              <Text style={{width:70,top:10}}>ID:</Text>
              <TextInput
                style={styles.input}
                ref={IdInput}
                onChangeText={handleChangePort}
                value={port}
              />
            </View>
            <View accessible={true} accessibilityLabel="Doble click para editar el token de la instancia" style={styles.containerDatos}>
              <Text style={{width:70,top:10}}>Token:</Text>
              <TextInput
                style={styles.input}
                ref={TokenInput}
                onChangeText={handleChangeToken}
                value={key}
              />
            </View>
            <View style={{alignItems: 'center', left:-14, marginTop:10}}>
              <TouchableOpacity
                style={styles.Button}
                onPress={saveChanges}
                ><Text style={{marginLeft:6}}>Guardar Cambios</Text></TouchableOpacity>
            </View>
          </View>
        </View>
        <Text>Haga click en guardar una vez haya realizado los cambios, si la informacion es correcta, puede volver a inicio.</Text>
      </View>
      <ModalI/>
    </ScrollView>
  );
}

export default DetailScreen;
