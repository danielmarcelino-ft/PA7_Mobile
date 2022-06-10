
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { View, Text, Button } from 'react-native';
import Styless from './Styless';
//import Title from './src/components/Title';
//import Main from './src/components/Main';
//import Monitor from './src/components/Monitor';

import { Dimensions} from "react-native";
import {
  LineChart,
  //BarChart,
  //PieChart,
 // ProgressChart,
 // ContributionGraph,
 // StackedBarChart
} from "react-native-chart-kit";


import { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView  } from 'react-native';
import { Camera, CameraType } from 'expo-camera';


function Inicio({ navigation }) {
  return (
    <View style={Styless.container}>
      <View style={Styless.startMainMenu}>
        <Button style={Styless.bottaoEstiloso} title='Média de Consumo' onPress={() => navigation.navigate('Monitor')} ></Button>
        <Button style={Styless.bottaoEstiloso} title='Registrar Consumo' onPress={() => navigation.navigate('RegistrarConsumo')}></Button>
        <StatusBar style="auto" />
      </View>
    </View>


  );
}

function Monitor() {


  return (
    <View style={Styless.container}>
      <Text style={Styless.TextoGeral}></Text>
      <Text>Consumo dos últimos 12 meses</Text>
      <LineChart
        data={{
          labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
          datasets: [
            {
              data: [
                Math.random() * 120,
                Math.random() * 120,
                Math.random() * 120,
                Math.random() * 120,
                Math.random() * 120,
                Math.random() * 120
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={Dimensions.get("window").height * 0.8}
        yAxisLabel="R$"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "#F0FFFF",
          backgroundGradientTo: "#F5FFFA",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "blue"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8
        }}
      />

      <StatusBar style="auto" />
    </View>
  )


}

function RegistrarConsumo() {
  
  
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  
  useEffect( () => {
    (async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    )  ();
   }, []
  );

  if (hasPermission === null){
       return <View/>
  }
 else if (hasPermission === false){
        return <Text> Camera não autorizada!</Text>
  }


  return (
    //<View style={Styless.container}>
      //<Text style={Styless.TextoGeral}>Gostaria de registrar o consumo do mês atual?</Text>
      <SafeAreaView>
          <Camera style={{flex: 1}} type={type}>
      

      <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
          <TouchableOpacity style={{
            position: 'absolute',
            bottom: 20,
            left: 120,
          }}
          onPress={ () => {
            setType(
              type === Camera.Constants.Type.back 
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
            );
          }}
          >

          </TouchableOpacity>
      </ View> 

      <StatusBar style="auto" />
    </Camera>
  </SafeAreaView>

  );


}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} options={{
          title: 'Início ',
          headerStyle: {
            backgroundColor: '#1E90FF',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen name="Monitor" component={Monitor} options={{
          title: 'Monitor',
          headerStyle: {
            backgroundColor: '#1E90FF',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen name="RegistrarConsumo" component={RegistrarConsumo} options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#1E90FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

