
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, Modal, Image } from 'react-native';
import Styless from './Styless';
//import Title from './src/components/Title';
//import Main from './src/components/Main';
//import Monitor from './src/components/Monitor';

import { Dimensions } from "react-native";
import {
  LineChart,
  //BarChart,
  //PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from "react-native-chart-kit";

import { } from '@expo/vector-icons'

import { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';



let camera



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
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data)
      console.log(data.uri);
      setImageUri(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>

      <Button title={'Take Picture'} onPress={takePicture} />
      <Button title={'Gallery'} onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

//function RegistrarConsumo() {

  // const camRef = useRef(null);

  // const [capturadaFoto, setcapturadaFoto] = useState(null);
  // const [open, setOpen] = useState(false);

  // const [type, setType] = useState(Camera.Constants.Type.back);
  // const [hasPermission, setHasPermission] = useState(null);


  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   }
  //   )();
  // }, []
  // );

  // if (hasPermission === null) {
  //   return <View />
  // }
  // else if (hasPermission === false) {
  //   return <Text> Camera não autorizada!</Text>
  // }

  // const tirarFoto = async () => {
  //   try {
  //     const data = await camera.takePictureAsync()
  //     setcapturadaFoto(data.uri)
  //     console.log(photo)
  //     setPreviewVisible(true)
  //     //setStartCamera(false)
  //     setCapturedImage(data)
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }
  // // async function tirarFoto(){
  // //   if(camRef){
  // //     const data = await camRef.current.takePictureAsync();
  // //     setcapturadaFoto(data.uri);
  // //     setOpen(true);
  // //     console.log(data);
  // //   }
  // // }



  // return (
  //   //<View style={Styless.container}>
  //   //<Text style={Styless.TextoGeral}>Gostaria de registrar o consumo do mês atual?</Text>
  //   <SafeAreaView>
  //     <Camera style={{ flex: 1 }} type={'back'} ref={(r) => { camera = r }}>


  //       <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
  //         <TouchableOpacity style={{
  //           position: 'absolute',
  //           bottom: 20,
  //           left: 120,
  //         }}
  //           onPress={() => {
  //             setType(
  //               type === Camera.Constants.Type.back
  //                 ? Camera.Constants.Type.front
  //                 : Camera.Constants.Type.back
  //             );
  //           }}
  //         >

  //           <Text style={Styless.TextoGeral}>Trocar</Text>

  //         </TouchableOpacity>
  //       </ View>

  //     </Camera>

  //     <TouchableOpacity style={Styless.bottaoEstiloso} onPress={tirarFoto}>
  //       <Text style={Styless.TextoGeral}>Camera</Text>
  //     </TouchableOpacity>


  //     {capturadaFoto &&
  //       <Modal animationType='slide'
  //         transparent={false}
  //         visible={open}
  //       >
  //         <View>
  //           <TouchableOpacity style={Styless.bottaoEstiloso} onPress={() => setOpen(false)}>
  //             <Text style={color = "#FF0000"}>window-close</Text>
  //           </TouchableOpacity>


  //           <Image style={{ width: '100%', height: 300, borderRadius: 20 }}
  //             source={{ uri: capturadaFoto }}
  //           />





  //         </View>
  //       </Modal>
  //     }


  //   </SafeAreaView>

  // );


//}

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

