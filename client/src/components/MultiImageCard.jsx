import React from 'react';
import { Card } from 'antd';
import Tags from './Tags';

const MultiImageCard = ({ product }) => {
    // Function to repeat each image URL four times
    const repeatedImages = Array.from({ length: 4 }, () => product.imageUrl);

    return (
        <Card hoverable className="max-w-64 m-2">
            <div className="grid grid-cols-2 gap-1">
                {repeatedImages.map((imageUrl, index) => (
                    <div key={index} className="w-full">
                        <img alt={product.name} src={imageUrl} className="w-full h-auto rounded-lg"/>
                    </div>
                ))}
            </div>
            <div className="mt-2">
                <Card.Meta title={product.name}/>
                <Tags tags={["t-shirt", "red", "blue", "indigo"]} />
            </div>
        </Card>
    );
};

export default MultiImageCard;
