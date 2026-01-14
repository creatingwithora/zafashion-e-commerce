
import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-navy-900 shadow-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-800 line-clamp-1">{product.name}</h3>
          <span className="font-bold text-navy-900 whitespace-nowrap ml-2">R {product.price}</span>
        </div>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${product.stock < 5 ? 'text-red-500' : 'text-slate-400'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-8">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-2 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="px-2 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
              product.stock === 0 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-navy-900 text-white hover:bg-navy-800'
            }`}
          >
            {isAdding ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
