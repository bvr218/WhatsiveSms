import React,{useEffect, useContext, useState, useRef} from 'react';
import { View, Text, useColorScheme, ScrollView, Image, Modal, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import ViewNetwork  from './navigation/ViewNetwork';
import { functions as fc } from '../request/request';
import { Context } from './context/Context';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import ModalI from './modals/ModalCharging';
import styles from './styles/HomeScreenStyles';

import InfoSend from './navigation/InfoSend';
import { useIAP, requestSubscription, getSubscriptions } from 'react-native-iap';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function HomeScreen({ navigation }) {
  

  const { isReady,setIsReady, setIsRunning, less, setLess, type, setType, setToken, setId } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const videoPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Función que se ejecuta cuando se carga el video
  const onVideoProgress = ({currentTime}) => {
    
    setCurrentTime(currentTime);
  };

  const onLoad = (data)=>{
    setDuration(data.duration);
  }

  const changeValue =  (data) =>{
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seek(data);
    }
  }

  const {
    currentPurchase,
    finishTransaction,
  } = useIAP();


  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (currentPurchase?.productId) {
          let response = await fc.addMonth()
          if(response?.response){
            if(response.response.salida == "exito"){
              await finishTransaction({
                purchase: currentPurchase,
                isConsumable: false,
              });
              ToastAndroid.show("Suscripcion realizada, sigue disfrutando de nuestros productos." , ToastAndroid.LONG);
              ViewNetwork(setIsReady,setIsRunning, setLess, setType ,navigation, setToken, setId);
            }
          }
        }
      } catch (error) {
        ToastAndroid.show("Ocurrio un error mientras se realizaba el pago." , ToastAndroid.LONG);
        
      }
    };

    checkCurrentPurchase();
  }, [currentPurchase, finishTransaction]);
  useEffect(()=>{
    ViewNetwork(setIsReady,setIsRunning, setLess, setType ,navigation, setToken, setId);
  },[isReady])

  const playPauseVideo = () => {
    setIsPlaying(!isPlaying);
  };
  const handleVideoPress = async () =>{
    setButtonsVisible(!buttonsVisible);
  }

  const subscribe = async () => {
      let sku= "1.mes.de.suscripcion"; 
      let offerToken = ""
      try {
          const products = await getSubscriptions({ skus: ['1.mes.de.suscripcion'] });
          offerToken = products[0].subscriptionOfferDetails[0].offerToken;
          await requestSubscription({
              sku,
              ...(offerToken && {subscriptionOffers: [{sku, offerToken}]}),
          });
      } catch (err) {
        ToastAndroid.show(err.message , ToastAndroid.LONG);
      }
  };
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? Colors.darker : Colors.lighter,

    alignItems: 'center',
  };
  return (
    <ScrollView>
      <View>

        <View style={backgroundStyle}>
          <Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter, fontSize:25, marginTop:20}}>Bienvenido a WHATSIVE</Text>
        </View>
        <View style={{marginTop:20, marginHorizontal:10}}>
          <Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter,fontSize:15}}>Por favor sigue estas instrucciones: </Text>
          
          <View style={{justifyContent:"center",alignItems:"center"}}>
          <View style={style.centeredView}>
            <Modal
            style={{backgroundColor:"#00000000",elevation:10}}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={style.centeredView}>
                <View style={style.modalView}>
                  <TouchableOpacity activeOpacity={1} onPress={handleVideoPress}>
                    <Video source={require("../public/video_whatsive.mp4")}   // Can be a URL or a local file.
                      ref={videoPlayerRef}                                           // Store reference
                      onBuffer={this.onBuffer}  
                      onProgress={onVideoProgress} 
                      onLoad={onLoad}
                      
                      paused={isPlaying}            // Callback when remote video is buffering
                      onError={(err)=>{console.log(err)}}           
                      resizeMode="contain"
                      style={{
                        top: 0,
                        width:350,
                        height:220,
                        bottom: 0,
                        right: 0,
                      }} />
                       {buttonsVisible && (<TouchableOpacity
                        style={[style.button,{backgroundColor:"#ffffff44", position:"absolute", right:0, width:40}]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={[style.textStyle,{color:"black"}]}>X</Text>
                      </TouchableOpacity>)}
                  </TouchableOpacity>
                </View>
                {
                  buttonsVisible && (
                    <View style={{position:"absolute",minWidth:"100%", alignItems:"center",justifyContent:"center"}}>
                      <TouchableOpacity style={{position:"absolute", backgroundColor:"#ffffff99", borderRadius:100, padding:10}} onPress={playPauseVideo}>
                        <Text style={[style.textStyle, { color: "black" }]}>{isPlaying ? (<View style={{height:48, width:48,justifyContent:"center", alignItems:"center"}}><Image style={{width:48,height:48, resizeMode:"contain"}} source={require("../public/play-buttton.png")}></Image></View>  ) : (<View style={{height:48, width:48}}><Image style={{width:48,height:48, resizeMode:"contain"}} source={require("../public/pause.png")}></Image></View>  )}</Text>
                      </TouchableOpacity>
                      <View style={{elevation:10, top:90,backgroundColor:"#ffffff99", width:"89%", height:40  }}>
                        <Slider
                          style={{width: "100%", height: 40}}
                          minimumValue={0}
                          onValueChange={changeValue}
                          maximumValue={duration}
                          value={currentTime}
                          minimumTrackTintColor="#FFFFFF"
                          maximumTrackTintColor="#000000"
                        />
                      </View>
                    </View>
                  )
                }
              </View>
              <View>
              </View>
            </Modal>
            <TouchableOpacity
              style={[style.button, style.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={style.textStyle}>Ver instrucciones</Text>
            </TouchableOpacity>
          </View>

          </View>
        </View>

        <View style={{marginTop:15, marginHorizontal:10}}>
          <Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter,fontSize:15}}>Nota: para un mejor funcionamiento deshabilite el ahorro de bateria de esta app.</Text>
        </View>
        <InfoSend/>
        <View style={{alignItems:"center",marginTop:-25}}>
          {
            type=="prueba"?(
              less<=100?(
              <>
                {
                  less>0?
                    (<>
                    <Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter,fontSize:16, marginTop:60}}>Te quedan: 
                      <Text style={{color:"red"}}>{less}
                      </Text> mensajes de prueba
                    </Text></>):
                    (<>
                    <Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter,fontSize:16, marginTop:60}}> 
                      <Text style={{color:"red"}}>Instancia vencida
                      </Text> 
                    </Text></>)
                }
                

                <TouchableOpacity style={[styles.Button,{alignItems:"center"}]} onPress={subscribe} ><Text style={{color:'white'}}>Suscribirse (+1 mes)</Text></TouchableOpacity></>
              ):
              (<></>)
            ):(
              less<10?
              (<>
              {less>0?
              (<>
              <Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter,fontSize:16, marginTop:60}}>La instancia vence en: 
                <Text style={{color:"red"}}>{less}</Text> dias
              </Text></>):
              (<><Text style={{color: !isDarkMode ? Colors.darker : Colors.lighter,fontSize:16, marginTop:60}}> 
                <Text style={{color:"red"}}>Instancia vencida
                </Text> 
              </Text></>)}
                
              <TouchableOpacity style={[styles.Button,{alignItems:"center"}]} onPress={subscribe} ><Text style={{color:'white'}}>Suscribirse (+1 mes)</Text></TouchableOpacity></>
              )
                :
              (<></>)
            )
          }
        </View>
        
        

      </View>
      <ModalI/>
    </ScrollView>
  );
}

const style= StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#15952b',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default HomeScreen;
