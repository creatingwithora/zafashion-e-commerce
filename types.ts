
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
}

export interface CheckoutForm {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  email: string;
  postalCode: string;
}
