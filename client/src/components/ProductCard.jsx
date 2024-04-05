import Tags from './Tags';

import { Card, Modal, Typography, Button, Image } from 'antd';
import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

const ProductCard = ({ product, imageSize = 250 }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [productImage, setProductImage] = useState(product.imageUrl);
  const [tempProductName, setTempProductName] = useState(product.name);
  const [tempProductImage, setTempProductImage] = useState(product.imageUrl);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    // Reset the temporary edited values
    setTempProductName(productName);
    setTempProductImage(productImage);
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setProductName(tempProductName);
    setProductImage(tempProductImage);
    setIsModalVisible(false);
  };
  const handleImageClick = () => {
    document.getElementById('image-upload').click();
  };

  // TODO: Fix the functionality for image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      Modal.error({
        title: 'Error',
        content: 'Please upload a valid image file.'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setTempProductImage(e.target.result);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <>
      <Card
        hoverable
        cover={
          <Image
            width="100%"
            height={imageSize}
            src={productImage}
            alt={productName}
            fallback={<div>Loading...</div>}
          />
        }
        className="max-w-64 m-2"
      >
        <Card.Meta title={productName} />
        <Tags tags={['t-shirt', 'red', 'blue', 'indigo']} />
        <EditOutlined key="edit" onClick={showModal} />
      </Card>
      <Modal
        title="Edit Product"
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

            <p>Price: AU${product.price}</p>
          </div>
          <div style={{ flex: 1 }}>
            <input
              type="file"
              id="image-upload"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <Image
              width="100%"
              height={imageSize}
              preview={false}
              src={tempProductImage}
              alt={tempProductName}
              onClick={handleImageClick}
              fallback={<div>Loading...</div>}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
