import React,{useState} from 'react'
import { StyleSheet, Text, View, Alert, Dimensions } from 'react-native'
import {Avatar, Input,Button, Icon, Image} from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { ScrollView } from 'react-native-gesture-handler'
import {map,size,filter} from 'lodash'

import { loadImageFromGallery } from '../../utils/helpers'

const widthScreen=Dimensions.get("window").width


export default function AddRestaurantForm({toastRef, setLoading, navigation}) {

 const [formData, setFormData] = useState(defaultValues())
 const [errorName, setErrorName] = useState(null)
 const [errorDescription, setErrorDescription] = useState(null)
 const [errorEmail, setErrorEmail] = useState(null)
 const [errorAddress, setErrorAddress] = useState(null)
 const [errorPhone, setErrorPhone] = useState(null)
 const [imagesSelected, setImagesSelected] = useState([])



const addRestaurants=()=>{
    console.log(formData)
    console.log("VAMOS BIEN..")
}
    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant 
               imageRestaurant={imagesSelected[0]}
             />
            <FormAdd 
               formData={formData}
               setFormData={setFormData}
               errorName={errorName}
               errorDescription={errorDescription}
               errorEmail={errorEmail}
               errorAddress={errorAddress}
               errorPhone={errorPhone}
            />
            <UploadImage
               toastRef={toastRef}
               imagesSelected={imagesSelected}
               setImagesSelected={setImagesSelected}
            />
            <Button
              title="Crear restaurante"
              onPress={addRestaurants}
              buttonStyle={styles.btnAddRestaurant}
            />
        </ScrollView>
    )
}

function ImageRestaurant({imageRestaurant}){
  return (
      <View style={styles.viewPhoto}>
          <Image
          style={{width:widthScreen, height:200}}
            source={
                imageRestaurant
                ?{uri:imageRestaurant}
                : require("../../assets/no-image.png")
            }
          />
      </View>
  )
}
function UploadImage({toastRef,imagesSelected,setImagesSelected}){
const imageSelect=async()=>{
    const response= await loadImageFromGallery([4,3])
    if(!response.status)
    {
       toastRef.current.show("No has seleccionado ninguna imagen.",3000)
       return
    }

    setImagesSelected([...imagesSelected,response.image])
}


const removeImage=(image)=>{
    Alert.alert(
        "Eliminar imagen",
        "Estas seguro que quieres eliminar la imagen?",
         [
             {
                 text:"No",
                 style:"cancel"
             },
             {
                 text:"Si",
                 onPress:()=>{
                     setImagesSelected(
                         filter(imagesSelected,(imageUrl)=>imageUrl!==image)
                     )
                 }
             }
         ],
         {
             calcelable:true
         }
    )
}
    return(
        <ScrollView
        horizontal
        styles={styles.viewImages}
        >
            {
                size(imagesSelected)<10 && (
                    <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                  />
                )         
            }
            {
              map(imagesSelected,(item,index)=>(
                 <Avatar
                   key={index}
                   style={styles.miniatureStyle}
                   source={{uri:item}}
                   onPress={()=>removeImage(item)}
                  />
                ))
            }
          
        </ScrollView>
    )
}

function FormAdd({formData,setFormData,errorName,errorDescription,errorEmail,errorAddress,errorPhone}){
  const [country, setCountry] = useState("CO")
  const [callingCode, setCallingCode] = useState("57")
  const [phone, setPhone] = useState("")

  const onChange=(e,type)=>{
     setFormData(
         {...formData,[type]:e.nativeEvent.text})
  }

  return(
      <View style={styles.viewForm}>
         <Input 
            placeholder="Nombre del restaurante..."  
            defaultValue={formData.name}    
            onChange={(e)=>onChange(e,"name")}  
            errorMessage={errorName}
         />
         <Input 
            placeholder="Dirección"    
            defaultValue={formData.address}    
            onChange={(e)=>onChange(e,"address")}  
            errorMessage={errorAddress}    
         />
           <Input 
            keyboardType="email-address"
            placeholder="Email"    
            defaultValue={formData.email}    
            onChange={(e)=>onChange(e,"email")}  
            errorMessage={errorEmail}       
         />
         <View style={styles.phoneView}> 
            <CountryPicker
             withFlag
             withCallingCode
             withFilter
             withCallingCodeButton
             containerStyle={styles.countryPicker}
             countryCode={country}
             onSelect={(country)=>{
                  setFormData({
                      ...formData,
                      "country":country.cca2, 
                      "callingCode":country.callingCode[0]})
               }}
            />
            <Input 
              placeholder="WhatsApp del restaurante.."
              keyboardType="phone-pad"
              containerStyle={styles.inputPhone}
              defaultValue={formData.phone}    
              onChange={(e)=>onChange(e,"phone")}  
              errorMessage={errorPhone}   
            />
            <Input 
              placeholder="Descripción del restaurante.."
              multiline
              containerStyle={styles.textArea}
              defaultValue={formData.description}    
              onChange={(e)=>onChange(e,"description")}  
              errorMessage={errorDescription}   
            />
         </View>
      </View>
     )
}

const defaultValues=()=>{
    return{
        name:"",
        description:"",
        email:"",
        phone:"",
        address:"",
        country:"CO",
        callingCode:"57"
    }
}

const styles = StyleSheet.create({
    viewContainer:{
      height:"100%"
    },
    viewForm:{
        marginHorizontal:10
    },
    textArea:{
        height:100,
        width:"100%"
    },
    phoneView:{
        width:"80%"
    },
    inputPhone:{
        width:"80%"
    },
    btnAddRestaurant:{
        margin:20,
        backgroundColor:"#442484"
    },
    viewImages:{
        flexDirection:'row',
        marginHorizontal: 20,
        marginTop:30
    },
    containerIcon:{
        alignItems:'center',
        justifyContent: 'center',
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniatureStyle:{
       width:70,
       height:70,
       marginRight:10 
    },
    viewPhoto:{
        alignItems:"center",
        height:200,
        marginBottom:20
    }

})