import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAW5H7A7cN3sohPipz4rPmd2rJZe9NCvzU",
  authDomain: "eliteblockmarket.firebaseapp.com",
  projectId: "eliteblockmarket",
  storageBucket: "eliteblockmarket.firebasestorage.app",
  messagingSenderId: "946756766507",
  appId: "1:946756766507:web:a307e50d1d6503ce58d36e",
  measurementId: "G-3H80LVSN3W",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore(app)

export const googleProvider = new GoogleAuthProvider()
