import React, { useState } from 'react';
import { Card, Modal, Button, Typography, Image } from 'antd';
import Tags from './Tags';
import { EditOutlined } from '@ant-design/icons';

const MultiImageCard = ({ product, productIndex }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [areProductsVisible, setProductsVisible] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [tempProductName, setTempProductName] = useState(product.name);

  //TODO: SET THE IMAGES CURRENTLY ON INITIALIZATION
  const [fitImages, setFitImages] = useState(Array.from({ length: 6 }, () => product.imageUrl));
  const [tempFitImages, setTempFitImages] = useState(
    Array.from({ length: 6 }, () => product.imageUrl)
  );

  const showImagePreview = () => setProductsVisible(true);

  const closeImagesPreview = () => setProductsVisible(false);

  // to handle the edit product modal
  const showModal = () => setIsModalVisible(true);

  // to close the edit product modal without any changes
  const handleCancel = () => {
    setTempProductName(productName);
    setTempFitImages(fitImages);
    setIsModalVisible(false);
  };

  // updates the product details based on changes in modal
  const handleConfirm = () => {
    setProductName(tempProductName);
    setFitImages(tempFitImages);
    setIsModalVisible(false);
  };

  // to trigger the image upload
  const handleImageClick = (index) => {
    document.getElementById(`fit-${productIndex}-product-${index}`).click();
  };

  // handles the image upload and change
  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      // Handle invalid file type
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedImages = [...tempFitImages];
      updatedImages[index] = e.target.result;
      setTempFitImages(updatedImages);
    };
    reader.readAsDataURL(file);
  };

  return (
    <React.Fragment>
      <Card id="sample" className="max-w-64 m-2">
        <div className="grid grid-cols-2 gap-1">
          {fitImages.slice(0, 4).map((imageUrl, index) => (
            <div key={index} className="w-full" >
              <Image
                width="100%"
                src={imageUrl}
                preview={false}
                alt={productName}
                fallback={<div>Loading...</div>}
              />
            </div>
          ))}
        </div>
        <div className="mt-2">
          <Card.Meta title={productName} />
          <Tags tags={['t-shirt', 'red', 'blue', 'indigo']} />
            <Button key="cancel" onClick={showModal}>
                Edit
            </Button>
            {"           "}
            <Button key="confirm" type="primary" onClick={() => showImagePreview()}>
                Preview
            </Button>
        </div>
      </Card>
      <Modal
        title="Update Clothing"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        ]}
      >
        <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <Typography.Title
                level={4}
                editable={{
                  onChange: setTempProductName,
                  icon: <EditOutlined />,
                  autoSize: true
                }}
              >
                {tempProductName}
              </Typography.Title>
            </div>
            <div style={{ flex: 1 }}></div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {tempFitImages.map((imageUrl, index) => (
              <div key={index} className="w-full">
                <Image
                  width="100%"
                  preview={false}
                  alt={productName}
                  src={imageUrl}
                  onClick={() => handleImageClick(index)}
                  className="w-full h-auto rounded-lg"
                />
                <input
                  type="file"
                  id={`fit-${productIndex}-product-${index}`}
                  style={{ display: 'none' }}
                  onChange={(event) => handleImageChange(index, event)}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <Modal
        title="Clothes in the Fit"
        open={areProductsVisible}
        onCancel={closeImagesPreview}
        footer={[
          <Button key="cancel" onClick={closeImagesPreview}>
            Close
          </Button>
        ]}
      >
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {fitImages.map((imageUrl, index) => (
            <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
              <Image
                width={200}
                src={imageUrl}
                alt={product.name}
                fallback={<div>Loading...</div>}
              />
            </div>
          ))}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MultiImageCard;
