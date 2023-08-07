<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{storeNotes.numberOfNotes}}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{storeNotes.numberOfCharacters}}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveNoteballs"
      class="input"
      type="text"
      placeholder="Do you have noteballs?"
      v-autofocus
      maxlength="100"
    />

  </div>
</template>

<script setup>
//imports
  import { useNotesStore } from '@/stores/storeNotes'
  import { vAutofocus } from '@/directives/vAutofocus.js'
  import { useWatchCharacters } from '../use/useWatchCharacters';
  import { ref } from 'vue';

// store
  const storeNotes = useNotesStore()
  const loveNoteballs = ref('')

//watch
  useWatchCharacters(loveNoteballs, 50)

</script>