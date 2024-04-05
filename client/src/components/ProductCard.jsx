import Tags from './Tags';

import { Card, Modal, Typography, Button } from 'antd';
import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

const ProductCard = ({ product }) => {
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

  const handleNameChange = (value) => {
    setTempProductName(value);
  };

  const handleImageClick = () => {
    document.getElementById('image-upload').click();
  };

  const handleImageChange = (info) => {
    const file = info.file;

    if (file && file.status === 'done' && file.type && file.type.startsWith('image/')) {
      setProductImage(file.response.url);
    } else {
      Modal.error({
        title: 'Error',
        content: 'Please upload a valid image file.'
      });
    }
  };

  return (
    <>
      <Card
        hoverable
        onClick={showModal}
        cover={<img alt={productName} src={productImage} />}
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
                onChange: handleNameChange,
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
            <img
              src={productImage}
              alt={productName}
              style={{ maxWidth: '100%', cursor: 'pointer' }}
              onClick={handleImageClick}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
