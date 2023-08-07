
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCYhes_NdzzbemmpU5lvZOAUqK8KgL38cA',
  authDomain: 'noteballs-e809d.firebaseapp.com',
  projectId: 'noteballs-e809d',
  storageBucket: 'noteballs-e809d.appspot.com',
  messagingSenderId: '853296114455',
  appId: '1:853296114455:web:2b62da073ad7b2e0e1a552'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
  db,
  auth
}