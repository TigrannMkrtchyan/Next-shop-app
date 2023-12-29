import React from 'react';
import CatalogPage from '@/components/catalogPage';
import { catalogType } from '@/utils/constants';

const Men = () => {
  return <CatalogPage type={catalogType.MEN} />;
};

export default Men;