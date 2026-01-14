
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { CheckoutForm } from '../types';
import { createOrder } from '../src/services/orders';
import { stripePromise } from '../src/lib/stripe';

const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, cartTax, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    postalCode: ''
  });

  // Simplified validation - Stripe will handle card details
  const isFormValid =
    form.email.includes('@') &&
    form.postalCode.length >= 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          email: form.email,
          total: cartTotal
        })
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Save order to Supabase before redirecting
      const orderId = await createOrder({
        email: form.email,
        cardHolderName: form.cardHolderName || 'Stripe Customer',
        postalCode: form.postalCode,
        subtotal: cartSubtotal,
        tax: cartTax,
        total: cartTotal,
        items: cart
      });

      // Store order ID for success page
      localStorage.setItem('pendingOrderId', orderId);

      // Redirect to Stripe Checkout
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('No checkout URL returned from Stripe');
      }
    } catch (error: any) {
      console.error('Payment failed:', error);
      alert(`Payment failed: ${error.message}. Please try again.`);
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-navy-900">Secure Checkout</h1>
        <Link to="/cart" className="text-slate-500 hover:text-navy-900 flex items-center gap-1 font-semibold group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Payment Form */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold">1</div>
            <h2 className="text-xl font-bold text-navy-900">Payment Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <label className="block text-sm font-bold text-slate-700">
                  Billing Email
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-navy-900/10 focus:border-navy-900 transition-all"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="block text-sm font-bold text-slate-700">
                  Billing Postal Code
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={form.postalCode}
                    onChange={handleInputChange}
                    placeholder="8001"
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-navy-900/10 focus:border-navy-900 transition-all"
                  />
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-bold mb-1">Secure Payment with Stripe</p>
                    <p>After clicking "Continue to Payment", you'll be redirected to Stripe's secure checkout page to enter your card details.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${!isFormValid || isSubmitting
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-navy-900 text-white hover:bg-navy-800 active:scale-95'
                }`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                  Pay R {cartTotal.toLocaleString()}
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Secured with industrial strength SSL encryption
            </p>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-navy-900 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h2 className="text-xl font-bold text-navy-900">Your Order</h2>
            </div>

            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {cart.map(item => (
                <div key={item.productId} className="flex gap-4">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg border border-slate-200" />
                    <span className="absolute -top-2 -right-2 bg-navy-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-navy-900 text-sm">{item.name}</h4>
                    <p className="text-slate-500 text-xs">R {item.price} each</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-navy-900 text-sm">R {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 space-y-3">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Subtotal</span>
                <span>R {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Tax (15% VAT)</span>
                <span>R {cartTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase tracking-wider text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-slate-300">
                <span className="text-lg font-bold text-navy-900">Total amount</span>
                <span className="text-2xl font-black text-brand-orange">R {cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
            </div>
            <div>
              <p className="font-bold text-navy-900 text-sm">Buyer Protection</p>
              <p className="text-xs text-slate-500">Full refund if the product is not as described or never arrives.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
