'use client'

import { useState, useEffect } from 'react'
import ClassForm from '@/components/ClassForm'
import WeeklyView from '@/components/WeeklyView'
import ExamForm from '@/components/ExamForm'
import {
  fetchClasses,
  fetchWeeklySchedule,
  createClass,
  updateClass,
  deleteClass,
  createExam,
  deleteExam,
  fetchExamsByClass,
} from '@/lib/scheduleService'
import { Class, ClassWithExam, Exam } from '@/types'

type ViewMode = 'schedule' | 'add-class' | 'add-exam'

export default function Home() {
  const [schedule, setSchedule] = useState<{ [dayOfWeek: number]: ClassWithExam[] }>({})
  const [viewMode, setViewMode] = useState<ViewMode>('schedule')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState<ClassWithExam | null>(null)
  const [classes, setClasses] = useState<Class[]>([])

  // Load schedule on mount
  useEffect(() => {
    loadSchedule()
  }, [])

  const loadSchedule = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const weeklySchedule = await fetchWeeklySchedule()
      setSchedule(weeklySchedule)

      const allClasses = await fetchClasses()
      setClasses(allClasses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load schedule')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddClass = async (classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await createClass(classData)
      setSuccess('Class added successfully!')
      setViewMode('schedule')
      await loadSchedule()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add class')
    }
  }

  const handleUpdateClass = async (classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) => {
    if (!selectedClass) return

    try {
      await updateClass(selectedClass.id, classData)
      setSuccess('Class updated successfully!')
      setViewMode('schedule')
      setSelectedClass(null)
      await loadSchedule()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update class')
    }
  }

  const handleDeleteClass = async (id: string) => {
    if (!confirm('Are you sure you want to delete this class?')) return

    try {
      // Delete associated exams first
      const exams = await fetchExamsByClass(id)
      for (const exam of exams) {
        await deleteExam(exam.id)
      }

      await deleteClass(id)
      setSuccess('Class deleted successfully!')
      await loadSchedule()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete class')
    }
  }

  const handleAddExam = async (examData: Omit<Exam, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await createExam(examData)
      setSuccess('Exam scheduled successfully!')
      setViewMode('schedule')
      setSelectedClass(null)
      await loadSchedule()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule exam')
    }
  }

  const handleEditClick = (classData: ClassWithExam) => {
    setSelectedClass(classData)
    setViewMode('add-class')
  }

  const handleAddExamClick = (classData: ClassWithExam) => {
    setSelectedClass(classData)
    setViewMode('add-exam')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading your schedule...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex justify-between items-center">
          <span>{success}</span>
          <button
            onClick={() => setSuccess(null)}
            className="text-green-700 hover:text-green-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* View Toggle */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => {
            setViewMode('schedule')
            setSelectedClass(null)
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            viewMode === 'schedule'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          📅 View Schedule
        </button>
        <button
          onClick={() => {
            setViewMode('add-class')
            setSelectedClass(null)
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            viewMode === 'add-class'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          ➕ Add Class
        </button>
      </div>

      {/* Content */}
      {viewMode === 'schedule' && (
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Weekly Schedule</h2>
          <p className="text-gray-600 mb-6">
            Total Classes: <strong>{classes.length}</strong> | Total Credits:{' '}
            <strong>{classes.reduce((sum: number, c: Class) => sum + c.credits, 0)}</strong>
          </p>
          <WeeklyView schedule={schedule} onEdit={handleEditClick} onDelete={handleDeleteClass} />
        </div>
      )}

      {viewMode === 'add-class' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ClassForm
              onSubmit={selectedClass ? handleUpdateClass : handleAddClass}
              initialData={selectedClass || undefined}
            />
          </div>

          {selectedClass && (
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Class Details</h3>
              <div className="space-y-3 text-gray-700 mb-6">
                <p>
                  <strong>Title:</strong> {selectedClass.title}
                </p>
                <p>
                  <strong>Professor:</strong> {selectedClass.professor}
                </p>
                <p>
                  <strong>Location:</strong> {selectedClass.building} - Room {selectedClass.room}
                </p>
                <p>
                  <strong>Time:</strong> {selectedClass.start_time} - {selectedClass.end_time}
                </p>
                <p>
                  <strong>Credits:</strong> {selectedClass.credits}
                </p>
              </div>

              {selectedClass.exam ? (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                  <h4 className="font-bold text-green-800 mb-2">Exam Scheduled</h4>
                  <p className="text-sm text-gray-700">
                    <strong>Date:</strong> {selectedClass.exam.exam_date}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Time:</strong> {selectedClass.exam.exam_time}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Type:</strong> {selectedClass.exam.exam_type}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => handleAddExamClick(selectedClass)}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold"
                >
                  Schedule Exam
                </button>
              )}

              <button
                onClick={() => {
                  setSelectedClass(null)
                  setViewMode('schedule')
                }}
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {viewMode === 'add-exam' && selectedClass && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ExamForm
              classId={selectedClass.id}
              className={selectedClass.title}
              onSubmit={handleAddExam}
              initialData={selectedClass.exam}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Class Info</h3>
            <div className="space-y-2 text-gray-700 mb-6">
              <p>
                <strong>Title:</strong> {selectedClass.title}
              </p>
              <p>
                <strong>Professor:</strong> {selectedClass.professor}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedClass(null)
                setViewMode('schedule')
              }}
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
