// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4GCv8GaFb26J4QPj3i31nsM9YSYlP7_k",
    authDomain: "talentus-digital.firebaseapp.com",
    projectId: "talentus-digital",
    storageBucket: "talentus-digital.appspot.com",
    messagingSenderId: "117437296355",
    appId: "1:117437296355:web:24aabe1518defd55609fd6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth(app)

export {app, auth, db}