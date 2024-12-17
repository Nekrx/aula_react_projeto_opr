import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCRs34diHUd0rcLgTFvUsHYoQYeRwQrYBw",
    authDomain: "oprbr-71bc8.firebaseapp.com",
    projectId: "oprbr-71bc8",
    storageBucket: "oprbr-71bc8.firebasestorage.app",
    messagingSenderId: "506487518859",
    appId: "1:506487518859:web:9f65100360acce0567c68e",
    measurementId: "G-S57ZPS0Y9S"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export { auth, db, storage };