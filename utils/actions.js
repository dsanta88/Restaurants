import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db= firebase.firestore(firebaseApp)

export const  isUserLogged=()=>{
    let isLogged=false
    firebaseApp.auth().onAuthStateChanged((user)=>{
      user!==null && (isLogged=true)

    })



    
}