export interface User {
  id: number;
  nome: string;
  email: string;
  role: 'admin' | 'funcionario' | 'caixa';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  supplier: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  customerId: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Sale {
  id: string;
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  date: string;
  paymentMethod: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface Notification {
  id: string;
  type: 'stock' | 'customer' | 'system';
  message: string;
  date: string;
  read: boolean;
}