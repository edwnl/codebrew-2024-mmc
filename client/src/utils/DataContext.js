import { createContext, useState } from 'react';
import { products as items } from '../utils/testdata';
import { fits as infos } from '../utils/fitdata';

export const DataContext = createContext();

export const useDataContext = () => {
  const [fits, setFits] = useState(infos);
  const [products, setProducts] = useState(items);

  const handleDeleteProduct = (productId) => {
    console.log('Deleting product with ID:', productId);
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleDeleteFit = (fitID) => {
    console.log('Deleting product with ID:', fitID);
    setFits(fits.filter((fit) => fit.id !== fitID));
  };

  return {
    fits,
    setFits,
    products,
    setProducts,
    handleDeleteProduct,
    handleDeleteFit
  };
};
