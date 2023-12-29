import React from 'react';
import TitleContainer from '@/components/titleContainer';
import ShopCardContainer from '@/components/shopCardContainer';
import ProductsContainer from '@/components/productsContainer';

const Home: React.FC = () => {
  return (
    <main>
      <TitleContainer />
      <ShopCardContainer />
      <ProductsContainer />
    </main>
  );
};
export default Home;
