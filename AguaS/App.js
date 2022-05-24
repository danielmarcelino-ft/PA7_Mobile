
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Styless from './Styless';
import Title from './src/components/Title';
import Main from './src/components/Main';
import Monitor from './src/components/Monitor';

function Inicio() {
   return (
     <View style={Styless.container}>
          <Title/>
          <Main/>
          <StatusBar style="auto" />
          </View>
    );
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

