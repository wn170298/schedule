'use client'

import { useState } from 'react'
import { Class } from '@/types'

interface ClassFormProps {
  onSubmit: (classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  initialData?: Class
  isLoading?: boolean
}

const DAYS_OF_WEEK = [
  { value: 0, label: 'Monday' },
  { value: 1, label: 'Tuesday' },
  { value: 2, label: 'Wednesday' },
  { value: 3, label: 'Thursday' },
  { value: 4, label: 'Friday' },
  { value: 5, label: 'Saturday' },
  { value: 6, label: 'Sunday' },
]

export default function ClassForm({ onSubmit, initialData, isLoading = false }: ClassFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    professor: initialData?.professor || '',
    building: initialData?.building || '',
    room: initialData?.room || '',
    day_of_week: initialData?.day_of_week || 0,
    start_time: initialData?.start_time || '09:00',
    end_time: initialData?.end_time || '11:00',
    credits: initialData?.credits || 6,
  })

  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelect>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'credits' || name === 'day_of_week' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title || !formData.professor) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.start_time >= formData.end_time) {
      setError('End time must be after start time')
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {initialData ? 'Edit Class' : 'Add New Class'}
      </h2>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Class Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Data Structures"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Professor *</label>
          <input
            type="text"
            name="professor"
            value={formData.professor}
            onChange={handleChange}
            placeholder="e.g., Dr. Rossi"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Building</label>
          <input
            type="text"
            name="building"
            value={formData.building}
            onChange={handleChange}
            placeholder="e.g., Building A"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Room</label>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            placeholder="e.g., 101"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Day of Week</label>
          <select
            name="day_of_week"
            value={formData.day_of_week}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Credits</label>
          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            min="1"
            max="12"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Class' : 'Add Class'}
      </button>
    </form>
  )
}
