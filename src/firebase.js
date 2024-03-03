// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMIPwuYRp_59Jyxt-KbG4-tt19WNO5VW4",
  authDomain: "augmate-d844e.firebaseapp.com",
  projectId: "augmate-d844e",
  storageBucket: "augmate-d844e.appspot.com",
  messagingSenderId: "935985492697",
  appId: "1:935985492697:web:2bd2b66a52a633d70744c8",
  measurementId: "G-6WS0G7THH5",
  storageBucket:"gs://augmate-d844e.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const auth = getAuth(app);

export {storage, auth}
