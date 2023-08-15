import type { EventItem } from "@/type";
import {defineStore} from 'pinia'
export const useEventStore = defineStore('event', {
    state:()=>({
        event: null as EventItem | null
    }),actions:{
        setEvent(evnt: EventItem){
            this.event = evnt
        }
    }
})