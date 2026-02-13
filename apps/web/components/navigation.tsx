'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [isSignedIn, setIsSignedIn] = useState(false)
  
  useEffect(() => {
    const signedIn = pathname?.startsWith('/dashboard') || pathname?.startsWith('/chat')
    setIsSignedIn(signedIn)
  }, [pathname])
  
  // Only show auth buttons on home page or search page
  const isHomePage = pathname === '/'
  const isSearchPage = pathname === '/search'

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gradient">
            Allyn
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-primary font-bold">
                  JD
                </div>
              </Link>
            ) : (isHomePage || isSearchPage) ? (
              <Link href="/become-vendor" className="btn-primary text-sm">
                Become a Vendor
              </Link>
            ) : null}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            {isSignedIn ? (
              <Link href="/dashboard">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-primary font-bold text-sm">
                  JD
                </div>
              </Link>
            ) : (isHomePage || isSearchPage) ? (
              <Link href="/become-vendor" className="btn-primary text-sm px-3 py-2">
                Become a Vendor
              </Link>
            ) : null}
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
