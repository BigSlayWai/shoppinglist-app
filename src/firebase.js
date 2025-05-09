import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhuUmknCme9dTA44d-jw93NHs16bQrnUk",
    authDomain: "shopping-list-app-459315.firebaseapp.com",
    projectId: "shopping-list-app-459315",
    storageBucket: "shopping-list-app-459315.firebasestorage.app",
    messagingSenderId: "744209796510",
    appId: "1:744209796510:web:ca0c5894beef7159c99a8f",
    measurementId: "G-R6WG0K7WN6"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const signUpWithEmail = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  const logInWithEmail = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (err) {
      console.error(err);
      throw err;
    }
}

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  signUpWithEmail,
  logInWithEmail,
  logout,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
};