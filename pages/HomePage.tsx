
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../src/services/products';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden bg-navy-900 flex items-center px-8 sm:px-16">
        <div className="relative z-10 max-w-xl space-y-6">
          <span className="inline-block px-3 py-1 bg-brand-orange/20 text-brand-orange font-bold text-xs rounded-full uppercase tracking-widest">
            New Arrival
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Elevate Your <br />
            <span className="text-brand-orange">South African</span> Style
          </h1>
          <p className="text-slate-300 text-lg">
            Discover our curated collection of premium local fashion essentials.
            Crafted for quality, designed for comfort.
          </p>
          <button className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-orange-500/30">
            Shop Collection
          </button>
        </div>
        {/* Background visual element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200&h=800"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-transparent"></div>
        </div>
      </section>

      {/* Product Feed */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-navy-900">Featured Collections</h2>
            <p className="text-slate-500">Handpicked items just for you</p>
          </div>
          <div className="flex gap-2">
            {['All', 'T-shirts', 'Jeans', 'Jackets', 'Dresses'].map(cat => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${cat === 'All'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-navy-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-navy-900/20 border-t-navy-900 rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-500 font-semibold">Loading products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <button
              onClick={loadProducts}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h3 className="text-2xl font-bold text-navy-900 mb-2">Join the Club</h3>
          <p className="text-slate-500">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-grow md:w-64 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all"
          />
          <button className="bg-navy-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-navy-800 transition-all">
            Join
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
