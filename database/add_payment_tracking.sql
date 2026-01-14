# Add Payment Tracking to Orders Table

Run this in Supabase SQL Editor:

```sql
-- Add new columns for payment tracking
alter table orders 
add column if not exists stripe_session_id text,
add column if not exists payment_status text default 'pending';

-- Create index for faster lookups
create index if not exists orders_stripe_session_idx on orders(stripe_session_id);
create index if not exists orders_payment_status_idx on orders(payment_status);
```

This adds:
- `stripe_session_id` - To track which Stripe session created the order
- `payment_status` - Track payment status: pending, completed, failed
