'use client'

import { useState } from 'react'
import { Exam } from '@/types'

interface ExamFormProps {
  classId: string
  className: string
  onSubmit: (exam: Omit<Exam, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  initialData?: Exam
  isLoading?: boolean
}

const EXAM_TYPES = [
  { value: 'written', label: 'Written' },
  { value: 'oral', label: 'Oral' },
  { value: 'mixed', label: 'Mixed' },
]

export default function ExamForm({
  classId,
  className,
  onSubmit,
  initialData,
  isLoading = false,
}: ExamFormProps) {
  const [formData, setFormData] = useState({
    exam_date: initialData?.exam_date || '',
    exam_time: initialData?.exam_time || '09:00',
    location: initialData?.location || '',
    exam_type: (initialData?.exam_type as 'written' | 'oral' | 'mixed') || 'written',
  })

  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.exam_date) {
      setError('Please select an exam date')
      return
    }

    try {
      await onSubmit({
        class_id: classId,
        ...formData,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        {initialData ? 'Edit Exam' : 'Schedule Exam'}
      </h2>
      <p className="text-gray-600 mb-6">for {className}</p>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Exam Date *</label>
          <input
            type="date"
            name="exam_date"
            value={formData.exam_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Exam Time</label>
          <input
            type="time"
            name="exam_time"
            value={formData.exam_time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Room 201, Building B"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Exam Type</label>
          <select
            name="exam_type"
            value={formData.exam_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {EXAM_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Exam' : 'Schedule Exam'}
      </button>
    </form>
  )
}
