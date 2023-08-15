import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AxiosResponse } from 'axios'
import type { Passenger } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/se331-2022/passengerdb',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPassenger(perPage: number, page: number): Promise<AxiosResponse<Passenger[]>> {
    return apiClient.get<Passenger[]>('/passenger?_limit='+perPage+ '&_page='+ page)
  },
  getPassengerById(id: number): Promise<AxiosResponse<Passenger>> {
    return apiClient.get<Passenger>('passenger/' + id.toString())
  }
}
