
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-storage';

import config from "./config";

firebase.initializeApp(config);

export const db = firebase.firestore();
export const storage = firebase.storage();
export const id = firebase.firestore.FieldPath.documentId();