import React, { useState } from 'react';
import { Card, Modal, Button, Typography, Image } from 'antd';
import Tags from './Tags';
import { EditOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';

const MultiImageCard = ({ fit, fitIndex, products, onDelete, onShare }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [areProductsVisible, setProductsVisible] = useState(false);
  const [productName, setProductName] = useState(fit.name);
  const [tempProductName, setTempProductName] = useState(fit.name);

  //TODO: SET THE IMAGES CURRENTLY ON INITIALIZATION
  const [fitImages, setFitImages] = useState(Array.from({ length: 6 }, () => fit.imageUrl));
  const [tempFitImages, setTempFitImages] = useState(Array.from({ length: 6 }, () => fit.imageUrl));

  const showImagePreview = () => setProductsVisible(true);

  const closeImagesPreview = () => setProductsVisible(false);

  // to handle the edit product modal
  const showModal = () => {
    setProductsVisible(false); // hides the preview modal
    setIsModalVisible(true); // enables the edit modal
  };

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
    document.getElementById(`fit-${fitIndex}-product-${index}`).click();
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

  // TODO: Add delete funcitonality here
  const deleteProduct = () => {
    onDelete(fit.id);
  };

  const shareProduct = () => {
    onShare(fit.id);
  };

  return (
    <React.Fragment>
      <Card
        hoverable
        className="max-w-70 sm:max-w-70 md:max-w-64 m-2"
        actions={[
          <EditOutlined key="edit" onClick={showModal} style={{ fontSize: '20px' }} />,
          <DeleteOutlined key="delete" style={{ fontSize: '20px' }} onClick={deleteProduct} />,
          <ShareAltOutlined key="share" style={{ fontSize: '20px' }} onClick={shareProduct} />
        ]}
      >
        <div className="grid grid-cols-2 gap-1">
          {fitImages.slice(0, 3).map((imageUrl, index) => (
            <div key={index} className="w-full">
              <Image
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
                src={imageUrl}
                preview={true}
                alt={productName}
                fallback={<div>Loading...</div>}
              />
            </div>
          ))}
          <div key={'extra'} className="w-full">
            <Image
              width="100%"
              preview={false}
              height="100%"
              style={{ objectFit: 'cover' }}
              src={fitImages[3]}
              onClick={showImagePreview}
              alt={'See all products'}
              fallback={<div>Loading...</div>}
            />
          </div>
        </div>
        <div className="mt-2">
          <Card.Meta title={productName} />
          <Tags tags={['t-shirt', 'red', 'blue', 'indigo']} />
        </div>
      </Card>

      <Modal
        title="Edit Wardrobe Item"
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
          <div>
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
                  height="100%"
                  style={{ objectFit: 'cover' }}
                  onClick={() => handleImageClick(index)}
                  className="w-full h-auto rounded-lg"
                />
                <input
                  type="file"
                  id={`fit-${fitIndex}-product-${index}`}
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
        width="350px"
        onCancel={closeImagesPreview}
        footer={[
          <Button key="edit" onClick={showModal} type="primary">
            Edit
          </Button>,
          <Button key="cancel" onClick={closeImagesPreview}>
            Close
          </Button>
        ]}
      >
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
            overflowY: 'scroll'
          }}
        >
          <div style={{ maxWidth: '300px' }}>
            {tempFitImages.map((imageUrl, index) => (
              <div key={index} className="image-container mb-2">
                <Image
                  width="100%"
                  src={imageUrl}
                  alt={fit.name}
                  height="100%"
                  style={{ objectFit: 'cover' }}
                  fallback={<div>Loading...</div>}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MultiImageCard;
