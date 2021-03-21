import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import {closeSession} from '../../utils/actions'

export default function UserLogged() {

    const navigation=useNavigation()
    return (
        <View>
            <Text>UserLogged...</Text>
            <Button
             title="Cerrar sessión"
             onPress={()=>{
              closeSession()
              navigation.navigate("restaurants")
             }}
            />
        </View>
    )
}
