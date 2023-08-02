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
        
        if(sms?.length==0 || sms == undefined || sms== null){
            if(BackgroundJob.isRunning()){
                try {
                    await AsyncStorage.removeItem("sms");
                } catch (error) {
                }
                setIsRunning(false);
                await BackgroundJob.stop();
                ToastAndroid.show('Todos los mensajes fueron enviados correctamente', ToastAndroid.SHORT);
            }
        }else{

            await BackgroundJob.updateNotification({taskIcon:{name:"box",type:"mipmap"}, taskName:"Send",taskTitle:"Enviando Mensajes",taskDesc:"El sistema esta enviando mensajes",progressBar:{max:sms.length,value:0,indeterminate:false}});
            let other = sms.slice();
            for (let i = 0; BackgroundJob.isRunning(); i++) {
                await BackgroundJob.updateNotification({taskIcon:{name:i%2==0?("delivery"):("box"),type:"mipmap"},progressBar:{max:sms.length,value:i,indeterminate:false}});

                const element = sms[i];
                other.splice(i, 1);
    
                DirectSms.sendDirectSms(element.number,element.sms);
    
                await fc.markSend(element.id);
                await AsyncStorage.setItem("sms",JSON.stringify(other));
                await sleep(delay);
    
                if(i+1 == sms.length){
                    BackgroundJob.updateNotification(options);
                    await AsyncStorage.removeItem("sms");
                    setIsRunning(false);
                    await BackgroundJob.stop();
                    ToastAndroid.show('Todos los mensajes fueron enviados correctamente', ToastAndroid.SHORT);
                }
            }
        }
        
        
    });
};

const options = {
    taskName: 'SearchSms',
    taskTitle: 'Listo',
    taskDesc: 'El sistema esta listo para enviar mensajes',
    taskIcon: {
        name: 'check_box',
        type: 'mipmap',
    },
    color: '#ffffff',
    linkingURI: 'whatsive://homescreen',
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


