import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, cardComponent }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-8">
      {products.map((product, index) => (
        <div key={index}>
          {React.createElement(cardComponent, { product, productIndex: index })}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
