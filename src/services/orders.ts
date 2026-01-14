import { supabase } from '../lib/supabase';
import { CartItem } from '../../types';

interface OrderData {
  email: string;
  cardHolderName: string;
  postalCode: string;
  subtotal: number;
  tax: number;
  total: number;
  items: CartItem[];
}

export async function createOrder(orderData: OrderData): Promise<string> {
  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      email: orderData.email,
      card_holder_name: orderData.cardHolderName,
      postal_code: orderData.postalCode,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      total: orderData.total,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error('Error creating order:', orderError);
    throw new Error('Failed to create order');
  }

  // Insert order items
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    price: item.price,
    quantity: item.quantity
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    throw new Error('Failed to create order items');
  }

  return order.id;
}
