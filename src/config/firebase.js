// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkeB5IcmlYKCTpJ3BbLvAm3tnSYDiF3uM",
  authDomain: "weekly-report-back.firebaseapp.com",
  projectId: "weekly-report-back",
  storageBucket: "weekly-report-back.firebasestorage.app",
  messagingSenderId: "811942470329",
  appId: "1:811942470329:web:2b3b9c9aa0e1fe302bf168",
  measurementId: "G-NFJJK2TNKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);