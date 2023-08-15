import type { Passenger } from "@/type";
import {defineStore} from 'pinia'
export const useEventStore = defineStore('event', {
    state:()=>({
        event: null as Passenger | null
    }),actions:{
        setEvent(evnt: Passenger){
            this.event = evnt
        }
    }
})