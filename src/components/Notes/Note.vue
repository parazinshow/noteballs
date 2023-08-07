<template>
  <div
    class="card mb-4"
  >
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column"> {{ dateOfNote }}</small>
          <small class="column has-text-right"> {{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`"
        class="card-footer-item"
        href="#" 
      >
        Edit
      </RouterLink>
      <a href="#"
        @click.prevent="modals.deleteNote = true"
        class="card-footer-item"
      >
        Delete
      </a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import {useNotesStore} from '@/stores/storeNotes.js'
import ModalDeleteNote from './ModalDeleteNote.vue';
import { useDateFormat } from '@vueuse/core';

//store
  const storeNotes = useNotesStore()

//props
  const props = defineProps({
    note:{
      type: Object,
      required: true
    }
  })

// date formatted
  const dateOfNote = computed(() =>{
    let date = new Date(parseInt(props.note.date))
    return useDateFormat(date, 'DD-MM-YYYY @ HH:mm').value
  })

// character Length
  const characterLength = computed(()=>{
    let length =  props.note.content.length
    let description = length > 1 ? 'characters' : 'character'
    return ` ${length} ${description}`
  })

// modals
  const modals = reactive({
    deleteNote: false
  })
  
</script>