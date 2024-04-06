import React from 'react';

const ProductGrid = ({ cardComponent }) => {
  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-8">
      {products.map((product, index) => (
        <div key={product.id}>
          {React.createElement(cardComponent, {
            product,
            productIndex: index,
            onDelete: () => handleDeleteProduct(product.id)
          })}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
