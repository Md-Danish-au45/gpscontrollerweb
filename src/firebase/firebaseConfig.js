// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-IMxV8l7VP-xUAk436QRc7jFL_PNnGro",
  authDomain: "verifyekyc-1c76d.firebaseapp.com",
  databaseURL: "https://verifyekyc-1c76d-default-rtdb.firebaseio.com",
  projectId: "verifyekyc-1c76d",
  storageBucket: "verifyekyc-1c76d.firebasestorage.app",
  messagingSenderId: "35024753812",
  appId: "1:35024753812:web:240bd767fe5c07afb9d081",
  measurementId: "G-TT383ZVZCF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);

export default {
  app,
  auth,
  db,
  analytics,
  storage,
  // firestoreRules,
  // cloudFunctions,
  // analyticsSchemas,
  // analyticsHelpers
};