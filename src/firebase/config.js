import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDFQ0xxphU0f_2dqc1K5KFKbOlW5Nm-mw0",
  authDomain: "book-list-with-firebase-9b493.firebaseapp.com",
  projectId: "book-list-with-firebase-9b493",
  storageBucket: "book-list-with-firebase-9b493.appspot.com",
  messagingSenderId: "561332011201",
  appId: "1:561332011201:web:412ffa46b83ef4781b9440"
};


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)