// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "business-directory-9153d.firebaseapp.com",
    projectId: "business-directory-9153d",
    storageBucket: "business-directory-9153d.appspot.com",
    messagingSenderId: "1010475117617",
    appId: "1:1010475117617:web:9147aaf6bf822e39db7910"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

