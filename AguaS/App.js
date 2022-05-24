
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { View, Text, Button } from 'react-native';
import Styless from './Styless';
//import Title from './src/components/Title';
//import Main from './src/components/Main';
//import Monitor from './src/components/Monitor';

import { Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";



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
      <Text style={Styless.TextoGeral}> Monitorrrrrrrrrrrrrrr</Text>
      <Text>Consumo dos últimos 12 meses</Text>
      <LineChart
        data={{
          labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={Dimensions.get("window").height * 0.8}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
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


  return (
    <View style={Styless.container}>
      <Text style={Styless.TextoGeral}>Gostaria de registrar o consumo do mês atual?</Text>
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
        <Stack.Screen name="Monitor" component={Monitor} />
        <Stack.Screen name="RegistrarConsumo" component={RegistrarConsumo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

