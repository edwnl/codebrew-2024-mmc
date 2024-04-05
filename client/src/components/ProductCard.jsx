import { Card, Modal, Typography, Button, Image, Tag } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const ProductCard = ({ product, productIndex, imageSize = 250 }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // modal to update the product
  const [productName, setProductName] = useState(product.name);
  const [productImage, setProductImage] = useState(product.imageUrl);
  const [tempProductName, setTempProductName] = useState(product.name);
  const [tempProductImage, setTempProductImage] = useState(product.imageUrl);
  const [tags, setTags] = useState(['t-shirt', 'red', 'blue', 'indigo']);
  const [newTag, setNewTag] = useState('');
  const [tempTags, setTempTags] = useState([...tags]);

  const productID = `product-no-${productIndex}`;

  // to handle the edit product modal
  const showModal = () => setIsModalVisible(true);

  // to close the edit product modal without any changes
  const handleCancel = () => {
    setTempProductName(productName);
    setTempProductImage(productImage);
    setIsModalVisible(false);
  };

  // updates the product details based on changes in modal
  const handleConfirm = () => {
    setProductName(tempProductName);
    setProductImage(tempProductImage);
    setTags(tempTags);
    setIsModalVisible(false);
  };

  // to trigger the image upload
  const handleImageClick = () => {
    console.log(imageUploadId);
    document.getElementById(productID).click();
  };

  // handles the image upload and change
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

  // to remove tags
  const handleTagClose = (removedTag) => {
    const updatedTags = tempTags.filter((tag) => tag !== removedTag);
    setTempTags(updatedTags);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      setTempTags([...tempTags, newTag]);
      setNewTag('');
    }
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
        <br />
        {tags.map((index) => (
          <Tag key={index} bordered={true}>
            {index}
          </Tag>
        ))}
        <br />
        <EditOutlined key="edit" onClick={showModal} />
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
            {tempTags.map((tag) => (
              <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
                {tag}
              </Tag>
            ))}
            <Tag
              icon={<PlusOutlined />}
              onClick={handleAddTag}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              Add new tag
            </Tag>
            {/* TODO: Complete the functionality for adding tag */}
          </div>
          <div style={{ flex: 1 }}>
            <input
              type="file"
              id={productID}
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
