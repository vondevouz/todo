import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCVbEHIyd5Ih7ZGlO4bMvWjzrANnO4hR0",
    authDomain: "todo-8751c.firebaseapp.com",
    projectId: "todo-8751c",
    storageBucket: "todo-8751c.appspot.com",
    messagingSenderId: "969338532201",
    appId: "1:969338532201:web:888b9e628dd75d97bc0df8",
};


if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
}

export { firebase };
