<script setup lang="ts">
import { type EventItem } from '@/type'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps({ event: { type: Object as PropType<EventItem>, require: true } })
const router = useRouter()
const store = useMessageStore()
function edit() {
  store.updateMessage('You are successfully edited for ' + props.event?.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({
    name: 'event-detail',
    params: {
      id: props.event?.id
    }
  })
}
</script>

<template>
  <p class="p-8">Edit</p>
  <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" @click="edit">Edit Me</button>
</template>
