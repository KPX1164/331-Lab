<script setup lang="ts">
import PassengerCard from '../components/PassengerCard.vue'
import type { Passenger } from '@/type'
import { ref, toRef } from 'vue'
import PassengerService from '@/services/EventService'
import NProgress from 'nprogress'
import type { AxiosResponse } from 'axios'
import { watchEffect } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'



const router = useRouter()
const events = ref<Passenger[]>([])
const totalEvent = ref<number>(0)
const filterEvent = ref<number>(4)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / filterEvent.value)
  return props.page.valueOf() < totalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
})



// watchEffect(() => {
//   PassengerService.getPassenger(filterEvent.value, props.page).then(
//     (response: AxiosResponse<Passenger[]>) => {
//       events.value = response.data
//       totalEvent.value = response.headers['x-total-count']
//     }
//   )
// })

function refresh() {
  router.push({ name: 'home', query: { page: props.page, filter: filterEvent.value } })
}


// Fetch events function
async function fetchEvents(page: number) {
  try {
    // NProgress.start(); // Start the loading progress
    const response = await PassengerService.getPassenger(filterEvent.value, page)
    events.value = response.data
    totalEvent.value = Number(response.headers['x-total-count'])
  } catch (error) {
    router.push({ name: 'NetworkError' })
  // } finally {
    // NProgress.done(); // Finish the loading progress
  }
}

// Initial fetch on page load
fetchEvents(props.page)

// Fetch events on route update
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  fetchEvents(toPage)
  next()
})
</script>

<template>
  <h1>Passengers</h1>

  <main class="events">
    <PassengerCard v-for="event in events" :key="event.id" :event="event"></PassengerCard>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'home', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'home', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
      >
        Next Page
      </RouterLink>
      <select v-model="filterEvent" @change="refresh">
        <option v-bind:value="1">1</option>
        <option v-bind:value="2">2</option>
        <option v-bind:value="3">3</option>
        <option v-bind:value="4">4</option>
        <option v-bind:value="5">5</option>
        <option v-bind:value="6">6</option>
      </select>
    </div>
  </main>
</template>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
