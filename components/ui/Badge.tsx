'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
  {
    variants: {
      variant: {
        verified: 'bg-accent/20 text-accent border border-accent/30',
        available: 'bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30',
        homeService: 'bg-primary text-muted border border-border',
        default: 'bg-surface text-text border border-border',
        premium: 'bg-gradient-to-r from-accent/20 to-accent-secondary/20 text-accent border border-accent/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

export function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="w-3.5 h-3.5">{icon}</span>}
      {children}
    </div>
  )
}
