import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../utils/testdata';

const Clothes = () => {
  return <ProductGrid products={products} />;
};

export default Clothes;
