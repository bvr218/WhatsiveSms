import { NativeModules, ToastAndroid } from 'react-native';
import BackgroundJob from 'react-native-background-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { functions as fc } from '../request/request';
const {DirectSms} = NativeModules;


const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
let setIsRunning;

const sendMessages = async (taskData) => {
    const { delay } = taskData;
    let sms = await AsyncStorage.getItem("sms");
    sms = JSON.parse(sms);
    
    if(sms?.length==0 || sms == undefined || sms== null){
        if(BackgroundJob.isRunning()){
            try {
                await AsyncStorage.removeItem("sms");
            } catch (error) {
                return false;
            }
            ToastAndroid.show('Todos los mensajes fueron enviados correctamente', ToastAndroid.SHORT);
            return false;
        }
    }else{

        await BackgroundJob.updateNotification({taskIcon:{name:"box",type:"mipmap"}, taskName:"Send",taskTitle:"Enviando Mensajes",taskDesc:"El sistema esta enviando mensajes",progressBar:{max:sms.length,value:0,indeterminate:false}});
        let other = sms.slice();
        for (let i = 0; i<sms.length; i++) {
            await BackgroundJob.updateNotification({taskIcon:{name:i%2==0?("delivery"):("box"),type:"mipmap"},progressBar:{max:sms.length,value:i+1,indeterminate:false}});
            const element = sms[i];
            other.splice(i, 1);

            DirectSms.sendDirectSms(element.number,element.sms);

            await fc.markSend(element.id);
            await AsyncStorage.setItem("sms",JSON.stringify(other));
            await sleep(delay);
        }
    }
    
    BackgroundJob.updateNotification(options);
    await AsyncStorage.removeItem("sms");
    ToastAndroid.show('Todos los mensajes fueron enviados correctamente', ToastAndroid.SHORT);
    return true;

};

const cargarMensajes = async ()=>{
    let salida = await fc.getMessages();
    let mensajes;
    if(salida.salida == "exito"){
      if(salida.response.salida == "exito"){
        AsyncStorage.removeItem("sms");
        mensajes = salida.response.sms;
        AsyncStorage.setItem("sms",JSON.stringify(mensajes));
      }
    }else{
        setIsRunning(false);
        ToastAndroid.show('Error de conexion, se cerro el trabajo de fondo', ToastAndroid.SHORT);
        await BackgroundJob.stop();
    }
    return mensajes.length;
}

const SearchSms = async (taskData) => {
    while(BackgroundJob.isRunning()){
        let mensajes =  await cargarMensajes();
        if(mensajes > 0){
            await sendMessages(taskData);
            BackgroundJob.updateNotification({progressBar:{},taskTitle:"El sistema esta buscando mensajes",taskIcon:{name:"check_box",type:"mipmap"},color:"#ffffffff"});
        }
        await sleep(5000); 
    }
    return true;
}

const options = {
    taskName: 'SearchSms',
    taskTitle: 'Buscando mensajes',
    taskDesc: 'El sistema esta buscando mensajes',
    taskIcon: {
        name: 'check_box',
        type: 'mipmap',
    },
    color: '#ffffff',
    allowExecutionInForeground: true,
    progressBar:{},
    linkingURI: 'whatsive://homescreen',
    parameters: {
        delay: 500,
    },
};

export const functions= {
    initJob:async function(setIs){
        setIsRunning = setIs;
        await BackgroundJob.start(SearchSms, options);
    },
    stopJob:async function(){
        await BackgroundJob.stop();
    }
}


