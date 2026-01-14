
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartTax, 
    cartTotal 
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
        <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <h2 className="text-3xl font-black text-navy-900 mb-3">Your cart is empty</h2>
        <p className="text-slate-500 max-w-md mb-8">
          Looks like you haven't added anything to your cart yet. Browse our collections to find something you'll love!
        </p>
        <Link 
          to="/" 
          className="bg-navy-900 text-white font-bold py-4 px-10 rounded-full hover:bg-navy-800 transition-all shadow-lg active:scale-95"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-navy-900">Your Cart</h1>
        <Link to="/" className="text-brand-orange hover:text-orange-600 font-bold flex items-center gap-1 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="hidden sm:grid grid-cols-5 gap-4 p-4 border-b border-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div className="col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {cart.map(item => (
                <div key={item.productId} className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-6 sm:p-4 items-center">
                  {/* Product Info */}
                  <div className="sm:col-span-2 flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-navy-900 line-clamp-1">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-xs text-red-500 hover:text-red-600 font-semibold mt-1 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price (Mobile Label) */}
                  <div className="flex sm:block justify-between items-center sm:text-center">
                    <span className="sm:hidden text-slate-400 text-xs font-bold">PRICE</span>
                    <span className="font-semibold text-slate-600">R {item.price}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="flex sm:block justify-between items-center sm:text-center">
                    <span className="sm:hidden text-slate-400 text-xs font-bold">QTY</span>
                    <div className="flex items-center justify-center border border-slate-200 rounded-lg overflow-hidden h-9 w-28 mx-auto sm:mx-0 inline-flex sm:flex">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-grow text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="flex sm:block justify-between items-center sm:text-right">
                    <span className="sm:hidden text-slate-400 text-xs font-bold">TOTAL</span>
                    <span className="font-black text-navy-900">R {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-navy-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
            <h3 className="text-xl font-bold mb-6 pb-6 border-b border-navy-800">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-navy-300">
                <span>Subtotal</span>
                <span>R {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-navy-300">
                <span>Estimated Tax (15% VAT)</span>
                <span>R {cartTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-navy-300">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="pt-4 border-t border-navy-800 flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-brand-orange">R {cartTotal.toLocaleString()}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="block w-full bg-brand-orange hover:bg-orange-600 text-white text-center font-black py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              Checkout
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            
            <div className="mt-8 flex items-center justify-center gap-4 text-navy-400">
              <div className="w-12 h-8 bg-navy-800 rounded border border-navy-700 flex items-center justify-center">VISA</div>
              <div className="w-12 h-8 bg-navy-800 rounded border border-navy-700 flex items-center justify-center">MC</div>
              <div className="w-12 h-8 bg-navy-800 rounded border border-navy-700 flex items-center justify-center">OZOW</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
