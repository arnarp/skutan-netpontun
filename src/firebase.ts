import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAyyJlOXTwvxsHH_dOUyowCDgZhpH-8KWw',
  authDomain: 'skutan-82826.firebaseapp.com',
  databaseURL: 'https://skutan-82826.firebaseio.com',
  projectId: 'skutan-82826',
  storageBucket: '',
  messagingSenderId: '234753299562',
}
firebase.initializeApp(config)

export const firebaseAuth = firebase.auth

let firestore: firebase.firestore.Firestore // = firebase.firestore()

export const getFirestore: () => Promise<firebase.firestore.Firestore> = () => {
  if (firestore) {
    return Promise.resolve(firestore)
  } else {
    firestore = firebase.firestore()
    return Promise.resolve(firestore)
  }
}