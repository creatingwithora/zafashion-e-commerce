
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Get order ID from either navigation state or localStorage (from Stripe redirect)
  const orderId = location.state?.orderId || localStorage.getItem('pendingOrderId') || 'N/A';

  useEffect(() => {
    // Clear cart and pending order ID when success page loads
    clearCart();
    localStorage.removeItem('pendingOrderId');
  }, [clearCart]);

  const handleViewReceipt = () => {
    navigate('/receipt', { state: { orderId } });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-green-100 rounded-full animate-ping opacity-25"></div>
        </div>
        <div className="relative z-10 w-32 h-32 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-black text-navy-900">Payment Successful!</h1>
        <p className="text-slate-500 text-lg">
          Thank you for your purchase. We've received your order and are getting it ready for delivery.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto">
        <div className="space-y-4 text-left">
          <div className="flex justify-between items-center pb-4 border-b border-slate-50">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Order ID</span>
            <span className="font-bold text-navy-900 text-sm font-mono">{orderId.substring(0, 8)}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-slate-50">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Estimated Delivery</span>
            <span className="font-bold text-navy-900">3-5 Business Days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Status</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Processing</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link
          to="/"
          className="bg-navy-900 text-white font-black py-4 px-10 rounded-xl hover:bg-navy-800 transition-all shadow-lg active:scale-95"
        >
          Continue Shopping
        </Link>
        <button onClick={handleViewReceipt} className="bg-white text-navy-900 border border-slate-200 font-black py-4 px-10 rounded-xl hover:bg-slate-50 transition-all active:scale-95">
          View Receipt
        </button>
      </div>

      <p className="text-slate-400 text-sm pt-12">
        A confirmation email has been sent to your inbox. <br />
        Questions? Contact us at support@zafashion.co.za
      </p>
    </div>
  );
};

export default SuccessPage;
