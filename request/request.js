import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const functions = {
    validaInstancia: async function(port,token){
        try {
            const response = await axios.get(
              "https://api.whatsive.com/api/v1/smsInstancia?action=getInstancia&token="+token+"&id="+port
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
                "https://api.whatsive.com/api/v1/smsInstancia?action=getMessages&token="+token+"&id="+port
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
                "https://api.whatsive.com/api/v1/smsInstancia?action=countSendsSms&token="+token+"&id="+port
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
                "https://api.whatsive.com/api/v1/smsInstancia?action=markSend&token="+token+"&id="+port+"&idM="+id
              );
              return {salida:"exito",response:response.data};
        } catch(error){
            console.log(error);
            return {salida:"error"};
        }
    }

}