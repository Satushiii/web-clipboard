import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMSQ3QnIio88s9OZOp70CXwEP3WaCjf6s",
    authDomain: "web-clipboard-f9992.firebaseapp.com",
    projectId: "web-clipboard-f9992",
    storageBucket: "web-clipboard-f9992.firebasestorage.app",
    messagingSenderId: "881703107653",
    appId: "1:881703107653:web:68372001a22f8014f7372c",
    measurementId: "G-SMRDRYZT77"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
