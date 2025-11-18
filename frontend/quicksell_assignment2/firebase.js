// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCygQTJiiP9sn5DfEMbWTIbQkm4N9VEcvM",
  authDomain: "salon-fd722.firebaseapp.com",
  projectId: "salon-fd722",
  storageBucket: "salon-fd722.firebasestorage.app",
  messagingSenderId: "895889215969",
  appId: "1:895889215969:web:83cf973959bbc57df082a0",
  measurementId: "G-QM6QM6QTCW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);