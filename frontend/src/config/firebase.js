import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCp7I9cul2dShPZFTN5EkM--xZcoJw4LPo",
  authDomain: "magazine-hub-ee1d4.firebaseapp.com",
  projectId: "magazine-hub-ee1d4",
  storageBucket: "magazine-hub-ee1d4.appspot.com",
  messagingSenderId: "86522084694",
  appId: "1:86522084694:web:0709a917f5f90420beeaf7",
  measurementId: "G-R5K7BTSHPN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
