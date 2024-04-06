import React, { useState } from 'react';
import { products as items } from '../utils/testdata';

import ProductCard from '../components/ProductCard';
import FileUpload from '../components/FileUpload';

const Clothes = () => {
  const [products, setProducts] = useState(items);

  const handleFileSelect = (file) => {
    // TODO: add functionality to take care of the file here
    console.log('Selected file:', file);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-8">
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              productIndex={index}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          </div>
        ))}
      </div>
      <FileUpload onFilesSelect={handleFileSelect} />
    </>
  );
};

export default Clothes;
