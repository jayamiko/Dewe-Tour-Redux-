import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDxwZtyZQQnkoBdW5_sZcTDeZ_P9oipDFc",

  authDomain: "dewe-tour-authentication.firebaseapp.com",

  projectId: "dewe-tour-authentication",

  storageBucket: "dewe-tour-authentication.appspot.com",

  messagingSenderId: "582703874233",

  appId: "1:582703874233:web:1010af12e58a482cbe9b68",

  measurementId: "G-4JJQVZ4V4J",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
