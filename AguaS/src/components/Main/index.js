import React from 'react'
import { View, Text, Button} from 'react-native'
import Styless from '../../../Styless'

 export default function Main( { navigation } ) {
    return (
        <View style={Styless.startMainMenu}>
            <Button title='Tirar foto do mês atual'></Button>
            <Button title='Monitor' onPress={ () => navigation.navigate('Monitor')} ></Button>
            <Button title='Histórico de fotos'></Button>
            <Text> hauiehiuahuiehuiahueiai</Text>
        </View>
    )
  }