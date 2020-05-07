
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import 'firebase/auth';

import config from "./config";

firebase.initializeApp(config);

firebase.firestore().enablePersistence()
    .catch(function (err) {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });

export const signOut = () => {
    firebase.auth().signOut();
}

export const signUpWithEmailPassword = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
};

export const signInWithEmailPassword = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
};

export const sendEmailVerification = () => {
    firebase.auth().currentUser.sendEmailVerification().then(function () {
        alert('Email Verification Sent!');
    });
}

export const db = firebase.firestore();
export const storage = firebase.storage();
export const id = firebase.firestore.FieldPath.documentId();
export const auth = firebase.auth();
export const googleSignIn = new firebase.auth.GoogleAuthProvider();