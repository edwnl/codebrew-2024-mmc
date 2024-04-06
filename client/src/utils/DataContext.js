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

  const handleCreateFit = (fitData) => {
    console.log('Creating fit:', fitData);
    const newFit = {
      id: Date.now(), // TODO update this
      name: fitData.name,
      imageUrl: fitData.images, // Assuming you only save one image URL per fit
      tags: fitData.tags
    };
    setFits([...fits, newFit]);
  };

  return {
    fits,
    setFits,
    products,
    setProducts,
    handleDeleteProduct,
    handleCreateFit,
    handleDeleteFit
  };
};
