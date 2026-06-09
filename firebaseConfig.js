import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAr19LY1A07LrJsP5mHyqHevBu3wgHAC0",
  authDomain: "proyecto01-41db9.firebaseapp.com",
  projectId: "proyecto01-41db9",
  storageBucket: "proyecto01-41db9.firebasestorage.app",
  messagingSenderId: "671801040277",
  appId: "1:671801040277:web:bd3600355cbde84bb76a9c",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});