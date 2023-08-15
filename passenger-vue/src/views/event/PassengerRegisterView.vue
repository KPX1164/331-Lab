<script setup lang="ts">
import { type Passenger } from '@/type'
import { mergeProps, type PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps({ event: { type: Object as PropType<Passenger>, require: true } })
const router = useRouter()
const store = useMessageStore()
function register() {
  store.updateMessage('You are successfully registered for ' + props.event?.last_name)
  setTimeout(() => {
    store.resetMessage()
  }, 5000)
  router.push({
    name: 'passenger-detail',
    params: {
      id: props.event?.id
    }
  })
}
</script>

<template>
  <p>Register</p>
  <button @click="register">Register Me</button>
</template>
