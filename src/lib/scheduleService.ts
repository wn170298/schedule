import { supabase } from './supabaseClient'
import { Class, Exam, ClassWithExam, WeeklySchedule } from '@/types'

/**
 * Fetch all classes for the user
 */
export async function fetchClasses(): Promise<Class[]> {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('day_of_week')
    .order('start_time')

  if (error) {
    throw new Error(`Failed to fetch classes: ${error.message}`)
  }

  return data || []
}

/**
 * Fetch a single class by ID
 */
export async function fetchClass(id: string): Promise<Class | null> {
  const { data, error } = await supabase.from('classes').select('*').eq('id', id).single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch class: ${error.message}`)
  }

  return data || null
}

/**
 * Create a new class
 */
export async function createClass(classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('classes')
    .insert([classData])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create class: ${error.message}`)
  }

  return data
}

/**
 * Update an existing class
 */
export async function updateClass(
  id: string,
  classData: Partial<Omit<Class, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('classes')
    .update(classData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update class: ${error.message}`)
  }

  return data
}

/**
 * Delete a class
 */
export async function deleteClass(id: string) {
  const { error } = await supabase.from('classes').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete class: ${error.message}`)
  }
}

/**
 * Fetch all exams
 */
export async function fetchExams(): Promise<Exam[]> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .order('exam_date')
    .order('exam_time')

  if (error) {
    throw new Error(`Failed to fetch exams: ${error.message}`)
  }

  return data || []
}

/**
 * Fetch exams for a specific class
 */
export async function fetchExamsByClass(classId: string): Promise<Exam[]> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('class_id', classId)
    .order('exam_date')

  if (error) {
    throw new Error(`Failed to fetch exams: ${error.message}`)
  }

  return data || []
}

/**
 * Create a new exam
 */
export async function createExam(examData: Omit<Exam, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase.from('exams').insert([examData]).select().single()

  if (error) {
    throw new Error(`Failed to create exam: ${error.message}`)
  }

  return data
}

/**
 * Update an existing exam
 */
export async function updateExam(
  id: string,
  examData: Partial<Omit<Exam, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('exams')
    .update(examData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update exam: ${error.message}`)
  }

  return data
}

/**
 * Delete an exam
 */
export async function deleteExam(id: string) {
  const { error } = await supabase.from('exams').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete exam: ${error.message}`)
  }
}

/**
 * Fetch classes with their associated exams organized by week
 */
export async function fetchWeeklySchedule(): Promise<WeeklySchedule> {
  const classes = await fetchClasses()
  const exams = await fetchExams()

  const schedule: WeeklySchedule = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }

  // Create a map of class_id to exam for quick lookup
  const examMap = new Map(exams.map((exam) => [exam.class_id, exam]))

  // Organize classes by day of week and add exam info
  classes.forEach((classItem) => {
    const classWithExam: ClassWithExam = {
      ...classItem,
      exam: examMap.get(classItem.id),
    }
    schedule[classItem.day_of_week].push(classWithExam)
  })

  return schedule
}
