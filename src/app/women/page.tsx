import React from 'react';
import CatalogPage from '@/components/catalogPage';
import { catalogType } from '@/utils/constants';

const Women = () => {
  return <CatalogPage type={catalogType.WOMEN} />;
};

export default Women;
