import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../utils/testdata';
import FileUpload from '../components/FileUpload';

const Clothes = () => {
  const handleFileSelect = (file) => {
    // TODO: add functionality to take care of the file here
    console.log('Selected file:', file);
  };
  return (
    <>
      <ProductGrid products={products} />
      <FileUpload onFilesSelect={handleFileSelect} />
    </>
  );
};

export default Clothes;
