import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db= firebase.firestore(firebaseApp)

export const  isUserLogged=()=>{
    let isLogged=false
    firebaseApp.auth().onAuthStateChanged((user)=>{
      user!==null && (isLogged=true)
    }) 

    return isLogged
}

export const getCurrentUser= ()=>{
  return firebase.auth().currentUser
}

export const closeSession=()=>{
  firebase.auth().signOut().then(() => {
     return true
  }).catch((error) => {
     return false
  });
}

export const registerUser=async(email,password)=>{
  const result={statusResponse:true, error:null}
  try{
    await firebase.auth().createUserWithEmailAndPassword(email,password)
  }
  catch(error){
    result.statusResponse=false
   result.error="Este correo ya ha sido registrado."
  }

  return result
}


export const loginWithEmailAndPassword=async(email,password)=>{
  const result={statusResponse:true, error:null}
  try{
    await firebase.auth().signInWithEmailAndPassword(email,password)
  }
  catch(error){
    result.statusResponse=false
   result.error="Usuario o contraseña no validos."
  }

  return result
}


