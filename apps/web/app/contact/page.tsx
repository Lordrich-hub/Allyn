'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-accent hover:underline">
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>
        </div>
      </div>

      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Get in Touch</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">Have questions or feedback? We&apos;d love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          {[
            { icon: <Mail className="w-6 h-6" />, title: 'Email', content: 'support@allyn.co.uk' },
            { icon: <Phone className="w-6 h-6" />, title: 'Phone', content: '+44 20 1234 5678' },
            { icon: <MapPin className="w-6 h-6" />, title: 'Location', content: 'London, UK' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 text-center"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-2">{item.title}</h3>
              <p className="text-muted">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto card p-8"
        >
          <h2 className="text-2xl font-bold text-text mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-primary border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus-ring"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-primary border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus-ring"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus-ring"
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-text placeholder:text-muted/50 focus-ring resize-none"
            />
            <button
              type="submit"
              className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400 text-center"
            >
              ✓ Message sent successfully! We&apos;ll get back to you soon.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
