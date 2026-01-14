import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentFailedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-8">
      {/* Error Icon with animation */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-red-100 rounded-full animate-ping opacity-25"></div>
        </div>
        <div className="relative z-10 w-32 h-32 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-navy-900">Payment Unsuccessful</h1>
        <p className="text-slate-500 text-lg">
          We couldn't process your payment. Don't worry - no charges were made to your account.
        </p>
      </div>

      {/* Common Reasons */}
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 max-w-lg mx-auto text-left">
        <h2 className="font-bold text-navy-900 mb-4 text-lg">Common reasons for payment failure:</h2>
        <ul className="space-y-3 text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="2" />
            </svg>
            <span>Insufficient funds in your account</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="2" />
            </svg>
            <span>Incorrect card details (number, expiry, or CVV)</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="2" />
            </svg>
            <span>Card declined by your bank</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="2" />
            </svg>
            <span>Payment cancelled before completion</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="2" />
            </svg>
            <span>Network connection issues</span>
          </li>
        </ul>
      </div>

      {/* Test Mode Notice (visible in development) */}
      {import.meta.env.DEV && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-lg mx-auto">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <div className="text-left text-sm text-blue-800">
              <p className="font-bold mb-2">Test Mode Active</p>
              <p>To test a failed payment, use:</p>
              <p className="font-mono bg-blue-100 px-2 py-1 rounded mt-2 text-xs">
                Card: 4000 0000 0000 0002
              </p>
              <p className="text-xs mt-1 text-blue-600">This test card will always decline</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          onClick={() => navigate('/checkout')}
          className="bg-navy-900 text-white font-black py-4 px-10 rounded-xl hover:bg-navy-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Try Again
        </button>
        <Link
          to="/cart"
          className="bg-white text-navy-900 border-2 border-slate-200 font-black py-4 px-10 rounded-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          Back to Cart
        </Link>
      </div>

      {/* Help Section */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <p className="text-slate-600 text-sm">
          Need help? Contact us at{' '}
          <a href="mailto:support@zafashion.co.za" className="text-brand-orange hover:underline font-semibold">
            support@zafashion.co.za
          </a>
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Your cart items have been saved and are waiting for you
        </p>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
