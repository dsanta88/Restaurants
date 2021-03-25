import { map } from 'lodash'
import React, {Children, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'
export default function AccountOptions({user,toastRef,setReloadUser}) {

 
  const [showModal, setShowModal] = useState(true)
  const [renderComponent, setRenderComponent] = useState(null)

    
function generateOptions(){
  return [
      {
         title:"Cambiar Nombres y Apellidos",
         iconNameLeft:"account-circle",
         iconColorLeft:"#a7bfd3",
         iconNameRight:"chevron-right",
         iconColorRight:"#a7bfd3",
         onPress:()=>selectedComponent("displayName")
      },
      { 
          title:"Cambiar email",
          iconNameLeft:"at",
          iconColorLeft:"#a7bfd3",
          iconNameRight:"chevron-right",
          iconColorRight:"#a7bfd3",
          onPress:()=>selectedComponent("email")
       },
       {
          title:"Cambiar contraseña",
          iconNameLeft:"lock-reset",
          iconColorLeft:"#a7bfd3",
          iconNameRight:"chevron-right",
          iconColorRight:"#a7bfd3",
          onPress:()=>selectedComponent("password")
       }
  ]
}

const selectedComponent=(key)=>{

  switch(key){
    case "displayName":
      setRenderComponent(
       <ChangeDisplayNameForm
         diplayName={user.diplayName}
         setShowModal={setShowModal}
         toastRef={toastRef}
         setReloadUser={setReloadUser}
       />)
    break;

  case "email":
    setRenderComponent(
     <ChangeEmailForm
       email={user.email}
       setShowModal={setShowModal}
       toastRef={toastRef}
       setReloadUser={setReloadUser}
     />

    )
    break;

    case "password":
      setRenderComponent(
        <ChangePasswordForm
          setShowModal={setShowModal}
          toastRef={toastRef}
        />
      )
    break;
  }
 
 setShowModal(true)
}

const menuOptions=generateOptions()

    return (
        <View>
          {
           menuOptions.map((menu, index) => (
             <ListItem
                  key={index}
                  style={styles.menuItem}
                  onPress={menu.onPress}
                >                  
                 <Icon
                   type="material-community"
                   name={menu.iconNameLeft}
                   color={menu.iconColorLeft}
                 />
                 <ListItem.Content>
                    <ListItem.Title>{menu.title}</ListItem.Title>
                </ListItem.Content>
                 <Icon
                   type="material-community"
                   name={menu.iconNameRight}
                   color={menu.iconColorRight}
                />
            </ListItem>

    ))
  }
  
  <Modal isVisible={showModal} setVisible={setShowModal} chidren={renderComponent}> 
 
  </Modal>
</View>
    )
}


const styles = StyleSheet.create({

  menuItem:{
      borderBottomWidth:1,
      borderBottomColor:"#a7bfd3"
  }
})