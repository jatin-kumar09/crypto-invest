import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2IwiHCNv2uGLS_3PYr-4u4Vz5zZ8YEa4",
    authDomain: "cypto-invest.firebaseapp.com",
    projectId: "cypto-invest",
    storageBucket: "cypto-invest.appspot.com",
    messagingSenderId: "629380963795",
    appId: "1:629380963795:web:52ec630893f221be72e326",
    measurementId: "G-JBRQ40QJ4P"
};

const app=initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);

export {auth,db};