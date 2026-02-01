'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Introduction',
      content: 'At Allyn, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our marketplace and use our services.',
    },
    {
      title: 'Information We Collect',
      content: 'We collect information you voluntarily provide when registering for an account, listing services, booking appointments, or contacting us. This may include your name, email, phone number, address, and payment information. We also automatically collect information about your device, IP address, and browsing activity.',
    },
    {
      title: 'How We Use Your Information',
      content: 'We use your information to provide, maintain, and improve our services, process transactions, send administrative information, respond to inquiries, and comply with legal obligations. We may also use it for marketing purposes with your consent.',
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell your personal information. We may share information with service providers who assist us in operating our website and conducting our business. We may also disclose information when required by law or to protect our rights and safety.',
    },
    {
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is completely secure.',
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. You may also opt-out of marketing communications at any time. To exercise these rights, please contact us using the information provided in our Contact page.',
    },
    {
      title: 'Cookies',
      content: 'We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and understand how you use our platform. You can control cookie settings through your browser.',
    },
    {
      title: 'Children\'s Privacy',
      content: 'Our services are not intended for children under 18 years old. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete this information promptly.',
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by updating the effective date.',
    },
    {
      title: 'Contact Us',
      content: 'If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@allyn.co.uk or visit our Contact page.',
    },
  ]

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
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-text">Privacy Policy</h1>
          </div>
          <p className="text-muted text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="prose prose-invert max-w-none space-y-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold text-text mb-4 flex items-center gap-2">
                <span className="text-accent">{index + 1}.</span>
                {section.title}
              </h2>
              <p className="text-muted leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 card p-8 text-center bg-gradient-to-br from-accent/10 to-accent-secondary/10"
        >
          <p className="text-muted mb-6">Have privacy concerns or questions?</p>
          <Link href="/contact" className="btn-primary px-8 py-3 rounded-lg font-semibold inline-block">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
