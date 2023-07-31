import React,{ useContext } from "react";
import {functions as fc} from "../../task/setTask";
import { View, Image, ToastAndroid } from 'react-native';
import { Button } from '@rneui/themed';
import { Context } from '../context/Context';

export default function StartToSend(){ 
    const { isRunning, setIsRunning, isReady } = useContext(Context);
    const handlePress = ()=>{
        if(!isRunning){
            ToastAndroid.show('Enviando mensajes en segundo plano', ToastAndroid.SHORT);
            fc.initJob(setIsRunning);
        }
        else{
            ToastAndroid.show('Mensajes en segundo plano detenidos', ToastAndroid.SHORT);
            fc.stopJob();
        }
        setIsRunning(!isRunning);
    }
    return(<View>
            <Button onPress={handlePress} disabled={!isReady} color={!isRunning?("success"):("error")} icon={!isRunning?(<Image
                                                                                style={{width:20, height:20}}
                                                                                source={require('../../public/shutdown.png')}
                                                                                />):(<Image
                                                                                    style={{width:20, height:20}}
                                                                                    source={require('../../public/shutdownS.png')}
                                                                                />)
              } >
            </Button>
    </View>);
}