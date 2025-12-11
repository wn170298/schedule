'use client'

import { ClassWithExam } from '@/types'
import ClassCard from './ClassCard'
import { getDayName } from '@/lib/timeUtils'

interface WeeklyViewProps {
  schedule: { [dayOfWeek: number]: ClassWithExam[] }
  onEdit?: (classData: ClassWithExam) => void
  onDelete?: (id: string) => void
}

export default function WeeklyView({ schedule, onEdit, onDelete }: WeeklyViewProps) {
  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {daysOfWeek.map((day) => (
        <div key={day} className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            {getDayName(day)}
          </h2>

          {schedule[day] && schedule[day].length > 0 ? (
            <div className="space-y-3">
              {schedule[day]
                .sort((a, b) => a.start_time.localeCompare(b.start_time))
                .map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    classData={classItem}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No classes scheduled</p>
          )}
        </div>
      ))}
    </div>
  )
}
