
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

const getEnvVar = (key: string): string => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
    return (import.meta as any).env[key];
  }
  return "";
};

const firebaseConfig = {
  apiKey: getEnvVar("VITE_FIREBASE_API_KEY") || "AIzaSyDqZcbgRV_XKh84Hz9XWoLi57OHJtSkWbI",
  authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN") || "my-ff-shop-352fd.firebaseapp.com",
  databaseURL: getEnvVar("VITE_FIREBASE_DATABASE_URL") || "https://my-ff-shop-352fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID") || "my-ff-shop-352fd",
  storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET") || "my-ff-shop-352fd.firebasestorage.app",
  messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID") || "1026791961950",
  appId: getEnvVar("VITE_FIREBASE_APP_ID") || "1:1026791961950:web:b252f8efc0c17c59608bcf"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getDatabase(app);
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;
export const googleProvider = new GoogleAuthProvider();

export default app;
