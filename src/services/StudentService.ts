import axios from "axios";
import type { AxiosInstance } from "axios";
import type { AxiosResponse } from "axios";
import type { Student } from "@/type";

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://dv-student-backend-2019.appspot.com",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export default {
    getEvent(): Promise<AxiosResponse<Student[]>> {
        return apiClient.get<Student[]>('/students');
    }
};
