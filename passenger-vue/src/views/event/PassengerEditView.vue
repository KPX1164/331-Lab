<script setup lang="ts">
import { type Passenger } from '@/type'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps({ event: { type: Object as PropType<Passenger>, require: true } })
  const router = useRouter()
const store = useMessageStore()
function edit() {
  store.updateMessage('You are successfully edited for ' + props.event?.destination)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({
    name: 'passenger-detail',
    params: {
      id: props.event?.id
    }
  })
}
</script>

<template>
  <p>Edit view</p>
  <button @click="edit">Edit Me</button>

</template>
