<script setup lang="ts">
import type {  EventItem } from '@/type'
import type { PropType } from 'vue'

defineProps({ event: { type: Object as PropType<EventItem>, required: true } })
</script>

<template>
  <div v-if="event" class="text-center p-4 font-normal">
    <p>{{ event.time }} on {{ event.date }}@{{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
