export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: string
}

export interface Student {
  id: number
  student_number: string
  name: string
  surname: string
  gpa: number
  image: string
  penAmount: number
  desc: string
}
