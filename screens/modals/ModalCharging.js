import React,{useState, useContext} from "react";
import { Modal, ActivityIndicator, View, Text } from "react-native";
import styles from "../styles/DetailScreenStyle";
import { Context } from "../context/Context";
export default function ModalI(){
  const { isLoading } = useContext(Context);
    
    return(
        <Modal
        visible={isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <ActivityIndicator size={70} color="blue" />
          <Text style={styles.loadingText}>Estamos validando los datos.</Text>
        </View>
      </Modal>
    );
} 