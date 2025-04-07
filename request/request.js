import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const functions = {
    validaInstancia: async function(port,token){
        try {
            const response = await axios.get(
              "https://mikrotisp.net/WhatispSMS/?action=getInstancia&token="+token+"&id="+port
            );
            return {salida:"exito",response:response.data};
        } catch (error) {
            console.log(error);
            return {salida:"error"};
        }
    },
    getMessages: async function(){
        let port = await AsyncStorage.getItem('port'); 
        let token = await AsyncStorage.getItem('key'); 
        try {
            const response = await axios.get(
                "https://mikrotisp.net/WhatispSMS/?action=getMessages&token="+token+"&id="+port
              );
              return {salida:"exito",response:response.data};
        } catch(error){
            console.log(error);
            return {salida:"error"};
        }
    },
    countSendsSms: async function(){
        let port = await AsyncStorage.getItem('port'); 
        let token = await AsyncStorage.getItem('key'); 
        try {
            const response = await axios.get(
                "https://mikrotisp.net/WhatispSMS/?action=countSendsSms&token="+token+"&id="+port
              );
              return {salida:"exito",response:response.data};
        } catch(error){
            console.log(error);
            return {salida:"error"};
        }
    },
    countWaitSms: async function(){
        let port = await AsyncStorage.getItem('port'); 
        let token = await AsyncStorage.getItem('key'); 
        try {
            const response = await axios.get(
                "https://mikrotisp.net/WhatispSMS/?action=countWaitSms&token="+token+"&id="+port
              );
              return {salida:"exito",response:response.data};
        } catch(error){
            console.log(error);
            return {salida:"error"};
        }
    },
    markSend: async function(id){
        let port = await AsyncStorage.getItem('port'); 
        let token = await AsyncStorage.getItem('key'); 
        try {
            const response = await axios.get(
                "https://mikrotisp.net/WhatispSMS/?action=markSend&token="+token+"&id="+port+"&idM="+id
              );
              return {salida:"exito",response:response.data};
        } catch(error){
            console.log(error);
            return {salida:"error"};
        }
    },

    addMonth: async function(){
        let port = await AsyncStorage.getItem('port'); 
        let token = await AsyncStorage.getItem('key'); 
        try {
            const response = await axios.get(
                "https://mikrotisp.net/WhatispSMS/?action=addMonth&token="+token+"&id="+port
              );
              return {salida:"exito",response:response.data};
        } catch(error){
            return {salida:"error"};
        }
    }

}