import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAN_eGzbkePotEKeRJpdKDfvRBtlA2RvrI",
  authDomain: "fitnessonbroughton-6994c.firebaseapp.com",
  databaseURL: "https://fitnessonbroughton-6994c.firebaseio.com",
  projectId: "fitnessonbroughton-6994c",
  storageBucket: "fitnessonbroughton-6994c.appspot.com",
  messagingSenderId: "846361216485",
  appId: "1:846361216485:web:b5c9070e465f7704241b0c"
};
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()


export default db

