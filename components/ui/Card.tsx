'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export function Card({ children, hover = true, className, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-surface border border-border rounded-xl p-6 transition-all',
        hover && 'hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5',
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
