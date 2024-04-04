import { Card } from 'antd';
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.imageUrl} />}
      className="max-w-64 m-2"
    >
      <Card.Meta title={product.name} description={`AU$${product.price}`} />
    </Card>
  );
};

export default ProductCard;
