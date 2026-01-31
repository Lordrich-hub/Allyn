'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { mockConversations } from '@/lib/mock-data'
import { Conversation } from '@/lib/types'
import { ChatListSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'

export default function ChatPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setConversations(mockConversations)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-primary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-text">Messages</h1>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="container-custom py-6">
        {isLoading ? (
          <ChatListSkeleton />
        ) : conversations.length > 0 ? (
          <div className="space-y-2">
            {conversations.map((conversation, index) => (
              <motion.button
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/chat/${conversation.id}`)}
                className="w-full flex items-center gap-4 p-4 bg-surface hover:bg-primary border border-border hover:border-accent/30 rounded-xl transition-all text-left focus:outline-none focus:ring-2 focus:ring-accent group"
              >
                {/* Vendor Image */}
                <div className="relative flex-shrink-0">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={conversation.vendorImage}
                      alt={conversation.vendorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {conversation.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-text group-hover:text-accent transition-colors truncate">
                      {conversation.vendorName}
                    </h3>
                    <span className="text-xs text-muted flex-shrink-0 ml-2">
                      {formatTime(conversation.timestamp)}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate ${
                      conversation.unread > 0 ? 'text-text font-medium' : 'text-muted'
                    }`}
                  >
                    {conversation.lastMessage}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<MessageCircle className="w-8 h-8" />}
            title="No conversations yet"
            description="Start chatting with vendors to discuss services and bookings."
            action={{
              label: 'Browse Vendors',
              onClick: () => router.push('/search'),
            }}
          />
        )}
      </div>
    </div>
  )
}
