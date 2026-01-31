'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageSquare, Search, ChevronLeft, Clock } from 'lucide-react'

// Mock conversations
const MOCK_CONVERSATIONS = [
  {
    id: '1',
    vendorName: 'Divine Hair Studio',
    lastMessage: 'Sounds great! See you on Saturday.',
    timestamp: '2 hours ago',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    vendorName: 'Authentic Jollof Kitchen',
    lastMessage: 'We can definitely cater for 50 people',
    timestamp: '5 hours ago',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    vendorName: 'Kente Designs Tailor',
    lastMessage: 'Your order is ready for pickup!',
    timestamp: '1 day ago',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
  },
]

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  const filteredConversations = MOCK_CONVERSATIONS.filter((conv) =>
    conv.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (selectedConversation) {
    return <ChatDetail conversationId={selectedConversation} onBack={() => setSelectedConversation(null)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4">
          <h1 className="text-2xl font-bold text-text mb-4">Messages</h1>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted/50 focus-ring"
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="container-custom py-6">
        {filteredConversations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageSquare className="w-16 h-16 text-muted/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-text mb-2">No conversations</h3>
            <p className="text-muted">Start messaging vendors after booking a service</p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conv, index) => (
              <motion.button
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full p-4 rounded-lg border transition-all text-left hover:border-accent ${
                  conv.unread
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-border hover:bg-primary'
                }`}
              >
                <div className="flex gap-4">
                  <img
                    src={conv.avatar}
                    alt={conv.vendorName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-${conv.unread ? 'bold' : 'semibold'} text-text`}>
                        {conv.vendorName}
                      </h3>
                      <span className="text-xs text-muted">{conv.timestamp}</span>
                    </div>
                    <p className={`truncate ${
                      conv.unread ? 'text-text font-medium' : 'text-muted'
                    }`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread && (
                    <div className="w-3 h-3 bg-accent rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Chat Detail Component
function ChatDetail({ conversationId, onBack }: { conversationId: string; onBack: () => void }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'vendor',
      text: 'Hi! Thanks for your booking inquiry.',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      sender: 'customer',
      text: 'Hi! Can you do the braids on Saturday?',
      timestamp: '2 hours ago',
    },
    {
      id: '3',
      sender: 'vendor',
      text: 'Sounds great! See you on Saturday.',
      timestamp: '2 hours ago',
    },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        sender: 'customer',
        text: newMessage,
        timestamp: 'just now',
      },
    ])
    setNewMessage('')
  }

  const vendor = MOCK_CONVERSATIONS.find((c) => c.id === conversationId)

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface border-b border-border px-4 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-accent hover:underline"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <div className="flex-1">
          <h2 className="font-bold text-text">{vendor?.vendorName}</h2>
          <p className="text-xs text-muted">Active now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'customer'
                  ? 'bg-accent text-primary'
                  : 'bg-primary border border-border text-text'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'customer'
                  ? 'text-primary/70'
                  : 'text-muted'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-border bg-surface p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-primary border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus-ring"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="btn-primary px-6 py-3 rounded-lg disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
