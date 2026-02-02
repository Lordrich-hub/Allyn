import { headers } from 'next/headers';
import Stripe from 'stripe';

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY not configured');
  }
  return new Stripe(secretKey);
};

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = await req.text();
    const headersList = headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
      return Response.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return Response.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return Response.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          `Payment succeeded for intent: ${paymentIntent.id}`,
          paymentIntent.metadata
        );

        // TODO: Update booking status in Supabase
        // const bookingId = paymentIntent.metadata.booking_id;
        // await supabase
        //   .from('bookings')
        //   .update({ status: 'confirmed', deposit_paid: true, deposit_paid_at: new Date() })
        //   .eq('id', bookingId);

        // TODO: Update payment record
        // await supabase
        //   .from('payments')
        //   .update({ status: 'succeeded' })
        //   .eq('stripe_payment_intent_id', paymentIntent.id);

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error(
          `Payment failed for intent: ${paymentIntent.id}`,
          paymentIntent.last_payment_error
        );

        // TODO: Update payment status in Supabase
        // await supabase
        //   .from('payments')
        //   .update({ status: 'failed' })
        //   .eq('stripe_payment_intent_id', paymentIntent.id);

        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log(`Charge refunded: ${charge.id}`);

        // TODO: Update refund status in Supabase
        // const paymentIntentId = charge.payment_intent;
        // await supabase
        //   .from('refunds')
        //   .update({ status: 'succeeded' })
        //   .eq('stripe_refund_id', charge.id);

        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session completed: ${session.id}`);

        // TODO: Mark payment as completed and update booking status
        // const bookingId = session.metadata?.booking_id;
        // if (bookingId) {
        //   await supabase
        //     .from('bookings')
        //     .update({ status: 'confirmed', deposit_paid: true })
        //     .eq('id', bookingId);
        // }

        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session expired: ${session.id}`);

        // TODO: Update payment status to failed
        // await supabase
        //   .from('payments')
        //   .update({ status: 'cancelled' })
        //   .eq('stripe_session_id', session.id);

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
