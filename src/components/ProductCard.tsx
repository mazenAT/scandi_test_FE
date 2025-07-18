
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add with default options (first attribute values if present)
    const sizeAttr = product.attributes?.find((a: any) => a.name.toLowerCase() === 'size');
    const colorAttr = product.attributes?.find((a: any) => a.name.toLowerCase() === 'color');
    const defaultSize = sizeAttr?.items?.[0]?.value;
    const defaultColor = colorAttr?.items?.[0]?.value;
    addItem({
      ...product,
      quantity: 1,
      selectedSize: defaultSize,
      selectedColor: defaultColor
    });
    openCart();
  };

  return (
    <Link to={`/product/${product.id}`} data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div 
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square mb-3 overflow-hidden">
          <img
            src={product.gallery?.[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-200 ${!product.inStock ? 'opacity-50 grayscale' : ''}`}
            data-testid={`product-image-${product.id}`}
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center" data-testid={`out-of-stock-${product.id}`}> 
              <span className="bg-white px-3 py-1 text-sm font-medium text-gray-700 rounded">OUT OF STOCK</span>
            </div>
          )}
          {product.inStock && isHovered && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors shadow-lg"
              data-testid={`add-to-cart-${product.id}`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900" data-testid={`product-name-${product.id}`}>{product.name}</h3>
          <p className="text-sm text-gray-700" data-testid={`product-price-${product.id}`}>{product.prices?.[0]?.currency.symbol}{product.prices?.[0]?.amount}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
