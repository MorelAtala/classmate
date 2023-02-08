import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';


export const Firebase = firebase.initializeApp({
  apiKey: "AIzaSyBCbh_d35KklxAiBXLbfe-pQn__IbN7BLs",
  authDomain: "classmate-8c902.firebaseapp.com",
  databaseURL: "https://classmate-8c902-default-rtdb.firebaseio.com",
  projectId: "classmate-8c902",
  storageBucket: "classmate-8c902.appspot.com",
  messagingSenderId: "372648272179",
  appId: "1:372648272179:web:7f7398c8b777968634de46",
  measurementId: "G-1VC4SMWF1D"
});

export const Auth = Firebase.auth();
export const Database = Firebase.database();
export const FirebaseStorage = Firebase.storage();
export const firebaseAuth = getAuth(Firebase);
