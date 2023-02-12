import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cn } from '../../utills/utills';
import cls from './ProductPage.module.scss';

interface PageProps {
  className?: string;
}

interface Product {
  images: string[];
  price: number;
  modelName: string;
}

const ProductPage: React.FC = ({ className }: PageProps) => {
  const productId = useParams().productId;
  const [product, setProduct] = useState<Product>();
  // const match: item = useSelector((state) => state.bikes.list).find((item) => item.id == productId);

  if (!product) {
    return <p>'При обновлении велосипеды пока не показываются';</p>;
  }

  // const { modelName, images, price } = product;

  return (
    <div className={cn(cls.ProductPage, {}, [className])}>
      <img src={product.images[0]} alt={product.modelName} />
      <h2>{product.modelName}</h2>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductPage;
