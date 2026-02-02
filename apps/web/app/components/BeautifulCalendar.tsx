import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BeautifulCalendarProps {
  onDateSelect: (date: string) => void
  selectedDate?: string
  availableDates?: string[]
}

export function BeautifulCalendar({ onDateSelect, selectedDate, availableDates = [] }: BeautifulCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const weeks: (number | null)[][] = []
  let week: (number | null)[] = Array(firstDay).fill(null)

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length > 0) {
    week.push(...Array(7 - week.length).fill(null))
    weeks.push(week)
  }

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    const isBeforeCurrentMonth =
      prev.getFullYear() < startOfToday.getFullYear() ||
      (prev.getFullYear() === startOfToday.getFullYear() && prev.getMonth() < startOfToday.getMonth())

    if (!isBeforeCurrentMonth) {
      setCurrentMonth(prev)
    }
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDayClick = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (selected < startOfToday) return
    const dateStr = selected.toISOString().split('T')[0]
    onDateSelect(dateStr)
  }

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateStr = date.toISOString().split('T')[0]
    return dateStr === selectedDate
  }

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const isPastDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date < startOfToday
  }

  return (
    <div className="bg-gradient-to-br from-primary/40 to-primary/20 rounded-2xl p-6 border border-accent/30 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-text hover:text-accent"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-gradient">{monthName}</h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-text hover:text-accent"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-bold text-muted py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2">
        {weeks.map((week, weekIdx) =>
          week.map((day, dayIdx) => (
            <button
              key={`${weekIdx}-${dayIdx}`}
              onClick={() => day && handleDayClick(day)}
              disabled={!day || (day !== null && isPastDate(day))}
              className={`
                aspect-square rounded-lg font-semibold text-sm transition-all relative overflow-hidden
                ${!day ? 'text-transparent' : ''}
                ${day && isPastDate(day) ? 'bg-primary/10 text-muted/40 cursor-not-allowed' : ''}
                ${isDateSelected(day!) ? 'bg-accent text-primary shadow-lg shadow-accent/50' : ''}
                ${!isDateSelected(day!) && day ? 'bg-primary/30 text-text hover:bg-accent/40 hover:text-accent' : ''}
                ${isToday(day!) && !isDateSelected(day!) ? 'ring-2 ring-accent/50' : ''}
              `}
            >
              {day && (
                <>
                  {isToday(day) && !isDateSelected(day) && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-accent/20 to-transparent" />
                  )}
                  <span className="relative">{day}</span>
                </>
              )}
            </button>
          ))
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-accent/20 flex items-center gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent/50 ring-1 ring-accent" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  )
}
