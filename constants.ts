
import { Product } from './types';

// TODO: Fetch products from Supabase
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic Navy Crew Tee',
    description: 'A premium cotton t-shirt with a modern fit, perfect for everyday wear.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'T-shirts',
    stock: 25
  },
  {
    id: 'p2',
    name: 'Slim Fit Indigo Jeans',
    description: 'Durable denim with a slight stretch for ultimate comfort and style.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'Jeans',
    stock: 12
  },
  {
    id: 'p3',
    name: 'Urban Bomber Jacket',
    description: 'Lightweight yet warm, this jacket is an essential for chilly evenings.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'Jackets',
    stock: 8
  },
  {
    id: 'p4',
    name: 'Floral Summer Dress',
    description: 'A breezy, vibrant dress designed for the South African sun.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1572804013307-a9a111dc824d?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'Dresses',
    stock: 15
  },
  {
    id: 'p5',
    name: 'Retro White Sneakers',
    description: 'Classic leather sneakers that pair perfectly with jeans or chinos.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'Sneakers',
    stock: 5
  },
  {
    id: 'p6',
    name: 'Striped Linen Shirt',
    description: 'Breathable linen blend for a sophisticated casual look.',
    price: 549,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'T-shirts',
    stock: 18
  },
  {
    id: 'p7',
    name: 'Distressed Denim Jacket',
    description: 'Rugged aesthetic with a vintage wash. A timeless wardrobe staple.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'Jackets',
    stock: 6
  },
  {
    id: 'p8',
    name: 'Suede Chelsea Boots',
    description: 'Elegant footwear crafted from premium suede with elastic side panels.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'Sneakers',
    stock: 10
  },
  {
    id: 'p9',
    name: 'Graphic Print Tee',
    description: 'Bold designs on soft, 100% organic cotton for the modern creative.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'T-shirts',
    stock: 30
  },
  {
    id: 'p10',
    name: 'High-Waisted Skinny Jeans',
    description: 'Flattering silhouette designed to hold its shape all day long.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600&h=800',
    category: 'Jeans',
    stock: 20
  }
];

export const VAT_RATE = 0.15;
