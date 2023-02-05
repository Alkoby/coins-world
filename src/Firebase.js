import firebaseConfig from "./data/FirebaseConfig";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const FirebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(FirebaseApp);
const db = getFirestore(FirebaseApp);

export {auth,db};