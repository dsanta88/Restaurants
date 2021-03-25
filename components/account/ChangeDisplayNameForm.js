import { isEmpty, set } from 'lodash'
import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input} from 'react-native-elements'
import {updateProfile} from "../../utils/actions"

export default function ChangeDisplayNameForm({diplayName,setShowModal,toastRef,setReloadUser}) {
  const [newDisplayName, setNewDisplayName] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  const onSubmit=async()=>{
    if(!validateForm()){
      return
    }

    setLoading(true)
    const result=await updateProfile({displayName : newDisplayName})
    setLoading(false)

    if(!result.statusResponse){
     setError("Error al actualizar nombres y apellidos.")
     return
    }
    
    setReloadUser(true)
    toastRef.current.show("Se ha actualizado nombres y apellidos",)
    setShowModal(false)
  }

  const validateForm=()=>{
    setError(null)
    
    if(isEmpty(newDisplayName)){
      setError("Debes ingresar nombres y apellidos.")
      return false
    }
    if(newDisplayName===diplayName){
      setError("Debes ingresar nombres y apellidos diferentes al actual.",300)
      return false
    }
    
    return true
  }


    return (
        <View style={styles.view}>
           <Input
             placeholder="Ingrese el nombres y apellidos"
             containerStyle={styles.input}
             defaultValue={diplayName}
             onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}
             errorMessage={error}
             rightIcon={{
                 type:"material-community",
                 name:"account-circle-outline",
                 color:"#c2c2c2"
             }}
           /> 

           <Button
            title="Cambiar nombre y apellido"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={loading}
           />
        </View>
    )
}

const styles = StyleSheet.create({
  view:{
   alignItems:"center",
   paddingVertical:10
  },
  input:{
    marginBottom:10
  },
  btnContainer:{
    width:"95%"
  },
  btn:{
    backgroundColor:"#442484"
  }

})
