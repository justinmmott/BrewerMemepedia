
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import 'firebase/auth';

import config from "./config";

firebase.initializeApp(config);

export const signOut = () => {
    firebase.auth().signOut();
}

export const db = firebase.firestore();
export const storage = firebase.storage();
export const id = firebase.firestore.FieldPath.documentId();
export const auth = firebase.auth();
export const googleSignIn = new firebase.auth.GoogleAuthProvider();