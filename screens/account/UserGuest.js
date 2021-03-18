import React from 'react'
import { View, Text } from 'react-native'
import Loading from '../../components/Loading'

export default function UserGuest() {
    return (
        <View>
            <Text>UserGuest...</Text>
            <Loading isVisible={true} text="Cargando..."></Loading>
        </View>
    )
}
