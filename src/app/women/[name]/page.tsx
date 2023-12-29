"use client"

import React from 'react';
import ProductPageComponent from '@/components/productPageComponent';
import { catalogType } from '@/utils/constants';

const ProductWomenPage: React.FC = () => {
  return <ProductPageComponent type={catalogType.WOMEN} />;
};

export default ProductWomenPage;
