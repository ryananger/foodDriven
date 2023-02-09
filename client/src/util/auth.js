import { initializeApp } from "firebase/app";
import { getAuth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut } from "firebase/auth";

import ax from './ax.js';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "fooddriven-b483a.firebaseapp.com",
  projectId: "fooddriven-b483a",
  storageBucket: "fooddriven-b483a.appspot.com",
  messagingSenderId: "519161485501",
  appId: "1:519161485501:web:5fd095fc9831d2fef7bfd4",
  measurementId: "G-2G4HZCK5TM"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

var signUp = function(user) {
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      user.uid = userCredential.user.uid;

      ax.createUser(user);
      console.log('Created firebase user.');
    })
    .catch((error) => {
      console.log(error);
    });
};

var signIn = function(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var user = userCredential.user;

      ax.getUser(user.uid);
      console.log('Firebase signIn successful.');
    })
    .catch((error) => {
      console.log(error);
    });
};

var logOut = function() {
  signOut(auth).then(() => {
    console.log('Firebase signOut successful.');
  }).catch((error) => {
    console.log(error);
  });
};

var methods = {
  signUp: signUp,
  signIn: signIn,
  logOut: logOut
};

export default methods;