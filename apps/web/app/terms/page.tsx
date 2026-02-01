'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using Allyn, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      title: 'Use License',
      content: 'Permission is granted to temporarily download one copy of the materials (information or software) on Allyn for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials, use the materials for any commercial purpose or for any public display, attempt to reverse engineer any software contained on Allyn, transfer the materials to another person or "mirror" the materials on any other server.',
    },
    {
      title: 'Disclaimer',
      content: 'The materials on Allyn are provided on an "as is" basis. Allyn makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      title: 'Limitations',
      content: 'In no event shall Allyn or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Allyn, even if Allyn or an authorized representative has been notified orally or in writing of the possibility of such damage.',
    },
    {
      title: 'Accuracy of Materials',
      content: 'The materials appearing on Allyn could include technical, typographical, or photographic errors. Allyn does not warrant that any of the materials on its website are accurate, complete, or current. Allyn may make changes to the materials contained on its website at any time without notice.',
    },
    {
      title: 'Links',
      content: 'Allyn has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Allyn of the site. Use of any such linked website is at the user\'s own risk.',
    },
    {
      title: 'Modifications',
      content: 'Allyn may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
    },
    {
      title: 'Governing Law',
      content: 'These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom, and you irrevocably submit to the exclusive jurisdiction of the courts located in England.',
    },
    {
      title: 'User Responsibilities',
      content: 'Users agree to use Allyn only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of Allyn. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.',
    },
    {
      title: 'Vendor Obligations',
      content: 'Vendors on our platform are responsible for maintaining the accuracy of their service listings, availability calendars, and pricing. Vendors must provide services as described and treat all customers professionally and respectfully. Allyn reserves the right to remove vendors who violate these terms.',
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
            <BookOpen className="w-8 h-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-text">Terms of Service</h1>
          </div>
          <p className="text-muted text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="space-y-8"
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
          <p className="text-muted mb-6">Questions about our terms?</p>
          <Link href="/contact" className="btn-primary px-8 py-3 rounded-lg font-semibold inline-block">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
