import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA_AeRKBLXlcNUDVQKOcdFcgdhRF_9IOQc",
    authDomain: "pantry-a650c.firebaseapp.com",
    projectId: "pantry-a650c",
    storageBucket: "pantry-a650c.appspot.com",
    messagingSenderId: "431560645595",
    appId: "1:431560645595:web:693e23723062ef334665fe",
    measurementId: "G-0BTHRK5Q97"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);