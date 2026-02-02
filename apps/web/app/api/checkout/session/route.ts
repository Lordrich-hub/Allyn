import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const getStripe = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY')
  }
  return new Stripe(stripeSecretKey)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    })

    return NextResponse.json({
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email || null,
      metadata: session.metadata,
      payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to retrieve session.' }, { status: 500 })
  }
}
