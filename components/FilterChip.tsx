'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterChipProps {
  label: string
  selected: boolean
  onToggle: () => void
  className?: string
}

export function FilterChip({ label, selected, onToggle, className }: FilterChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background',
        selected
          ? 'bg-accent text-primary shadow-md'
          : 'bg-surface text-muted border border-border hover:border-accent/50 hover:text-text',
        className
      )}
      aria-pressed={selected}
    >
      <span className="flex items-center gap-2">
        {label}
        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-3.5 h-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  )
}

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function FilterPanel({ isOpen, onClose, children }: FilterPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-surface border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-text">Filters</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-primary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
