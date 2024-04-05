import { useContext } from 'react';
import FileUpload from '../components/FileUpload';
import MultiImageCard from '../components/MultiImageCard';
import { DataContext } from '../App';

const Fit = () => {
  const { products, fits, handleDeleteFit } = useContext(DataContext);

  const handleFileSelect = (file) => {
    // TODO: add functionality to take care of the file here
    console.log('Selected file:', file);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-8">
        {fits.map((item, index) => (
          <div key={item.id}>
            <MultiImageCard
              fit={item}
              fitIndex={index}
              products={products}
              onDelete={() => handleDeleteFit(item.id)}
            />
          </div>
        ))}
      </div>
      <FileUpload onFilesSelect={handleFileSelect} />
    </>
  );
};

export default Fit;
