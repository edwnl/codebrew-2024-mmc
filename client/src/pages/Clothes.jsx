import React, { useContext } from 'react';

import FileUpload from '../components/FileUpload';
import ClothCard from '../components/ClothCard';
import { products } from '../utils/testdata';

const Clothes = () => {
  const handleFileSelect = (file) => {
    // TODO: add functionality to take care of the file here
    console.log('Selected file:', file);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-8">
        {products.map((product, index) => (
          <div key={product.id}>
            <ClothCard
              cloth={product}
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
