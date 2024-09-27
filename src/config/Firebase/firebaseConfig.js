import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDQwAOIYntE6EV0uU9Kl2e3PcexwauHNAM",
  authDomain: "react-blogging-app-39602.firebaseapp.com",
  projectId: "react-blogging-app-39602",
  storageBucket: "react-blogging-app-39602.appspot.com",
  messagingSenderId: "220652077498",
  appId: "1:220652077498:web:0ed094ea793576159a5d83",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

 




export default app;
