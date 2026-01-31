'use client'

import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 text-muted">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-muted text-sm max-w-md mb-6">{description}</p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
