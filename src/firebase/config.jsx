// Import the necessary functions from the modular Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeJOEAP4qcMIYF_RNjIgkrlicu7kIrzQE",
  authDomain: "olx-clone-a3ef6.firebaseapp.com",
  projectId: "olx-clone-a3ef6",
  storageBucket: "olx-clone-a3ef6.appspot.com",
  messagingSenderId: "785164440336",
  appId: "1:785164440336:web:1a5f66d46c602ab1684b95",
  measurementId: "G-K5953GT9L5"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);  

export { db,auth,storage };