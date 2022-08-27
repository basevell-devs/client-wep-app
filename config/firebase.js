import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhJa-tyuRQy4Hz4rarpVs5fLUtMF5K4Hw",
  authDomain: "basevell-dev.firebaseapp.com",
  projectId: "basevell-dev",
  storageBucket: "basevell-dev.appspot.com",
  messagingSenderId: "215805846846",
  appId: "1:215805846846:web:44d7f0125a48f5204bf86f",
  measurementId: "G-HZY19FGS04",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// export { firebase, auth, db };
// console.log(app.name ? "Firebase Mode Activated!" : "Firebase not working :(");
