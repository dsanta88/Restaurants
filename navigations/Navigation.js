import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Icon} from "react-native-elements"



import Restaurants from '../screens/Restaurants'
import Favorites from '../screens/Favorites'
import TopRestaurants from '../screens/TopRestaurants'
import Search from '../screens/Search'
import Account from '../screens/account/Account'


const Tab=createBottomTabNavigator()

export default function Navigation() {

  const screenOptions=(route,color)=>{
    let iconName
    switch (route.name) {
      case "restaurants":
        iconName="compass-outline"
        break;
      case "favorites":
        iconName="heart-outline"
        break;
      case "topRestaurants":
        iconName="start-outline"
        break;
      case "search":
        iconName="magnify"
        break;
      case "account":
        iconName="home-outline"
       break;
    }

    return(
      <Icon
        type="material-community"
        name={iconName}
        size={22}
        color={color}
      />
      
    )
  }
    return (
    <NavigationContainer>
      <Tab.Navigator
         initialRouteName="restaurants"
         tabBarOptions={{
         inactiveTintColor:"#442484",
         activeTintColor:"#a17dc3"
       }}
       
       screenOptions={({route})=>({
         tabBarIcon:({color}) => screenOptions(route,color)
       })}
       
        >
           <Tab.Screen
            name="restaurants"
            component={Restaurants}
            options={{title:"Restaurantes"}}
           />
            <Tab.Screen
            name="favorites"
            component={Favorites}
            options={{title:"Favoritos"}}
           />
           <Tab.Screen
            name="topRestaurants"
            component={TopRestaurants}
            options={{title:"topRestaurantes"}}
           />
             <Tab.Screen
            name="search"
            component={Search}
            options={{title:"Buscar"}}
           />
           <Tab.Screen
            name="account"
            component={Account}
            options={{title:"Cuenta"}}
           />
      </Tab.Navigator>
    </NavigationContainer>
    )
}
