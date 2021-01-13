import * as firebase from 'firebase';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyD1Xn-XqR46U5SCSPUBb_VGzxx8KagPkTo",
    authDomain: "talabat-8cb96.firebaseapp.com",
    projectId: "talabat-8cb96",
    storageBucket: "talabat-8cb96.appspot.com",
    messagingSenderId: "1010694454560",
    appId: "1:1010694454560:web:723a6610536f162c076b45",
    measurementId: "G-DHYLTR0DDZ"
  };
  // Initialize Firebase
var db =  firebase.initializeApp(firebaseConfig);
var provider =new firebase.auth.GoogleAuthProvider()
var firebaseAuth = firebase.auth
var firebaseAuthFunction = firebase.auth()
var projectFirestore = db.firestore()
var projectStorage = db.storage()


export {projectFirestore,projectStorage,provider,firebaseAuth,firebaseAuthFunction,db}