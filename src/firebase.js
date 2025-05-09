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
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
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