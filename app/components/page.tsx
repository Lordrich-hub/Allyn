'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Home, Star, Search, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton, VendorCardSkeleton } from '@/components/ui/Skeleton'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { FilterChip } from '@/components/FilterChip'
import { useToast } from '@/components/ui/Toast'

export default function ComponentsPage() {
  const { showToast } = useToast()
  const [view, setView] = useState('grid')
  const [selectedChip, setSelectedChip] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Component Showcase
          </h1>
          <p className="text-muted text-lg">
            AfroLuxe Design System - Premium UI Components
          </p>
        </motion.div>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="verified" icon={<CheckCircle className="w-3.5 h-3.5" />}>
              Verified
            </Badge>
            <Badge variant="available">Available Today</Badge>
            <Badge variant="homeService" icon={<Home className="w-3.5 h-3.5" />}>
              Home Service
            </Badge>
            <Badge variant="default">Default Badge</Badge>
            <Badge variant="premium" icon={<Star className="w-3.5 h-3.5" />}>
              Premium
            </Badge>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Buttons</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="success">Success Button</Button>
              <Button variant="danger">Danger Button</Button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-2">Card Title</h3>
              <p className="text-muted">
                This is a premium card component with hover effects and animations.
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-text mb-2">Another Card</h3>
              <p className="text-muted">
                Cards automatically lift on hover and have a subtle border glow.
              </p>
            </Card>
            <Card hover={false}>
              <h3 className="text-lg font-semibold text-text mb-2">No Hover</h3>
              <p className="text-muted">
                This card has hover effects disabled for static content.
              </p>
            </Card>
          </div>
        </section>

        {/* Segmented Control */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Segmented Control</h2>
          <SegmentedControl
            options={[
              { value: 'grid', label: 'Grid' },
              { value: 'list', label: 'List' },
              { value: 'map', label: 'Map' },
            ]}
            value={view}
            onChange={setView}
          />
        </section>

        {/* Filter Chips */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Filter Chips</h2>
          <div className="flex flex-wrap gap-3">
            <FilterChip
              label="Selected Chip"
              selected={selectedChip}
              onToggle={() => setSelectedChip(!selectedChip)}
            />
            <FilterChip
              label="Not Selected"
              selected={false}
              onToggle={() => {}}
            />
            <FilterChip label="Hair Styling" selected={false} onToggle={() => {}} />
            <FilterChip label="Catering" selected={true} onToggle={() => {}} />
            <FilterChip label="Tech Services" selected={false} onToggle={() => {}} />
          </div>
        </section>

        {/* Toast Notifications */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Toast Notifications</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => showToast('success', 'Success! Operation completed.')}>
              Show Success Toast
            </Button>
            <Button onClick={() => showToast('error', 'Error! Something went wrong.')}>
              Show Error Toast
            </Button>
            <Button onClick={() => showToast('info', 'Info: This is an informational message.')}>
              Show Info Toast
            </Button>
          </div>
        </section>

        {/* Skeletons */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Skeleton Loaders</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text mb-3">Basic Skeleton</h3>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text mb-3">Vendor Card Skeleton</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <VendorCardSkeleton />
                <VendorCardSkeleton />
                <VendorCardSkeleton />
              </div>
            </div>
          </div>
        </section>

        {/* Empty States */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Empty States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hover={false}>
              <EmptyState
                icon={<Search className="w-8 h-8" />}
                title="No results found"
                description="Try adjusting your search or filters."
              />
            </Card>
            <Card hover={false}>
              <EmptyState
                icon={<MessageCircle className="w-8 h-8" />}
                title="No messages yet"
                description="Start a conversation with a vendor."
                action={{
                  label: 'Browse Vendors',
                  onClick: () => showToast('info', 'Navigating to vendors...'),
                }}
              />
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-text">Heading 1 - Bold & Large</h1>
              <p className="text-muted">48px, font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-text">Heading 2 - Section Title</h2>
              <p className="text-muted">36px, font-bold</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-text">Heading 3 - Subsection</h3>
              <p className="text-muted">24px, font-semibold</p>
            </div>
            <div>
              <p className="text-text">Body text - Regular paragraph content</p>
              <p className="text-muted text-sm">16px, font-normal</p>
            </div>
            <div>
              <p className="text-muted">Muted text - Secondary information</p>
              <p className="text-muted text-sm">16px, text-muted</p>
            </div>
            <div>
              <p className="text-gradient text-2xl font-bold">Gradient Text - Premium Accent</p>
              <p className="text-muted text-sm">Gold to green gradient</p>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-background border border-border rounded-lg"></div>
              <p className="text-sm text-muted">Background</p>
              <code className="text-xs text-accent">#0B1220</code>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-surface border border-border rounded-lg"></div>
              <p className="text-sm text-muted">Surface</p>
              <code className="text-xs text-accent">#111827</code>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-primary border border-border rounded-lg"></div>
              <p className="text-sm text-muted">Primary</p>
              <code className="text-xs text-accent">#0F172A</code>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-accent rounded-lg"></div>
              <p className="text-sm text-muted">Accent</p>
              <code className="text-xs text-accent">#F59E0B</code>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-accent-secondary rounded-lg"></div>
              <p className="text-sm text-muted">Secondary</p>
              <code className="text-xs text-accent">#22C55E</code>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-text rounded-lg"></div>
              <p className="text-sm text-muted">Text</p>
              <code className="text-xs text-accent">#E5E7EB</code>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-muted rounded-lg"></div>
              <p className="text-sm text-muted">Muted</p>
              <code className="text-xs text-accent">#94A3B8</code>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-border rounded-lg border border-text"></div>
              <p className="text-sm text-muted">Border</p>
              <code className="text-xs text-accent">#1F2937</code>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
