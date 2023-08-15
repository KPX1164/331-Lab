<script setup lang="ts">
// import { ref } from 'vue'
// import type { Passenger } from '@/type'
// import PassengerService from '@/services/EventService'
// import { useRouter } from 'vue-router'
// const event = ref<Passenger | null>(null)
// const props = defineProps({ id: String })

// const router = useRouter()
// PassengerService.getPassengerById(Number(props.id))
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
  <div v-if="event">
    <h1>{{ event.destination }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'passenger-detail', params: { id } }">Detail</RouterLink> |
      <RouterLink :to="{ name: 'passenger-register', params: { id } }"> Register </RouterLink> |
      <RouterLink :to="{ name: 'passenger-edit', params: { id } }"> Edit </RouterLink>
    </div>
    <RouterView :event="event"></RouterView>
  </div>
</template>
