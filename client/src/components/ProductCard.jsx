import { Card, Modal, Typography, Button, Image, Tag, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductCard = ({ product, productIndex, imageSize = 240 }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // modal to update the product
  const [productName, setProductName] = useState(product.name);
  const [productImage, setProductImage] = useState(product.imageUrl);
  const [tempProductName, setTempProductName] = useState(product.name);
  const [tempProductImage, setTempProductImage] = useState(product.imageUrl);
  const [tags, setTags] = useState(['t-shirt', 'red', 'blue', 'indigo']);
  const [tempTags, setTempTags] = useState([...tags]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const productID = `product-no-${productIndex}`;

  // to handle the edit product modal
  const showModal = () => setIsModalVisible(true);

  // to close the edit product modal without any changes
  const handleCancel = () => {
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
  };

  // to remove tags
  const handleTagClose = (removedTag) => {
    const updatedTags = tempTags.filter((tag) => tag !== removedTag);
    setTempTags(updatedTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue.trim() !== '') {
      setTempTags([...tempTags, inputValue.trim()]);
      setInputValue('');
      setInputVisible(false);
    }
  };

  // Add delete funcitonality here
  const deleteProduct = () => {};

  const showInput = () => {
    setInputVisible(true);
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
        actions={[
          <EditOutlined key="edit" onClick={showModal} style={{ fontSize: '20px' }} />,
          <DeleteOutlined key="delete" style={{ fontSize: '20px' }} onClick={deleteProduct} />
        ]}
      >
        <div>
          <Card.Meta title={productName} />
          <br />
          {tags.slice(0, 5).map((tag) => (
            <Tag key={tag} onClose={() => handleTagClose(tag)}>
              {tag}
            </Tag>
          ))}
          {tempTags.length > 6 && <Tag>.....</Tag>}
        </div>
      </Card>
      <Modal
        title="Edit your Fit"
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
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{ width: 78, margin: '4px 0' }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag style={{ cursor: 'pointer' }} onClick={showInput} icon={<PlusOutlined />}>
                Add Tag
              </Tag>
            )}
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
