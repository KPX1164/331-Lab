<template>

    <RouterLink class="event-link" :to="{name: 'event-detail',params:{id: event?.id}}">
      <div class="event-class">
        <div class="event-card">
          <span>@{{event?.time}} on {{event?.date}}</span>
          <h4>{{event?.title}}</h4>
        </div>
      </div>
    </RouterLink>
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
  border: 1.75px solid #39495c49;
  border-radius: 7px;
  margin-bottom: 18px;
  transition: transform 0.3s ease; 
}
.event-card:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 12px 0 rgba(177, 177, 177, 0.2);
}
.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
