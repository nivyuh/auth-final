// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5960zRGCkdFdYlL62z41u2sH5-98Nzuc",
  authDomain: "women-techies-24.firebaseapp.com",
  projectId: "women-techies-24",
  storageBucket: "women-techies-24.appspot.com",
  messagingSenderId: "734955422127",
  appId: "1:734955422127:web:71fbf4e86d57684ecfef5a",
  measurementId: "G-GPM7LWRNBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
//const analytics = getAnalytics(app);
//export const auth=getAuth(app)

//Android 22834005257-4u2fv8hhnp6lc9naud0vsjbo6oadfcpt.apps.googleusercontent.com