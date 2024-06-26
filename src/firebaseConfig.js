import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCwCiIxEaNSYGW7fBM-6lHuahQE8JaIOa0",
    authDomain: "freelancer-46f29.firebaseapp.com",
    projectId: "freelancer-46f29",
    storageBucket: "freelancer-46f29.appspot.com",
    messagingSenderId: "95997058032",
    appId: "1:95997058032:web:c26323cc6cc3ca285e1b35",
    measurementId: "G-65FYQ6PHH2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
