'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send } from 'lucide-react'
import { mockConversations } from '@/lib/mock-data'
import { Conversation, Message } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

export default function ChatConversationPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const foundConversation = mockConversations.find((c) => c.id === params.id)
    setConversation(foundConversation || null)

    // Mock messages
    setMessages([
      {
        id: '1',
        senderId: 'user',
        receiverId: foundConversation?.vendorId || '',
        text: 'Hi! I\'m interested in your services.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: true,
      },
      {
        id: '2',
        senderId: foundConversation?.vendorId || '',
        receiverId: 'user',
        text: 'Hello! Thank you for reaching out. How can I help you today?',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        read: true,
      },
      {
        id: '3',
        senderId: 'user',
        receiverId: foundConversation?.vendorId || '',
        text: 'Do you have availability this weekend?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true,
      },
      {
        id: '4',
        senderId: foundConversation?.vendorId || '',
        receiverId: 'user',
        text: foundConversation?.lastMessage || 'Yes, I have availability this Saturday at 2PM',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        read: true,
      },
    ])
  }, [params.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return

    setIsSending(true)
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      receiverId: conversation?.vendorId || '',
      text: inputValue,
      timestamp: new Date(),
      read: false,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue('')
    showToast('success', 'Message sent')
    setIsSending(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-2">Conversation not found</h2>
          <Button onClick={() => router.push('/chat')}>Back to Messages</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/chat')}
              className="p-2 -ml-2 hover:bg-primary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Go back to messages"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={conversation.vendorImage}
                  alt={conversation.vendorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="font-semibold text-text">{conversation.vendorName}</h1>
                <p className="text-xs text-accent-secondary">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container-custom py-6 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => {
              const isUser = message.senderId === 'user'
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      isUser
                        ? 'bg-accent text-primary rounded-br-sm'
                        : 'bg-surface border border-border text-text rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isUser ? 'text-primary/70' : 'text-muted'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-surface border-t border-border">
        <div className="container-custom py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-primary border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              aria-label="Type a message"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isSending}
              loading={isSending}
              className="px-6"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
