
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { gql, useQuery } from '@apollo/client';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

const Header: React.FC = () => {
  const { getTotalItems, toggleCart } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();
  const { data, loading } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];

  const isActive = (category: string) => {
    return location.pathname === `/${category.toLowerCase()}`;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Navigation */}
          {/* Category navigation removed as per request */}

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
          </div>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            data-testid="cart-icon"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                data-testid="cart-badge"
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
