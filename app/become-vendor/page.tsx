import Link from 'next/link'
import { Sora } from 'next/font/google'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Headset,
  LineChart,
  MapPin,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700'] })

const benefits = [
  {
    title: 'Reach diaspora customers',
    description:
      'Get discovered by people looking for trusted African services in their city.',
    icon: <MapPin className="h-6 w-6" />,
  },
  {
    title: 'Stand out with verification',
    description:
      'Verified profiles build confidence and help you win bookings faster.',
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: 'Get paid reliably',
    description:
      'Secure payments and clear booking details so you can focus on the service.',
    icon: <Wallet className="h-6 w-6" />,
  },
]

const steps = [
  {
    title: 'Apply in minutes',
    description: 'Tell us about your service, experience, and service area.',
  },
  {
    title: 'Verify and publish',
    description: 'We review your profile and confirm your business details.',
  },
  {
    title: 'Accept bookings',
    description: 'Get requests, chat with customers, and confirm availability.',
  },
  {
    title: 'Grow with insights',
    description: 'Track bookings, ratings, and repeat customers in your dashboard.',
  },
]

const requirements = [
  'Business name and service category',
  'Service area or travel radius',
  'Portfolio photos or recent work samples',
  'Valid contact details for verification',
]

export default function BecomeVendorPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent-secondary/15" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="container-custom relative py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="premium" className="mb-6">
                <BadgeCheck className="h-4 w-4" />
                Become a verified vendor
              </Badge>
              <h1
                className={`${sora.className} text-4xl md:text-6xl font-bold text-text leading-tight`}
              >
                Grow your business with AfroLuxe
              </h1>
              <p className="mt-6 text-lg text-muted max-w-xl">
                Join a marketplace built for the diaspora. Showcase your services,
                build trust, and fill your calendar with new customers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/become-vendor">
                  <Button size="lg" className="group">
                    Request vendor onboarding
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/search">
                  <Button size="lg" variant="secondary">
                    View the marketplace
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-surface/90 border-accent/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-muted">Next available</p>
                    <p className="text-2xl font-bold text-text">This week</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-4 text-muted">
                  Get listed quickly after verification and start receiving requests.
                </p>
              </Card>

              <Card className="bg-surface/90 border-accent-secondary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-muted">Vendor support</p>
                    <p className="text-2xl font-bold text-text">Fast responses</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-accent-secondary/15 text-accent-secondary flex items-center justify-center">
                    <Headset className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-4 text-muted">
                  Dedicated onboarding and a team that helps you succeed.
                </p>
              </Card>

              <Card className="bg-surface/90 border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-muted">Performance</p>
                    <p className="text-2xl font-bold text-text">Track growth</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-primary text-text flex items-center justify-center">
                    <LineChart className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-4 text-muted">
                  See your booking trends, ratings, and repeat customers.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-16">
        <div className="flex items-center justify-between flex-wrap gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-wide text-muted">Why vendors choose us</p>
            <h2 className={`${sora.className} text-3xl md:text-4xl font-bold text-text`}>
              Built to help you win
            </h2>
          </div>
          <Badge variant="verified">Trusted marketplace</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <div className="h-12 w-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-text">{benefit.title}</h3>
              <p className="mt-3 text-muted">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-sm uppercase tracking-wide text-muted">How it works</p>
            <h2 className={`${sora.className} text-3xl md:text-4xl font-bold text-text mt-2`}>
              A clear path to onboarding
            </h2>
            <p className="mt-4 text-muted max-w-lg">
              We keep the process straightforward so you can launch your listing quickly
              and focus on delivering great service.
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card key={step.title} className="bg-surface/80">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/15 text-accent flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                    <p className="mt-2 text-muted">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
            <h3 className={`${sora.className} text-2xl font-bold text-text`}>
              What we need from you
            </h3>
            <ul className="mt-6 space-y-3 text-muted">
              {requirements.map((requirement) => (
                <li key={requirement} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  {requirement}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Have more questions? Our team will walk you through each step.
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-accent-secondary/10 to-transparent border-accent-secondary/20">
            <h3 className={`${sora.className} text-2xl font-bold text-text`}>
              Support from day one
            </h3>
            <p className="mt-4 text-muted">
              You will get a vendor success manager, onboarding resources, and tips
              to increase bookings and repeat customers.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent-secondary/15 text-accent-secondary flex items-center justify-center">
                  <Headset className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Dedicated support</p>
                  <p className="text-xs text-muted">Real humans, fast replies</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent-secondary/15 text-accent-secondary flex items-center justify-center">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Profile review</p>
                  <p className="text-xs text-muted">Improve your listing</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="container-custom pb-20">
        <Card className="text-center bg-gradient-to-r from-accent/15 via-transparent to-accent-secondary/15 border-accent/20">
          <div className="max-w-2xl mx-auto">
            <h2 className={`${sora.className} text-3xl md:text-4xl font-bold text-text`}>
              Ready to become a vendor?
            </h2>
            <p className="mt-4 text-muted">
              Apply today and start building your reputation with customers who value quality.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/become-vendor">
                <Button size="lg">Request vendor onboarding</Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline">
                  Explore the marketplace
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
