import React from 'react'

import { FlatList,StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native'
import {Image} from "react-native-elements"
import { size } from 'lodash'
import {formatPhone} from '../../utils/helpers'
import { getMoreRestaurants } from '../../utils/actions'

export default function ListRestaurants({restaurants,navigation,handerLoadMore}) {
    return (
        <View>
            <FlatList
               data={restaurants}
               keyExtractor={(item,index)=>index.toString()}
               onEndReachedThreshold={0.5}
               onEndReached={handerLoadMore}
               renderItem={(restaurant)=>(
                   <Restaurant  restaurant={restaurant} navigation={navigation}/>
               )}
            />
        </View>
    )
}

function Restaurant({restaurant,navigation,handerLoadMore}){
 
 const {id,images,name,address, description,phone,callingCode}=restaurant.item
 const imageRestaurant=images[0]

 const getRestaurant=()=>{
    navigation.navigate("restaurant",{id,name})
 }


 return(
     <TouchableOpacity onPress={getRestaurant}>
       <View style={styles.viewRestaurant}>
           <View style={styles.viewRestaurantImage}>
            <Image
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator  color="#fff"/>}
              source={{uri:imageRestaurant}}
              style={styles.imageRestaurant}
          />
         </View>
       <View>
           <Text style={styles.restaurantTitle}>{name}</Text>
           <Text style={styles.restaurantInformation}>{address}</Text>
           <Text style={styles.restaurantInformation}>{formatPhone(callingCode,phone)}</Text>
           <Text style={styles.restaurantDescription}>
               {
                  size(description)>0
                  ? `${description.substr(0,60)}...`
                  :description
               }
               </Text>
       </View>
       </View>
     </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
     viewRestaurant:{
         flexDirection:"row",
         margin:10   
     },
     viewRestaurantImage:{
        marginRight:15
     },
     imageRestaurant:{
       width:90,
       height:90
     },
     restaurantTitle:{
         fontWeight:"bold"
     },
     restaurantInformation:{
         paddingTop:2,
         color:"grey"
     },
     restaurantDescription:{
        paddingTop:2,
        color:"grey",
        width:"100%" 
     }
   

})
