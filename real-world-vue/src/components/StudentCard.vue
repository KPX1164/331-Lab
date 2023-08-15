<template>
    <div class="event-card">
      <h4>Name: {{ event.name }}  {{ event.surname }}</h4>
      <span>GPA: {{ event.gpa }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Student } from '@/type';
  import type { PropType } from 'vue';
  
  const props = defineProps({
    event: {
      type: Object as PropType<Student>,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1.75px solid #39495c49;
    border-radius: 7px;
    margin-bottom: 18px;
    transition: transform 0.3s ease; 
  }
  .event-card:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 12px 0 rgba(177, 177, 177, 0.2);
  }
  </style>
  