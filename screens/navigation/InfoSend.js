import {useEffect,useState} from "react";
import { View, Text } from "react-native";
import styles from "../styles/HomeScreenStyles";
import { functions as fc } from "../../request/request";


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

        sends = await fc.countWaitSms();
        if(sends.salida == "exito"){
            if(sends.response.salida == "exito"){
                sends = sends.response.sms;
            }else{
                sends = 0;

            }
        }else{
            sends = 0;
        }
        setWait(sends);
    }

    useEffect(()=>{
        charge();
        const intervalId = setInterval(charge, 5000);
        return () => clearInterval(intervalId);
    },[])

    return(
        <View>

            <View style={styles.allContent}>
                <View accessible={true} accessibilityLabel={send+" Mensajes enviados hoy"} style={styles.boxInfo}>
                    <View style={styles.boxNumber}>
                        <Text style={styles.number}>{send}</Text>
                        <Text style={{textAlign:"center",color:"white"}}>sms</Text>
                    </View>
                    <Text style={styles.textInfo}>Enviados hoy</Text>
                </View>
                <View accessible={true} accessibilityLabel={wait+" Mensajes pendientes de enviar"} style={styles.boxInfo}>
                    <View style={styles.boxNumber}>
                        <Text style={styles.number}>{wait}</Text>
                        <Text style={{textAlign:"center",color:"white"}}>sms</Text>
                    </View>
                    <Text style={styles.textInfo}>Sin enviar</Text>
                </View>
            </View>
          
        </View>
        
    );
}
export default InfoSend;