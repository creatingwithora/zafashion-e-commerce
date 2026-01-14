import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../src/lib/supabase';

interface OrderDetails {
  id: string;
  email: string;
  cardholder_name: string;
  postal_code: string;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  payment_status: string;
  created_at: string;
  items: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
}

const ReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || localStorage.getItem('pendingOrderId');

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    async function fetchOrderDetails() {
      try {
        // Fetch order
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (orderError) throw orderError;

        // Fetch order items with product details
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            quantity,
            price,
            products (name)
          `)
          .eq('order_id', orderId);

        if (itemsError) throw itemsError;

        const formattedItems = itemsData.map((item: any) => ({
          product_name: item.products?.name || 'Unknown Product',
          quantity: item.quantity,
          price: item.price,
        }));

        setOrder({
          ...orderData,
          items: formattedItems,
        });
      } catch (error) {
        console.error('Error fetching order:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId, navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-900 mx-auto"></div>
        <p className="mt-4 text-slate-600">Loading receipt...</p>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const orderDate = new Date(order.created_at).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Print button - hidden when printing */}
      <div className="no-print mb-6 flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="text-navy-900 hover:underline flex items-center gap-2"
        >
          ← Back to Shop
        </button>
        <button
          onClick={handlePrint}
          className="ml-auto bg-navy-900 text-white px-6 py-2 rounded-lg hover:bg-navy-800 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect width="12" height="8" x="6" y="14" />
          </svg>
          Print / Save PDF
        </button>
      </div>

      {/* Receipt Content - this will be printed */}
      <div className="bg-white border-2 border-slate-200 rounded-lg p-8 md:p-12 print:border-0">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-slate-200">
          <h1 className="text-4xl font-black mb-2">
            <span className="text-brand-orange">ZA</span>Fashion
          </h1>
          <p className="text-slate-600">Premium South African Fashion</p>
          <p className="text-sm text-slate-500 mt-2">support@zafashion.co.za | Cape Town, South Africa</p>
        </div>

        {/* Receipt Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-2">ORDER RECEIPT</h2>
          <p className="text-slate-600">Thank you for your purchase!</p>
        </div>

        {/* Order Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-navy-900 mb-3">Order Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Order ID:</span>
                <span className="font-mono font-semibold">{order.id.substring(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date:</span>
                <span className="font-semibold">{orderDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <span className="font-semibold text-green-600">
                  {order.payment_status === 'completed' ? 'Paid' : 'Processing'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-navy-900 mb-3">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Email:</span>
                <span className="font-semibold">{order.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Name:</span>
                <span className="font-semibold">{order.cardholder_name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Postal Code:</span>
                <span className="font-semibold">{order.postal_code}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="font-bold text-navy-900 mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 font-bold text-navy-900">Product</th>
                  <th className="text-center py-3 font-bold text-navy-900">Quantity</th>
                  <th className="text-right py-3 font-bold text-navy-900">Price</th>
                  <th className="text-right py-3 font-bold text-navy-900">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="py-3">{item.product_name}</td>
                    <td className="text-center py-3">{item.quantity}</td>
                    <td className="text-right py-3">R {item.price.toLocaleString()}</td>
                    <td className="text-right py-3 font-semibold">
                      R {(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex justify-end">
          <div className="w-full md:w-80 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-semibold">R {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">VAT (15%):</span>
              <span className="font-semibold">R {order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Shipping:</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between pt-3 border-t-2 border-slate-200">
              <span className="font-bold text-navy-900 text-lg">TOTAL:</span>
              <span className="font-black text-brand-orange text-xl">R {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
          <p className="mb-2">Estimated delivery: 3-5 business days</p>
          <p>Questions? Contact us at support@zafashion.co.za</p>
          <p className="mt-4 text-xs text-slate-400">This is a computer-generated receipt and does not require a signature.</p>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 20px;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceiptPage;
