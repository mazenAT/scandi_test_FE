
import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Running Short',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506629905607-d03602d6e58d?w=600&h=600&fit=crop'
    ],
    category: 'women',
    inStock: true,
    attributes: {
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Light Grey', 'Black', 'Green']
    }
  },
  {
    id: '2',
    name: 'Running Short',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop'
    ],
    category: 'women',
    inStock: true,
    attributes: {
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Pink', 'Beige']
    }
  },
  {
    id: '3',
    name: 'Running Short',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1506629905607-d03602d6e58d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506629905607-d03602d6e58d?w=600&h=600&fit=crop'
    ],
    category: 'women',
    inStock: false,
    attributes: {
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['White']
    }
  },
  {
    id: '4',
    name: 'Running Short',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop'
    ],
    category: 'women',
    inStock: true,
    attributes: {
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Cream']
    }
  },
  {
    id: '5',
    name: 'Running Short',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop'
    ],
    category: 'women',
    inStock: true,
    attributes: {
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Grey']
    }
  },
  {
    id: '6',
    name: 'Running Short',
    price: 50.00,
    image: 'https://images.unsplash.com/photo-1506629905607-d03602d6e58d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506629905607-d03602d6e58d?w=600&h=600&fit=crop'
    ],
    category: 'women',
    inStock: true,
    attributes: {
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Light Grey']
    }
  },
  {
    id: '7',
    name: 'Wayfarer',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&h=600&fit=crop'
    ],
    category: 'men',
    inStock: true,
    attributes: {
      colors: ['Black', 'Brown', 'Blue', 'Orange']
    }
  }
];
