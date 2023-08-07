<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
      v-autofocus
    >
      <template #buttons>
        <button
          @click="$router.back()"
          class="button is-link is-light  mr-2"
        >
        Cancel
        </button>
        <button
          class="button is-link has-background-link"
          :disabled="!noteContent"
          @click="handleSaveClick"
        >
        Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
//imports
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import AddEditNote from '../components/Notes/AddEditNote.vue';
  import {useNotesStore} from '@/stores/storeNotes.js'
  import { useWatchCharacters } from '@/use/useWatchCharacters.js'
  

//router
  const route = useRoute()
  const router = useRouter()

//store
  const storeNotes = useNotesStore()

//note
  const noteContent = ref('')

  noteContent.value = storeNotes.getNoteContent(route.params.id)

//save click
  const handleSaveClick = () =>{
    let editedNote = {
      id: route.params.id,
      content: noteContent.value
    }
    storeNotes.updateNote(editedNote.id, editedNote.content)
    router.push('/')
  }

  useWatchCharacters(noteContent)

</script>