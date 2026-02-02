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
    const {
      vendorName,
      vendorId,
      serviceName,
      totalAmount,
      depositPercentage,
      bookingDate,
      bookingTime,
      paymentMethod,
    } = body

    const depositAmount = Math.round(totalAmount * (depositPercentage / 100) * 100) / 100

    const origin = request.headers.get('origin') || 'https://allyn.vercel.app'

    const payment_method_types = (paymentMethod === 'bank'
      ? ['customer_balance']
      : ['card']) as Stripe.Checkout.SessionCreateParams.PaymentMethodType[]

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${vendorName} — ${serviceName} (Deposit)`,
              description: `Deposit for booking on ${bookingDate} at ${bookingTime}`,
            },
            unit_amount: Math.round(depositAmount * 100),
          },
          quantity: 1,
        },
      ],
      payment_method_options: paymentMethod === 'bank'
        ? {
            customer_balance: {
              funding_type: 'bank_transfer',
              bank_transfer: {
                type: 'gb_bank_transfer',
              },
            },
          }
        : undefined,
      metadata: {
        vendorId,
        vendorName,
        serviceName,
        bookingDate,
        bookingTime,
        depositPercentage: String(depositPercentage),
        paymentMethod,
      },
      success_url: `${origin}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/vendor/${vendorId}?payment=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 500 })
  }
}
