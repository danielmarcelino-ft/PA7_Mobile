
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { View, Text, Button } from 'react-native';
import Styless from './Styless';
//import Title from './src/components/Title';
//import Main from './src/components/Main';
//import Monitor from './src/components/Monitor';

function Inicio( { navigation } ) {
   return (
      <View style={Styless.container}>
          <View style={Styless.Monitor}>
            <Button title='Tirar foto do mês atual'></Button>
            <Button title='Monitor' onPress={ () => navigation.navigate('Monitor')} ></Button>
            <Button title='Histórico de fotos'></Button>
            <Text> hauiehiuahuiehuiahueiai</Text>
            <StatusBar style="auto" />
          </View>
      </View>
          
          
    );
}

function Monitor() {


  return (
      <View style={Styless.container}>
          <Text style={Styless.TextoGeral}> Monitorrrrrrrrrrrrrrr</Text>
          <StatusBar style="auto" />
      </View>
  )


}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Monitor" component={Monitor}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

