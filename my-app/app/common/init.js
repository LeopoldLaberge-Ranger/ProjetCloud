import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getMessaging } from "firebase/messaging"

export default function() {
  //TODO: 
  //  1. Installer Firebase: npm install firebase
  //  2. Créer un projet Firebase (dans l'interface Web)
  //  3. Enregistrer une application (dans l'interface Web)
  //  4. Obtenir la configuration à partir de l'application (à partir de l'interface Web):
  const firebaseConfig = {
    apiKey: "AIzaSyDyDKbkKVYiulSpVZD2MY4KW0KaxZTCcIc",
    authDomain: "connecthivebd.firebaseapp.com",
    projectId: "connecthivebd",
    storageBucket: "connecthivebd.firebasestorage.app",
    messagingSenderId: "1077560815660",
    appId: "1:1077560815660:web:d96fb57475976332602189",
    measurementId: "G-31LPNQ8PKL"
  };
  
  
  
  const app = initializeApp(firebaseConfig)
  const auth = getAuth()
  const db = getFirestore(app)
  const messaging = getMessaging(app)
  

  return {db, auth, messaging}
}