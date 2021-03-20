import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Input, Button} from 'react-native-elements'


export default function RegisterForm() {
    return (
        <View style={styles.input}>
           <Input
             containerStyle={styles.input}
             placeholder="Ingresar Email.."
           />
            <Input
             containerStyle={styles.input}
             placeholder="Ingresar Contraseña.."
             password={true}
             secureTextEntry={true}
           />
              <Input
             containerStyle={styles.input}
             placeholder="Confirmar Contraseña.."
             password={true}
             secureTextEntry={true}
           />
           <Button
            title="Registrar tu contraseña.."
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
           />

        </View>
    )
}

const styles = StyleSheet.create({
    form:{
      marginTop:30
   },
   input:{
      width: "100%"
   },
   btnContainer:{
     marginTop:20,
     width: "95%",
     alignSelf:"center"
   },
   btn:{
     backgroundColor: "#442484"
   }

})
