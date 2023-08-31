import { Capacitor } from "@capacitor/core";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5TAm5VmbFp1nI6Um9kKYNH6A6RoF9QNA",
  authDomain: "threads-ionic.firebaseapp.com",
  projectId: "threads-ionic",
  storageBucket: "threads-ionic.appspot.com",
  messagingSenderId: "395726984381",
  appId: "1:395726984381:web:85ed33f925722cff1453d4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_AUTH = selectAuth()

function selectAuth(){
    let auth;
    if(Capacitor.isNativePlatform()){
        auth = initializeAuth(FIREBASE_APP,{
            persistence: indexedDBLocalPersistence
        })
    }else{
        auth = getAuth();
    }

    return auth;
}