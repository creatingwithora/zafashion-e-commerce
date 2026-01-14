import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        // Update order status to 'paid'
        const { data, error } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            stripe_session_id: session.id,
            payment_status: 'completed'
          })
          .eq('email', session.customer_email!)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error updating order:', error);
        } else {
          console.log('Order updated to paid:', data);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.error('Payment failed:', failedPayment.id);

        // Optionally update order status to 'failed'
        await supabase
          .from('orders')
          .update({ status: 'failed', payment_status: 'failed' })
          .eq('email', failedPayment.receipt_email!)
          .order('created_at', { ascending: false })
          .limit(1);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error('Error processing webhook:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// Important: Disable body parsing for Stripe webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};
