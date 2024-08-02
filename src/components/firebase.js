import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA_AeRKBLXlcNUDVQKOcdFcgdhRF_9IOQc",
    authDomain: "pantry-a650c.firebaseapp.com",
    projectId: "pantry-a650c",
    storageBucket: "pantry-a650c.appspot.com",
    messagingSenderId: "431560645595",
    appId: "1:431560645595:web:693e23723062ef334665fe",
    measurementId: "G-0BTHRK5Q97"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
