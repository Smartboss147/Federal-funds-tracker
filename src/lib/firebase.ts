import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "prefab-polymer-gj1d7",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:509566050075:web:9a38de57c1e0da08f97dbe",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDwG1KjV-LCHcleKJz-vHnpOtG4k5J5c2U",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "prefab-polymer-gj1d7.firebaseapp.com",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "prefab-polymer-gj1d7.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "509566050075",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-federalfundstrac-2c11eeb3-8227-4119-8330-90fa98078264");
