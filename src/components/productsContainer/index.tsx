'use client';
import React, { useState, useEffect } from 'react';
import { useProductService } from '../../../services/products/ProductServiceContext';
import Product from '../product';
import { IProduct } from '../../../services/base/types';

import styles from './index.module.scss';

const ProductsContainer: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const productService = useProductService();

  const fetch = async () => {
    const res = await productService.getProducts( 4, '&page=1');
    if (res.success && res?.data?.data) {
      setProducts(res?.data?.data);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productContainer}>
        <h2>FEATURED PRODUCTS</h2>
        <div className={styles.imageContainer}>
          {products.map((value) => (
            <Product
            href={`/${value.type}/${value.name}?color=${value._id}`}
            key={value._id}
              img={value.images[0]}
              price={value.price}
              name={value.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
