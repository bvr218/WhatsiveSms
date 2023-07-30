import * as React from 'react';
import { View, Text, Button, useColorScheme } from 'react-native';


import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function HomeScreen({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <View style={backgroundStyle}>
      <Text>¡Página de inicio!</Text>
      <Button
        title="Ir a la pantalla de detalle"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
}

export default HomeScreen;
