import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "assistec-5b37d.firebaseapp.com",
  projectId: "assistec-5b37d",
  storageBucket: "assistec-5b37d.firebasestorage.app",
  messagingSenderId: "110096892556",
  appId: "1:110096892556:web:e20ef53240ed9d4c16b1a9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);