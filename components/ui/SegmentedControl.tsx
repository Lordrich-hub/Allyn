'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SegmentedControlProps {
  options: { value: string; label: string; icon?: React.ReactNode }[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  const selectedIndex = options.findIndex((opt) => opt.value === value)

  return (
    <div
      className={cn(
        'inline-flex bg-primary border border-border rounded-lg p-1 relative',
        className
      )}
      role="tablist"
      aria-label="View toggle"
    >
      {/* Animated background */}
      <motion.div
        className="absolute top-1 bottom-1 bg-accent rounded-md"
        initial={false}
        animate={{
          left: `${(selectedIndex / options.length) * 100}%`,
          width: `${(1 / options.length) * 100}%`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />

      {/* Options */}
      {options.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 px-6 py-2 text-sm font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background',
              isSelected ? 'text-primary' : 'text-muted hover:text-text'
            )}
            role="tab"
            aria-selected={isSelected}
            aria-label={option.label}
          >
            <span className="flex items-center gap-2">
              {option.icon}
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
