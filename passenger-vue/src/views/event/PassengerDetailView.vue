<script setup lang="ts">
import type {  Passenger } from '@/type'
import type { PropType } from 'vue'

defineProps({ event: { type: Object as PropType<Passenger>, required: true } })
</script>

<template>
  <div v-if="event">
    <p>{{ event.last_name }} on {{ event.first_name }}@{{ event.travelDate }}</p>
  </div>
</template>
