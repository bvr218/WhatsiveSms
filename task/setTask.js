import BackgroundFetch from "react-native-background-fetch";
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTask = {
  checkInitialLaunch: async function() {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched !== 'true') {
        await this.initBackgroundFetch();
        await AsyncStorage.setItem('hasLaunched', 'true');
      }
    } catch (error) {
      console.error('Error al verificar el lanzamiento inicial:', error);
    }
  },

  initBackgroundFetch: async function() {
    const onEvent = async (taskId) => {
      console.log('[BackgroundFetch] task: ', taskId);
      await this.addEvent(taskId);
      BackgroundFetch.finish(taskId);
    };

    const onTimeout = async (taskId) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 6, // Configurar el intervalo en segundos (6 segundos)
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
      },
      onEvent,
      onTimeout
    );
    console.log('[BackgroundFetch] configure status: ', status);
  },

  addEvent: async function(taskId) {
    console.log('[BackgroundFetch] Ejecutando tarea en segundo plano...');
    setTimeout(() => {
      this.addEvent(taskId); // Vuelve a llamar a addEvent después de 6 segundos
    }, 6000);
  }
};
