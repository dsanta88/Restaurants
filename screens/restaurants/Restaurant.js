import React,{useState,useEffect} from 'react'
import { Dimensions, Alert,StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {Rating} from 'react-native-elements'


import { getDocumentById } from '../../utils/actions'
import Loading from '../../components/Loading'
import  CarouselImages  from '../../components/CarouselImages'


const widthScreen=Dimensions.get("window").width

export default function Restaurant({navigation,route}) {
    const {id,name}=route.params
    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)


    navigation.setOptions({title: name})

    useEffect(()=>{
       (async()=>{
           const response=await getDocumentById("restaurants",id)
           if(response.statusResponse){
               setRestaurant(response.document)
           }
           else{
              setRestaurant({})
              Alert.alert("Ocurrio un problema cargando el restaurante. Intente mas tarde.")
           }
       })()
    },[])

     if(!restaurant){
       return <Loading isVisible={true} text="Cargando.." />
     }

  
    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImages 
               images={restaurant.images}
               height={250}
               width={widthScreen}
               activeSlide={activeSlide}
               setActiveSlide={setActiveSlide}
            />
            <TitleRestaurant
               name={restaurant.name}
               description={restaurant.description}
               rating={restaurant.rating}
            />
        </ScrollView>
    )
}


function TitleRestaurant({name,description,rating}){
     return(
         <View style={styles.viewRestaurantTitle}>
             <View style={styles.viewRestaurantContainer}>
               <Text style={styles.nameRestaurant}>{name}</Text>
               <Rating style={styles.rating}
                 imageSize={20}
                 startingValue={parseFloat(rating)}
               />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
         </View>
     )
}

const styles = StyleSheet.create({
    viewBody:{
       flex:1,
       backgroundColor: "#fff"
    },
    viewRestaurantTitle:{
        padding: 15,
    },
    viewRestaurantContainer:{
        flexDirection:'row'
    },
    descriptionRestaurant:{
       marginTop:8,
       color:"grey",
       textAlign:'justify'
    },
    rating:{
        position:'absolute',
        right:0
    },
    nameRestaurant:{
        fontWeight:'bold'
    }

})
