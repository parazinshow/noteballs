<template>
  <div
    class="card p-4 mb-5"
    :class="`has-background-${props.bgColor}-dark`"
  >
    <label
      v-if="label"
      class="label has-text-white"
    >
      {{props.label}}
    </label>
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="props.placeholder"
          ref="textareaRef"
          v-autofocus
          maxlength="100"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<script setup>
//imports
import { ref } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus.js'

//props
  const props = defineProps({
    modelValue:{
      type: String,
      required: true
    },
    bgColor:{
      type: String,
      default: 'success'
    },
    placeholder:{
      type: String,
      default: 'Type something...'
    },
    label:{
      type: String
    }
  })

//emit
  const emit = defineEmits(['update:modelValue'])

//focus textarea
  const textareaRef = ref(null)
  function focusTextarea(){
    textareaRef.value.focus()
  }

// This allows the function to be used by other parts of the application.
  defineExpose({
    focusTextarea
  })

</script>
