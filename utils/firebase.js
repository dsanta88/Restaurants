import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCgo9t5WLaCqgGI0J_DDsI74deJsbT2-hM",
    authDomain: "restaurants-61cd5.firebaseapp.com",
    projectId: "restaurants-61cd5",
    storageBucket: "restaurants-61cd5.appspot.com",
    messagingSenderId: "167071621144",
    appId: "1:167071621144:web:ef7715e0c97f54e64de36d"
  };
  

  export const firebaseApp= firebase.initializeApp(firebaseConfig)

