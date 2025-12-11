'use client'

import { Class } from '@/types'
import { formatTime } from '@/lib/timeUtils'

interface ClassCardProps {
  classData: Class
  onEdit?: (classData: Class) => void
  onDelete?: (id: string) => void
}

export default function ClassCard({ classData, onEdit, onDelete }: ClassCardProps) {
  const duration = calculateDuration(classData.start_time, classData.end_time)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-800">{classData.title}</h3>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(classData)}
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(classData.id)}
              className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-2">Prof. {classData.professor}</p>

      <div className="flex items-center text-gray-700 text-sm mb-2">
        <span className="font-semibold">Time:</span>
        <span className="ml-2">
          {formatTime(classData.start_time)} - {formatTime(classData.end_time)}
        </span>
        <span className="ml-2 text-gray-500">({duration}h)</span>
      </div>

      <div className="flex items-center text-gray-700 text-sm mb-2">
        <span className="font-semibold">Location:</span>
        <span className="ml-2">
          {classData.building} - Room {classData.room}
        </span>
      </div>

      <div className="flex items-center text-gray-700 text-sm">
        <span className="font-semibold">Credits:</span>
        <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {classData.credits}
        </span>
      </div>
    </div>
  )
}

function calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)

  const startTotalMin = startHour * 60 + startMin
  const endTotalMin = endHour * 60 + endMin

  return (endTotalMin - startTotalMin) / 60
}
