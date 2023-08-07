<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div
      class="modal-card"
      ref="modalCardRef"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal"
        >
        </button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
          @click="closeModal"
          class="button"
        >
          Cancel
        </button>
        <button
          class="button is-danger"
          @click="storeNotes.deleteNote(noteId)"
        >
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
//imports
  import { onClickOutside } from '@vueuse/core'
  import { ref, onMounted, onUnmounted } from 'vue';
  import {useNotesStore} from '@/stores/storeNotes.js'
//store

  const storeNotes = useNotesStore()

//props
  const props = defineProps({
    modelValue:{
      type:Boolean,
      default:false
    },
    noteId:{
      type: String,
      required: true
    }
  })

//emits
  const emit = defineEmits(['update:modelValue'])

// close modal
  const closeModal = () =>{
    emit('update:modelValue', false)
  }
// CLick out side to close
  const modalCardRef = ref(null)
  onClickOutside(modalCardRef, closeModal)

//keyboard control
  const handlerKeyboard = e =>{
    if(e.key === 'Escape') closeModal()
  }
  onMounted(() => {
    document.addEventListener('keyup', handlerKeyboard)
  })
  onUnmounted(() =>{
    document.removeEventListener('keyup', handlerKeyboard)
  })

</script>