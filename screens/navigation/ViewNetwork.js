import AsyncStorage from '@react-native-async-storage/async-storage';
import { functions as fc } from "../../request/request";
import { ToastAndroid, Alert } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default async function ViewNetwork(setIsReady, setIsRunning,navigation){

    const result = await check(PERMISSIONS.ANDROID.SEND_SMS);
    let permisos = result === RESULTS.GRANTED;
    let port = await AsyncStorage.getItem('port');
    let key = await  AsyncStorage.getItem('key');
    if(!permisos){
        setIsReady(false);
        setIsRunning(false);
        Alert.alert(
            'Sin permisos',
            'No tenemos permiso para enviar mensajes, configura los permisos primero.',
            [
              { text: 'Ir a configuracion', onPress: ()=> navigation.navigate("Detail") }
            ],
            { cancelable: false }
        );
        
    }else{
        if((port==null || port==undefined) || (key==null || key==undefined)){
            ToastAndroid.show('No ha configurado el id o el token de istancia', ToastAndroid.SHORT);
            setIsReady(false);
            setIsRunning(false);

        }else{
            fc.validaInstancia(port,key).then((request)=>{
                if(request.salida=="error"){
                    ToastAndroid.show('No hay conexión a internet', ToastAndroid.SHORT);
                    setIsReady(false);
                    setIsRunning(false);
            
                }else{
                    if(request.response.salida == "exito"){
                        setIsReady(true);
                    }else{
                        ToastAndroid.show('Error de isntancia: '+request.response.message, ToastAndroid.SHORT);
                        setIsReady(false);
                        setIsRunning(false);
                    }
                }
            });
        }
    } 
    
    
      
    return true;
}