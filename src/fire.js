import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAEW_8QYm2D8Tpgj7JlhsGC-REICz0Bjq8",
    authDomain: "story-time-7b2b0.firebaseapp.com",
    databaseURL: "https://story-time-7b2b0.firebaseio.com",
    projectId: "story-time-7b2b0",
    storageBucket: "story-time-7b2b0.appspot.com",
    messagingSenderId: "38433861675"
};
var fire = firebase.initializeApp(config);
export default fire;
