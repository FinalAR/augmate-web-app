// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API || "PUT_IN_A_DUMMY_API_KIEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJID,
  storageBucket: process.env.FIREBASE_STORAGE_NAME,
  messagingSenderId: process.env.MESSENGER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENTID,
  storageBucket:process.env.FIREBASE_STORAGE_BUCKET
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const auth = getAuth(app);

export {storage, auth}
