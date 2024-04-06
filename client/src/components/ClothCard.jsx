import { Card, Modal, Typography, Button, Image, Tag, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getFunctions, httpsCallable } from 'firebase/functions';

const ClothCard = ({ cloth_data }) => {
  const [cloth, setCloth] = useState(cloth_data);

  const updateDB = async () => {
    // Call the Firebase Cloud Function for editing a cloth
    const editCloth = functions.httpsCallable('edit_cloth_handler');
    const editClothResponse = await editCloth(cloth);
    console.log('Edit Cloth Response:', editClothResponse.data);
  };

  // For the pop-up
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  // For updating tags
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const showInput = () => setInputVisible(true);
  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleInputConfirm = () => {
    if (inputValue.trim() !== '') {
      setCloth({
        ...cloth,
        tags: [...cloth.tags, inputValue]
      });

      updateDB();

      setInputValue('');
      setInputVisible(false);
    }
  };

  // For updating name
  const updateName = (newName) => {
    setCloth({
      ...cloth,
      name: newName
    });
    updateDB();
  };

  // Call the Firebase Cloud Function for deleting a cloth
  const handleDeleteProduct = async () => {
    const deleteCloth = functions.httpsCallable('delete_cloth_handler');
    const deleteClothResponse = await deleteCloth({ id: cloth.id });
    console.log('Delete Cloth Response:', deleteClothResponse.data);
  };

  // Image
  const handleImageClick = () => document.getElementById(`product-no-${cloth.id}`).click();
  const handleImageChange = (event) => {
    // Logic for handling image change
    const file = event.target.files[0];
    // Assuming similar logic for handling image change as in the original code
    console.log('Not Implemented.');
  };

  // Tag Editing
  const handleTagClose = (removedTag) => {
    setCloth({
      ...cloth,
      tags: cloth.tags.filter((tag) => tag !== removedTag)
    });
    updateDB();
  };

  return (
    <>
      <Card
        hoverable
        cover={
          <Image
            width="100%"
            height={240}
            src={cloth.imageUrl}
            alt={cloth.name}
            fallback={'Loading'}
          />
        }
        className="max-w-64 m-2"
        actions={[
          <EditOutlined key="edit" onClick={showModal} style={{ fontSize: '20px' }} />,
          <DeleteOutlined key="delete" style={{ fontSize: '20px' }} onClick={handleDeleteProduct} />
        ]}
      >
        <div>
          <Card.Meta title={cloth.name} />
          <br />
          {cloth.tags.slice(0, 5).map((tag) => (
            <Tag key={tag.id} onClose={() => handleTagClose(tag)}>
              {tag}
            </Tag>
          ))}
          {cloth.tags.length > 6 && <Tag>.....</Tag>}
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
          <Button key="confirm" type="primary" onClick={handleCancel}>
            Confirm
          </Button>
        ]}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            {/*  CLOTH NAME  */}
            <Typography.Title
              level={4}
              editable={{
                onChange: { updateName },
                icon: <EditOutlined />,
                autoSize: true
              }}
            >
              {cloth.name}
            </Typography.Title>

            {/*  CLOTH TAGS  */}
            {cloth.tags.map((tag) => (
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

          {/*  CLOTH IMAGE  */}
          <div style={{ flex: 1 }}>
            <input
              type="file"
              id={`product-no-${cloth.id}`}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <Image
              width="100%"
              height={240}
              preview={false}
              src={cloth.imageUrl}
              alt={cloth.name}
              onClick={handleImageClick}
              fallback={'Loading'}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ClothCard;
