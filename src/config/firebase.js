import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBu32tkFFHA4azyjcXc_LmeLCDb33G7GhM",
    authDomain: "mesa-library.firebaseapp.com",
    projectId: "mesa-library",
    storageBucket: "mesa-library.appspot.com",
    messagingSenderId: "686285828631",
    appId: "1:686285828631:web:238b0ff863ee5b7ccd2252"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;