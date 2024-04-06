import React, { useEffect, useState } from 'react';

import ClothCard from '../components/ClothCard';
import FileUpload from '../components/FileUpload';
import imageCompression from 'browser-image-compression';

// Functions related to the spaces
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import 'firebase/compat/storage';
import { FIREBASE_APP } from '../index';

const Clothes = () => {
  const functions = getFunctions(FIREBASE_APP, 'australia-southeast1');
  const storage = getStorage(FIREBASE_APP, 'storage');
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    const getClothes = async () => {
      try {
        // Call the Firebase Cloud Function for getting clothes
        const getClothesResponse = await httpsCallable(functions, 'get_clothes_handler');

        // Handle the response data
        console.log('Get Clothes Response:', getClothesResponse.data);
        setClothes(getClothesResponse.data); // Update the state with fetched clothes data
      } catch (error) {
        console.error('Error fetching clothes:', error);
      }
    };

    getClothes().then((r) => console.log(r));
  }, []); // Empty dependency array ensures this effect runs only once, like componentDidMount

  const handleNewCloth = async (file) => {
    console.log(file);
    try {
      // Compress the file
      const compressedFile = await imageCompression(file[0], { maxSizeMB: 5 });

      // Generate a custom UUID for the filename
      const fileId = crypto.randomUUID();

      // Create a storage reference with the custom filename
      const storageRef = ref(storage, `users/clothes/${fileId}.jpg`);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, compressedFile).then((snapshot) => {
        // Handle successful upload
        console.log('Upload successful');
        console.log(`users/clothes/${fileId}.jpg`);
      });
    } catch (error) {
      console.error('Error handling file:', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-8">
        {clothes &&
          clothes.map((product) => (
            <div key={product.id}>
              <ClothCard cloth={product} />
            </div>
          ))}
      </div>

      <FileUpload onFilesSelect={handleNewCloth} />
    </>
  );
};

export default Clothes;
