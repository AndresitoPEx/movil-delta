// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaZL-7irfyi8BzvvYph98qsY7Yn0J1Kwg",
  authDomain: "delta-app-af951.firebaseapp.com",
  projectId: "delta-app-af951",
  storageBucket: "delta-app-af951.appspot.com",
  messagingSenderId: "1004300356275",
  appId: "1:1004300356275:web:e754be2255b100fb46fec6",
  measurementId: "G-0E672HWF0M"
};

// Initialize Firebase
const appDelta = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default appDelta