<script setup lang="ts">
// import { ref } from 'vue'
// import type { EventItem } from '@/type'
// import EventService from '@/services/EventService'
// import { useRouter } from 'vue-router'
// const event = ref<EventItem | null>(null)
// const props = defineProps({ id: String })

// const router = useRouter()
// EventService.getEventById(Number(props.id))
//   .then((response) => {
//     event.value = response.data
//   })
//   .catch((error) => {
//     console.log(error)
//     if (error.response && error.response.satus === 404) {
//       router.push({ name: '404-resource', params: { resource: 'event' } })
//     } else {
//       router.push({ name: 'network-error' })
//     }
//   })
import { useEventStore } from '@/stores/event';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const store = useEventStore()
const event = storeToRefs(store).event
const id = ref(event?.value?.id)
</script>

<template>
  <div v-if="event" class="text-center font-semibold">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <RouterLink class="font-normal hover:text-red-400" :to="{ name: 'event-detail', params: { id } }">Detail</RouterLink> |
      <RouterLink class="font-normal hover:text-red-400"  :to="{ name: 'event-register', params: { id } }"> Register </RouterLink> |
      <RouterLink class="font-normal hover:text-red-400"  :to="{ name: 'event-edit', params: { id } }"> Edit </RouterLink>
    </div>
    <RouterView :event="event"></RouterView>
  </div>
</template>
