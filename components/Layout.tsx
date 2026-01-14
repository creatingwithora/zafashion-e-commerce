
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cartCount, cartTotal } = useCart();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900 text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-brand-orange text-3xl">ZA</span>
            <span>Fashion</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`hidden sm:block hover:text-brand-orange transition-colors ${location.pathname === '/' ? 'text-brand-orange' : ''}`}
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="relative p-2 hover:bg-navy-800 rounded-full transition-colors flex items-center gap-2"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline font-medium">
                R {cartTotal.toLocaleString()}
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
