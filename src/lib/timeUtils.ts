export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const minute = parseInt(minutes, 10)

  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

export function getDayName(dayOfWeek: number): string {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return days[dayOfWeek] || 'Unknown'
}

export function getDayShortName(dayOfWeek: number): string {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days[dayOfWeek] || 'Unknown'
}

export function calculateDurationInHours(startTime: string, endTime: string): number {
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)

  const startTotalMin = startHour * 60 + startMin
  const endTotalMin = endHour * 60 + endMin

  return (endTotalMin - startTotalMin) / 60
}

export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
