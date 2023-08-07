import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {db} from '@/js/firebase'
import {
  collection, onSnapshot,
  doc, setDoc, deleteDoc, updateDoc, addDoc,
  query, orderBy
} from 'firebase/firestore';

import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef 
let notesCollectionQuery
let getNotesSnapshots = null

export const useNotesStore = defineStore('storeNotes', () => {
//state
  const notes = ref([])
  const notesLoaded = ref(null)
  
//getters
  const getNoteContent = computed(()=>{
    return (id) => {
      return notes.value.filter(note =>{ return note.id === id })[0].content
    }
  })

  const numberOfNotes = computed(() =>{
    return notes.value.length
  })

  const numberOfCharacters = computed(() =>{
    let count = 0
    notes.value.forEach(note =>{
      count += note.content.length
    })
    return count
  })

//Init
  const storeAuth = useStoreAuth()
  function init(){
    notesCollectionRef = collection(db, 'users', storeAuth.currentUser.id, 'notes')
    notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
    getNotes()
  }

//actions
  async function getNotes(){
    // const querySnapshot = await getDocs(collection(db, 'notes'))
    // querySnapshot.forEach((doc) => {
    // let note = {
    //   id: doc.id,
    //   content: doc.data().content
    // }
    // notes.value.push(note)
    // })
    notesLoaded.value = false

    getNotesSnapshots = onSnapshot(notesCollectionQuery, (querySnapshot) => {
      let notesArray = []
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date
        }
        notesArray.push(note)
      })
      notes.value = notesArray
      notesLoaded.value = true
    },error =>{
      console.log('error.message: ', error.message)
    })
  }

  function clearNotes(){
    notes.value = []
    if(getNotesSnapshots) getNotesSnapshots() //unsubscribe from active users
  }

  async function addNote(noteContent){

    // let currentDate = new Date().getTime(),id = currentDate.toString()
    // let note = {
    //   id,
    //   content: noteContent
    // }
    // notes.value.unshift(note)

    // await setDoc(doc(notesCollectionRef, id), {
    //   content: noteContent,
    //   id
    // });

    let currentDate = new Date().getTime(),
      date = currentDate.toString()

    await addDoc(notesCollectionRef, {
      content: noteContent,
      date
    });

  }

  async function deleteNote(idToDelete){
    await deleteDoc(doc(notesCollectionRef, idToDelete));

    // notes.value = notes.value.filter(note =>{return note.id !== idToDelete})
  }

  async function updateNote(id, content){
    await updateDoc(doc(notesCollectionRef, id), {
      content
    });

    // let index = notes.value.findIndex(note => note.id === id)
    // notes.value[index].content = content
  }


  return { notes , getNoteContent , addNote, deleteNote, updateNote, numberOfNotes, numberOfCharacters, getNotes, notesLoaded, init, clearNotes}
})