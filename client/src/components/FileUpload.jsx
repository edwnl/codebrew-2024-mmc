import React, { useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';

const FileUpload = ({ onFilesSelect }) => {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    onFilesSelect(files);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFilesSelect([file]);
    }
  };

  const handleClick = () => {
    imageInputRef.current.click();
  };
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        accept="image/*"
        multiple
      />
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageSelect}
        style={{ display: 'none' }}
        accept="image/*"
        capture="camera"
      />
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 bg-transparent hover:bg-transparent text-black font-bold py-2 px-4 rounded flex items-center"
        style={{ zIndex: 999 }}
      >
        <AddIcon
          sx={{ fontSize: { xs: 40, sm: 40, md: 40, lg: 60 } }}
          style={{ cursor: 'pointer' }}
        />
      </button>
    </div>
  );
};

export default FileUpload;
