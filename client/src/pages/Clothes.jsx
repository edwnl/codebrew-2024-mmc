import React, { useEffect, useState } from 'react';

import ClothCard from '../components/ClothCard';
import FileUpload from '../components/FileUpload';
import imageCompression from 'browser-image-compression';

// Functions related to the spaces
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'firebase/compat/storage';
import { FIREBASE_APP } from '../index';

const Clothes = () => {
  const functions = getFunctions(FIREBASE_APP, 'australia-southeast1');
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);

  const storage = getStorage(FIREBASE_APP, 'gs://codebrew2024.appspot.com');
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    // Fetch clothes data from Firebase Cloud Functions
    const getClothes = httpsCallable(functions, 'get_clothes_handler');
    getClothes()
      .then(async (result) => {
        const clothesWithImages = await Promise.all(
          result.data.map(async (cloth) => {
            const imageUrl = await getDownloadURL(ref(storage, cloth.image));
            return { ...cloth, imageUrl }; // Add imageUrl to cloth object
          })
        );
        setClothes(clothesWithImages);
      })
      .catch((error) => {
        console.error('Error fetching clothes:', error);
      });
  }, []);

  const handleNewCloth = async (file) => {
    console.log(file);
    try {
      // Compress the file
      // const compressedFile = await imageCompression(file, { maxSizeMB: 5 });

      // Generate a custom UUID for the filename
      const fileId = crypto.randomUUID();

      // Create a storage reference with the custom filename
      const storageRef = ref(storage, `${fileId}.jpg`);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then(async (snapshot) => {
        // Handle successful upload
        console.log('Upload successful');
        console.log(`${fileId}.jpg`);

        // Call the Firebase Cloud Function for adding a single cloth
        const addCloth = await httpsCallable(functions, 'add_cloth_handler');
        const addClothResponse = await addCloth({
          name: 'T-Shirt',
          tags: ['casual', 'blue'],
          image: `${fileId}.jpg`
        });
        console.log('Add Cloth Response:', addClothResponse.data);
      });
    } catch (error) {
      console.error('Error handling file:', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-8">
        {clothes.map((cloth, index) => {
          console.log('Cloth details:', cloth); // Logging cloth details
          return <ClothCard key={index} cloth={cloth} />;
        })}
      </div>

      <FileUpload onFilesSelect={handleNewCloth} />
    </>
  );
};

export default Clothes;
