import React from 'react';
import CatalogPage from '@/components/catalogPage';
import { catalogType } from '@/utils/constants';

const Kid = () => {
  return <CatalogPage type={catalogType.KID} />;
};

export default Kid;
