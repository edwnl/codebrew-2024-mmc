import {Card} from 'antd';
import React from 'react';
import Tags from "./Tags";

const ProductCard = ({product}) => {
  return (
      <Card
          hoverable
          cover={<img alt={product.name} src={product.imageUrl}/>}
          className="max-w-64 m-2"
      >
          <Card.Meta title={product.name}/>
          <Tags tags={["t-shirt", "red", "blue", "indigo", ]} />
      </Card>
  );
};

export default ProductCard;
// <div id="root">
//   <nav className="flex flex-col items-center justify-center mx-auto p-4 border-b-2 border-black">
//     <div className="text-3xl tracking-wider pb-4">WARDROBE</div>
//   </nav>
//   <main className="flex bg-white justify-center items-center w-full">
//     <div className="flex justify-center items-center mt-16">
//       <div className="max-w-sm p-6 bg-white shadow rounded-lg border-2 border-black"></div>
//     </div>
//   </main>
// </div>