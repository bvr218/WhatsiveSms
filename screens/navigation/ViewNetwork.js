import AsyncStorage from '@react-native-async-storage/async-storage';
import { functions as fc } from "../../request/request";
import { ToastAndroid, Alert } from 'react-native';
import moment from 'moment';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default async function ViewNetwork(setIsReady, setIsRunning, setLess,setType ,navigation, setToken, setId){

    const result = await check(PERMISSIONS.ANDROID.SEND_SMS);
    let permisos = result === RESULTS.GRANTED;
    let port = await AsyncStorage.getItem('port');
    let key = await  AsyncStorage.getItem('key');
    if((port==null || port==undefined) || (key==null || key==undefined)){
        const uniqueId = Date.now().toString();
        const randomNumber = Math.floor(Math.random() * Math.pow(10, 5));

        port = ''+randomNumber+'';
        key = ''+uniqueId+'';
        AsyncStorage.setItem("port",port);
        AsyncStorage.setItem("key",key);
    }
    setId(port);
    setToken(key);

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
            fc.validaInstancia(port,key).then(async (request)=>{
                if(request.salida=="error"){
                    ToastAndroid.show('No hay conexión a internet', ToastAndroid.SHORT);
                    setIsReady(false);
                    
                    setIsRunning(false);
            
                }else{
                    setType(request.response.tipo);
                    if(request.response.salida == "exito"){
                        setIsReady(true);
                        const today = moment();
                        const expiration = moment(request.response.vencimiento, "YYYY-MM-DD HH:mm:ss");
                        const daysDifference = expiration.diff(today, 'days');
                        if(request.response.tipo == "prueba"){
                            setLess(100-request.response.enviados);
                        }else{
                            setLess(daysDifference)
                        }
                    }else{
                        ToastAndroid.show(request.response.message, ToastAndroid.SHORT);
                        setIsReady(false);
                        
                        setIsRunning(false);
                    }
                }
            });
        }
    } 
    
    
      
    return true;
}