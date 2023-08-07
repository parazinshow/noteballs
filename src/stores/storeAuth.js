import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged   } from 'firebase/auth'
import { ref } from 'vue'
import router from '../router'
import { useNotesStore } from './storeNotes'

export const useStoreAuth = defineStore('storeAuth', () => {

  const currentUser = ref({})

  function init(){
    const storeNotes = useNotesStore()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser.value.id = user.uid
        currentUser.value.email = user.email
        router.push('/')
        storeNotes.init()
      } else {
        currentUser.value = {}
        router.replace('/auth')
        storeNotes.clearNotes()
      }
    })
  }

  function registerUser(credentials){
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      const user = userCredential.user
      // console.log('user: ',user)
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  function loginUser(credentials){
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      const user = userCredential.user;
      // console.log('user: ', user)
    }).catch((error) => {
      console.log('messsage', error.message)
    })
  }

  function logoutUser(){
    signOut(auth).then(() => {
      // console.log('User sign out')
    }).catch((error) => {
      console.log(error.message)
    })
  }

  return {registerUser, logoutUser, loginUser, init, currentUser}
})