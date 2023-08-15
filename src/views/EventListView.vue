<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
// import CatagoryCard from '../components/CatagoryCard.vue'
import type { EventItem } from '@/type'
import { ref, toRef } from 'vue'
import EventService from '@/services/EventService'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { watchEffect } from 'vue'
import { computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const router = useRouter()
const events = ref<EventItem[]>([])
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
  }
})

function refresh() {
  router.push({ name: 'EventList', query: { page: props.page, filter: filterEvent.value } })
}

// Fetch events function
async function fetchEvents(page: number) {
  try {
    // NProgress.start(); // Start the loading progress
    const response = await EventService.getEvent(filterEvent.value, page)
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
  <h1 class="text-center p-8 text-gray-800 ">Events for good</h1>

  <main class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'EventList', query: { page: page + 1 } }"
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

</style>




