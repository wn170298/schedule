// Type definitions for the schedule application

export interface Class {
  id: string
  title: string
  professor: string
  building: string
  room: string
  day_of_week: number // 0 = Monday, 6 = Sunday
  start_time: string // HH:MM format
  end_time: string // HH:MM format
  credits: number
  created_at: string
  updated_at: string
}

export interface Exam {
  id: string
  class_id: string
  exam_date: string // YYYY-MM-DD format
  exam_time: string // HH:MM format
  location: string
  exam_type: 'written' | 'oral' | 'mixed'
  created_at: string
  updated_at: string
}

export interface ClassWithExam extends Class {
  exam?: Exam
}

export interface WeeklySchedule {
  [dayOfWeek: number]: ClassWithExam[]
}
