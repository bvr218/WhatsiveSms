import {useEffect,useState} from "react";
import { View, Text } from "react-native";
import styles from "../styles/HomeScreenStyles";
import { functions as fc } from "../../request/request";
import AsyncStorage from '@react-native-async-storage/async-storage';

 function InfoSend(){
    const [send, setSend] = useState(0);
    const [wait, setWait] = useState(0);

    async function charge(){
        let sends = await fc.countSendsSms();
        if(sends.salida == "exito"){
            if(sends.response.salida == "exito"){
                sends = sends.response.sms;
            }else{
                sends = 0;

            }
        }else{
            sends = 0;
        }
        setSend(sends);

        let sms = await AsyncStorage.getItem('sms');
        if(sms!=null && sms!=undefined){
            sms = JSON.parse(sms);
            setWait(sms.length);
        }else{
            setWait(0);
        }
    }

    useEffect(()=>{
        charge();
        const intervalId = setInterval(charge, 5000);
        return () => clearInterval(intervalId);
    },[])

    return(
        <View style={styles.allContent}>
            <View style={styles.boxInfo}>
                <View style={styles.boxNumber}>
                    <Text style={styles.number}>{send}</Text>
                    <Text style={{textAlign:"center"}}>sms</Text>
                </View>
                <Text style={styles.textInfo}>Enviados hoy</Text>
            </View>
            <View style={styles.boxInfo}>
                <View style={styles.boxNumber}>
                    <Text style={styles.number}>{wait}</Text>
                    <Text style={{textAlign:"center"}}>sms</Text>
                </View>
                <Text style={styles.textInfo}>Sin enviar</Text>
            </View>
        </View>
        
    );
}
export default InfoSend;