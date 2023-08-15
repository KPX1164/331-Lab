<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'
import type { Student } from '@/type'
import { ref } from 'vue'
import EventService from '@/services/StudentService'
const events = ref<Student[]>([])

EventService.getEvent()
.then((response) => {
  events.value = response.data
})

</script>

<template>
  <h1>Students</h1>

  <main class="events">
    <StudentCard v-for="event in events" :key="event.id" :event="event"></StudentCard>

  </main>
</template>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
