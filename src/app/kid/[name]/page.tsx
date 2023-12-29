"use client"

import React from 'react';
import ProductPageComponent from '@/components/productPageComponent';
import { catalogType } from '@/utils/constants';

const ProductKidPage: React.FC = () => {
  return <ProductPageComponent type={catalogType.KID} />;
};

export default ProductKidPage;
