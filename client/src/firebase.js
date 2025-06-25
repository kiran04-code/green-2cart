// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_AUTH_API_KEY,
  authDomain: "green2cart.firebaseapp.com",
  projectId: "green2cart",
  storageBucket: "green2cart.firebasestorage.app",
  messagingSenderId: "364208726661",
  appId: "1:364208726661:web:4bcf6c99ad3c41e9cfbfec",
  measurementId: "G-QR92MEQVL8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);