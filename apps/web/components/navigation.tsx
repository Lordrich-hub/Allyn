'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, MessageSquare, User, LayoutDashboard } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  
  // Hide navigation on auth pages
  if (pathname?.startsWith('/signin') || pathname?.startsWith('/signup')) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gradient">
            Allyn
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/" icon={Home}>Home</NavLink>
            <NavLink href="/search" icon={Search}>Search</NavLink>
            <NavLink href="/chat" icon={MessageSquare}>Messages</NavLink>
            <NavLink href="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/dashboard" className="btn-primary px-4 py-2 rounded-lg text-sm">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ 
  href, 
  icon: Icon, 
  children 
}: { 
  href: string
  icon: any
  children: React.ReactNode 
}) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(href + '/')
  
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? 'text-accent bg-accent/10'
          : 'text-muted hover:text-text hover:bg-primary'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{children}</span>
    </Link>
  )
}
