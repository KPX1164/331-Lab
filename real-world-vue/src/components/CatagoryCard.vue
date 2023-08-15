<template>
    <div class="event-card">
      <h4>{{ event.category }}</h4>
      <h4>Organizer: {{ event.organizer }}</h4>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { EventItem } from '@/type';
  import type { PropType } from 'vue';
  
  const props = defineProps({
    event: {
      type: Object as PropType<EventItem>,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1.75px solid rgba(201, 201, 201, 0.2);
  border-radius: 7px;
  margin-bottom: 18px;
  transition: transform 0.3s ease; 
  background-color: rgba(201, 201, 201, 0.2);
  text-align: right;
}
.event-card:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 12px 0 rgba(177, 177, 177, 0.2);
}
  </style>
  