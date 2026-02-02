import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const getStripe = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY')
  }
  return new Stripe(stripeSecretKey)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { payment_intent } = body

    if (!payment_intent) {
      return NextResponse.json({ error: 'Missing payment_intent' }, { status: 400 })
    }

    const stripe = getStripe()
    const refund = await stripe.refunds.create({
      payment_intent,
    })

    return NextResponse.json({ refund })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to process refund.' }, { status: 500 })
  }
}
