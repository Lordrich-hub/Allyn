'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Plus, Trash2, Save } from 'lucide-react'

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
}

interface DaySchedule {
  day: string
  enabled: boolean
  timeSlots: TimeSlot[]
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    DAYS_OF_WEEK.map((day) => ({
      day,
      enabled: day !== 'Sunday',
      timeSlots: [{ id: '1', startTime: '09:00', endTime: '17:00' }],
    }))
  )
  const [saving, setSaving] = useState(false)

  const toggleDay = (dayIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].enabled = !newSchedule[dayIndex].enabled
    setSchedule(newSchedule)
  }

  const addTimeSlot = (dayIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].timeSlots.push({
      id: Date.now().toString(),
      startTime: '09:00',
      endTime: '17:00',
    })
    setSchedule(newSchedule)
  }

  const removeTimeSlot = (dayIndex: number, slotId: string) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].timeSlots = newSchedule[dayIndex].timeSlots.filter(
      (slot) => slot.id !== slotId
    )
    setSchedule(newSchedule)
  }

  const updateTimeSlot = (
    dayIndex: number,
    slotId: string,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    const newSchedule = [...schedule]
    const slot = newSchedule[dayIndex].timeSlots.find((s) => s.id === slotId)
    if (slot) {
      slot[field] = value
      setSchedule(newSchedule)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO: Save to Supabase
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/vendor"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gradient mb-2">Availability Schedule</h1>
          <p className="text-muted">
            Set your working hours so customers can only book when you&apos;re available
          </p>
        </div>

        <div className="space-y-6">
          {schedule.map((daySchedule, dayIndex) => (
            <motion.div
              key={daySchedule.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.05 }}
              className="bg-surface border border-border rounded-lg p-6"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={daySchedule.enabled}
                    onChange={() => toggleDay(dayIndex)}
                    className="w-5 h-5 accent-accent rounded border-border focus-ring"
                  />
                  <h3 className="text-lg font-semibold text-text">{daySchedule.day}</h3>
                </div>
                {daySchedule.enabled && (
                  <button
                    onClick={() => addTimeSlot(dayIndex)}
                    className="text-accent hover:text-accent/80 transition-colors text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Time Slot
                  </button>
                )}
              </div>

              {/* Time Slots */}
              {daySchedule.enabled && (
                <div className="space-y-3 pl-8">
                  {daySchedule.timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center gap-3 bg-primary/50 rounded-lg p-3"
                    >
                      <Clock className="w-4 h-4 text-muted flex-shrink-0" />
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) =>
                          updateTimeSlot(dayIndex, slot.id, 'startTime', e.target.value)
                        }
                        className="bg-background border border-border rounded px-3 py-1.5 text-text focus-ring"
                      />
                      <span className="text-muted">to</span>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) =>
                          updateTimeSlot(dayIndex, slot.id, 'endTime', e.target.value)
                        }
                        className="bg-background border border-border rounded px-3 py-1.5 text-text focus-ring"
                      />
                      {daySchedule.timeSlots.length > 1 && (
                        <button
                          onClick={() => removeTimeSlot(dayIndex, slot.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {daySchedule.timeSlots.length === 0 && (
                    <p className="text-muted text-sm">No time slots added</p>
                  )}
                </div>
              )}

              {!daySchedule.enabled && (
                <p className="text-muted text-sm pl-8">Not available on this day</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary px-8 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Schedule'}
          </button>
        </div>
      </div>
    </div>
  )
}
