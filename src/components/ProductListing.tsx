
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
      id
      name
      inStock
      gallery
      prices { amount currency { symbol } }
      attributes { id name type items { displayValue value id } }
      brand
    }
  }
`;

const ProductListing: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { data, loading, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { category: category || 'all' },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  const products = data?.productsByCategory || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 
        className="text-2xl font-light text-gray-900 mb-8 capitalize"
        data-testid={`${category}-title`}
      >
        {category}
      </h1>
      <div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8"
        data-testid={`${category}-products`}
      >
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
