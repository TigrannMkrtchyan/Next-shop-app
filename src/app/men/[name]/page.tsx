"use client"

import React from 'react';
import ProductPageComponent from '@/components/productPageComponent';
import { catalogType } from '@/utils/constants';

const ProductMenPage: React.FC = () => {
  return <ProductPageComponent type={catalogType.MEN} />;
};

export default ProductMenPage;
