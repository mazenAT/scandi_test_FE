
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gql, useQuery } from '@apollo/client';
import { useCart } from '../context/CartContext';
import parse from 'html-react-parser';

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      prices { amount currency { symbol } }
      attributes { id name type items { displayValue value id } }
      brand
      description
    }
  }
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem, openCart } = useCart();
  const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { id } });

  const product = data?.product;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>Product not found</div>;

  const images = product.gallery || [];
  const hasRequiredSelections =
    (!product.attributes?.find((a: any) => a.name.toLowerCase() === 'size') || selectedSize) &&
    (!product.attributes?.find((a: any) => a.name.toLowerCase() === 'color') || selectedColor);

  const handleAddToCart = () => {
    if (!hasRequiredSelections) return;
    // Collect selected attributes (only those with a value)
    const selectedAttributes = (product.attributes || [])
      .map((attr: any) => {
        const attrName = attr.name.toLowerCase();
        let value = undefined;
        if (attrName === 'size') value = selectedSize;
        else if (attrName === 'color') value = selectedColor;
        // Add more as needed for other attributes
        if (value !== undefined && value !== '') {
          return { id: attrName, value };
        }
        return null;
      })
      .filter(Boolean);
    addItem({
      ...product,
      quantity: 1,
      attributes: selectedAttributes
    });
    openCart();
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // ...existing render code, but use product.attributes for sizes/colors...
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4" data-testid="product-gallery">
          {/* Thumbnails */}
          <div className="flex space-x-2">
            {images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-16 h-16 rounded border-2 overflow-hidden ${
                  selectedImageIndex === index ? 'border-gray-400' : 'border-gray-200'
                }`}
                data-testid={`thumbnail-${index}`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="relative aspect-square">
            <img
              src={images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="main-image"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  data-testid="prev-image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  data-testid="next-image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light text-gray-900" data-testid="product-title">
              {product.name}
            </h1>
          </div>
          {/* Product Attributes (dynamic) */}
          {product.attributes && product.attributes.map((attr: any) => {
            const attrNameKebab = attr.name.toLowerCase().replace(/\s+/g, '-');
            const selected = (attrNameKebab === 'size' ? selectedSize : attrNameKebab === 'color' ? selectedColor : undefined);
            return (
              <div key={attr.id} data-testid={`product-attribute-${attrNameKebab}`}>
                <h3 className="text-sm font-medium text-gray-900 mb-3">{attr.name.toUpperCase()}:</h3>
                <div className="flex space-x-2">
                  {attr.items.map((item: any) => {
                    let testIds = [`${attrNameKebab}-${item.value}`];
                    if (attrNameKebab === 'color' && item.displayValue && item.displayValue !== item.value) {
                      testIds.push(`${attrNameKebab}-${item.displayValue}`);
                    }
                    return testIds.map((testId, idx) => (
                      <button
                        key={testId}
                        onClick={() => {
                          if (attrNameKebab === 'size') setSelectedSize(item.value);
                          else if (attrNameKebab === 'color') setSelectedColor(item.value);
                        }}
                        className={
                          attrNameKebab === 'color'
                            ? `w-8 h-8 rounded border-2 ${selected === item.value ? 'border-black' : 'border-gray-300'}`
                            : `px-4 py-2 border text-sm font-medium ${selected === item.value ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'}`
                        }
                        style={attrNameKebab === 'color' ? { backgroundColor: item.value } : {}}
                        title={item.displayValue}
                        data-testid={testId}
                      >
                        {attrNameKebab === 'color' ? '' : item.displayValue}
                      </button>
                    ));
                  })}
                </div>
              </div>
            );
          })}
          {/* Price */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">PRICE:</h3>
            <p className="text-2xl font-light text-gray-900" data-testid="product-price">
              {product.prices[0]?.currency.symbol}{product.prices[0]?.amount}
            </p>
          </div>
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!hasRequiredSelections || !product.inStock}
            className={`w-full py-3 px-6 text-sm font-medium ${
              hasRequiredSelections && product.inStock
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
            data-testid="add-to-cart"
          >
            {!product.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
          {/* Product Description */}
          <div className="pt-6 border-t border-gray-200" data-testid="product-description">
            <div className="text-sm text-gray-600">
              {parse(product.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
