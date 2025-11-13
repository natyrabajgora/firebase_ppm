import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCNXrYfAZJmiALD_5v5K-8Jt12slyGFXc",
  authDomain: "programim-pajisje-mobile.firebaseapp.com",
  projectId: "programim-pajisje-mobile",
  storageBucket: "programim-pajisje-mobile.appspot.com", 
  messagingSenderId: "622173820783",
  appId: "1:622173820783:web:5745e765620863b9f43a9a",
  measurementId: "G-BHNC7TH3ZG",
};


export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
