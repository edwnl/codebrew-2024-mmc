import React, { useContext, useState } from 'react';
import { Modal, Form, Input, Button, Tag, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DataContext } from '../App';

const { Option } = Select;

const CreateFit = ({ open, onClose, products }) => {
  const { handleCreateFit } = useContext(DataContext);

  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleAddFit = () => {
    form.validateFields().then((values) => {
      handleCreateFit({ ...values, images: selectedImages });
      form.resetFields();
      setSelectedImages([]);
      onClose();
    });
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
    setSelectedImages([]);
  };

  const handleChange = (value) => {
    setSelectedImages(value);
  };

  return (
    <Modal
      open={open}
      title="Create Fit"
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleAddFit}>
          Create
        </Button>
      ]}
    >
      <Form form={form} layout="vertical" name="createFitForm">
        <Form.Item
          name="name"
          label="Fit Name"
          rules={[{ required: true, message: 'Please input the fit name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <TagInput />
        </Form.Item>
        <Form.Item
          name="images"
          label="Images"
          rules={[{ required: true, message: 'Please select atleast one image!' }]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select images"
            onChange={handleChange}
            allowClear
          >
            {products.map((product) => (
              <Option key={product.id} value={product.imageUrl}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const TagInput = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleClose = (removedTag) => {
    const updatedTags = tags.filter((tag) => tag !== removedTag);
    setTags(updatedTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <Tag key={tag} closable onClose={() => handleClose(tag)}>
          {tag}
        </Tag>
      ))}
      {inputVisible && (
        <Input
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default CreateFit;
