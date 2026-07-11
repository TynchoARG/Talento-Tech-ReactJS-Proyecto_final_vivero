import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBmXLM_p8d1mDvpeVJKlrtsF4PhACbdTfw",
  authDomain: "vivero-final-react.firebaseapp.com",
  projectId: "vivero-final-react",
  storageBucket: "vivero-final-react.firebasestorage.app",
  messagingSenderId: "965666259668",
  appId: "1:965666259668:web:8959b928101561ca2b3141",
};

// Inicializacion Firebase Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
