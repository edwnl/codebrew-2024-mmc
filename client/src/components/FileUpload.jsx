import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

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
      <RoundButton onClick={handleClick}>
        <PlusOutlined style={{ fontSize: '24px' }} />
      </RoundButton>
    </div>
  );
};

export default FileUpload;

const RoundButton = styled('button')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#2196f3',
  color: 'white',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999
});
