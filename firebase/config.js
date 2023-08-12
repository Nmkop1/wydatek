import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyD1WVSXTwyPSvByXHFw5Dtq4ZDo7i4lufc",
  authDomain: "booking-1b6f3.firebaseapp.com",
  projectId: "booking-1b6f3",
  storageBucket: "booking-1b6f3.appspot.com",
  messagingSenderId: "915170627061",
  appId: "1:915170627061:web:682f76a21267d8c0a224bc"
};


// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore()

 

 



export default firebase_app;