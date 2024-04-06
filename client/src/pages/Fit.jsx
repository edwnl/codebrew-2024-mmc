import { useContext, useState } from 'react';
import MultiImageCard from '../components/MultiImageCard';
import { DataContext } from '../App';
import { FloatButton } from 'antd';
import { PlusOutlined, SettingFilled } from '@ant-design/icons';
import CreateFit from '../components/CreateFit';

const Fit = () => {
  const { products, fits, handleDeleteFit } = useContext(DataContext);
  const [isCreateFitVisible, setIsCreateFitVisible] = useState(false);
  const handleClick = () => {
    setIsCreateFitVisible(true);
  };

  const handleCreateFitClose = () => {
    setIsCreateFitVisible(false);
  };

  const generateFits = () => {};

  return (
    <>
      {isCreateFitVisible && (
        <CreateFit open={isCreateFitVisible} products={products} onClose={handleCreateFitClose} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-start p-8">
        {fits.map((item, index) => (
          <div key={item.id}>
            <MultiImageCard
              fit={item}
              fitIndex={index}
              products={products}
              onDelete={() => handleDeleteFit(item.id)}
            />
          </div>
        ))}
      </div>

      <FloatButton.Group shape="circle" style={{ right: 46 }} type="primary" size="large">
        <FloatButton icon={<PlusOutlined onClick={handleClick} />} />
        <FloatButton icon={<SettingFilled onClick={generateFits} />} />
      </FloatButton.Group>
    </>
  );
};

export default Fit;
