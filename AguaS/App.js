import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Styless from './Styless';
import Title from './src/components/Title'
import Main from './src/components/Main';
export default function App() {
  return (
    <View style={Styless.container}>
      <Title/>
      <Main/>
      <StatusBar style="auto" />
    </View>
  );
}

