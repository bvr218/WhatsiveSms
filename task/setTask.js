import { NativeModules, ToastAndroid } from 'react-native';
import BackgroundJob from 'react-native-background-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { functions as fc } from '../request/request';
const {DirectSms} = NativeModules;


const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
let setIsRunning;

const taskRandom = async (taskData) => {
    await new Promise(async (resolve) => {
        const { delay } = taskData;
        let sms = await AsyncStorage.getItem("sms");
        sms = JSON.parse(sms);
        let other = sms.slice();
        options.taskName = "Send";
        options.taskTitle = "Enviando Mensajes";
        options.taskDesc = "El sistema esta enviando mensajes";
        options.progressBar = {
            max:sms.length,
            value:0,
            indeterminate:false
        };
        for (let i = 0; BackgroundJob.isRunning(); i++) {
            const element = sms[i];
            other.splice(i, 1);

            DirectSms.sendDirectSms(element.number,element.sms);

            await fc.markSend(element.id);
            await AsyncStorage.setItem("sms",JSON.stringify(other));
            await sleep(delay);

            if(i+1 == sms.length){
                await AsyncStorage.removeItem("sms");
                setIsRunning(false);
                await BackgroundJob.stop();
                ToastAndroid.show('Todos los mensajes fueron enviados correctamente', ToastAndroid.SHORT);
            }
        }
        
    });
};

const options = {
    taskName: 'SearchSms',
    taskTitle: 'Buscando mensajes',
    taskDesc: 'El sistema esta buscando mesajes',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        delay: 500,
    },
};

export const functions= {
    initJob:async function(setIs){
        setIsRunning = setIs;
        await BackgroundJob.start(taskRandom, options);
    },
    stopJob:async function(){
        await BackgroundJob.stop();
    }
}


