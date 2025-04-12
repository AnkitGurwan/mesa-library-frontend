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

  // const firebaseConfig = {
  //   apiKey: "AIzaSyAvoIU93exlkUVY09kuatjyHnx9F3G1MPs",
  //   authDomain: "mesa-d321b.firebaseapp.com",
  //   projectId: "mesa-d321b",
  //   storageBucket: "mesa-d321b.firebasestorage.app",
  //   messagingSenderId: "385828495745",
  //   appId: "1:385828495745:web:ff0560442443ec5ff48880",
  //   measurementId: "G-63LHB42LR7"
  // };