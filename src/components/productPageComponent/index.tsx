'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/contexts/userContext';
import { useUserService } from '../../../services/user/UserServiceContext';
import { useProductService } from '../../../services/products/ProductServiceContext';
import { useNotificationContext } from '@/contexts/notificationContext';
import QuantityInput from '../quantityInput';
import SizeButton from '../sizeButton';
import { pagesUrls } from '@/utils/constants';
import { IProduct, ProductsCollection } from '../../../services/base/types';
import { ProductPageProps } from './type';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import styles from './index.module.scss';

const ProductPageComponent: React.FC<ProductPageProps> = ({ type }) => {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [collection, setCollection] = useState<ProductsCollection<IProduct>>(
    {} as ProductsCollection<IProduct>
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [isCountError, setIsCountError] = useState<boolean>(false);
  const [availableCount, setAvailableCount] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [size, setSize] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string>('');
  const { name } = useParams();
  const { user } = useUser();
  const productService = useProductService();
  const searchParams = useSearchParams();
  const router = useRouter();
  const userService = useUserService();
  const { openNotification } = useNotificationContext();

  const fetch = async (color: string) => {
    setLoading(true);
    const res = await productService.getProduct(color);

    if (res.success && res?.data) {
      setProduct(res.data);
      if (res.data?.images.length) {
        setMainImage(res.data?.images[0]);
      }
    }
    if (!collection?.name) {
      const collectionResponse = await productService.getProductCollection(
        name
      );

      if (collectionResponse.success && collectionResponse?.data) {
        setCollection(collectionResponse.data);
      }
    }
    setLoading(false);
  };

  const handleCountChange = (value: number) => {
    if (value < 1) {
      setCount(1);
      return;
    }
    setCount(value);
  };

  const changeColor = (colorId: string) => {
    router.push(`/${type}/${name}?color=${colorId}`, { scroll: false });
    fetch(colorId);
  };

  const handleAdd = async () => {
    if (!user) {
      return;
    }

    setIsError(false);
    setIsCountError(false);
    if (!size) {
      setIsError(true);
      return;
    }
    const sizeCheck = product.sizes.find((value) => value.size === size);

    if (!sizeCheck) {
      setIsError(true);
      return;
    }

    if (availableCount < count) {
      setIsCountError(true);
      return;
    }
    const res = await userService.addToCard({
      count,
      product: product._id,
      size,
    });
    if (res.success) {
      openNotification('success', 'added to your personal card');
    }
  };

  useEffect(() => {
    const color = searchParams.get('color');

    if (color) {
      fetch(color);
    }
  }, []);

  useEffect(() => {
    if (product?.sizes) {
      const chosenSize = product.sizes.find((value) => value.size === size);

      if (chosenSize) {
        setAvailableCount(chosenSize.count);
      } else {
        setAvailableCount(0);
      }
    }
  }, [product]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.linkContainer}>
          <Link className={styles.link} href={pagesUrls.HOME}>
            Home
          </Link>
          /
          <Link className={styles.link} href={`/${type}`}>
            {type}
          </Link>
          / <span>{product.name}</span>
        </div>
        {!product?.color || !collection?.name ? (
          <div className={styles.badLink}>
            {loading ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              <h1>
                you followed bad Link go back <a href={pagesUrls.HOME}>Home</a>
              </h1>
            )}
          </div>
        ) : (
          <div className={styles.productContainer}>
            <div className={styles.imagesContainer}>
              <img className={styles.mainImage} src={mainImage} alt='' />
              <div className={styles.images}>
                {product?.images?.map((value, i) => (
                  <img
                    key={i}
                    src={value}
                    alt=''
                    onClick={() => {
                      setMainImage(value);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={styles.details}>
              <h1>{product.name}</h1>
              <p className={styles.price}>${product.price}</p>
              <div className={styles.PropertyList}>
                <p>
                  <span>Color:</span> {product.color}
                </p>
                {product?.brand && (
                  <p>
                    <span>Brand:</span> {product.brand}
                  </p>
                )}
              </div>
              <QuantityInput
                value={count}
                placeholder='Qty'
                onChange={handleCountChange}
              />
              {isCountError && (
                <p className={styles.error}>we don't have enough count </p>
              )}
              <div
                className={`${styles.add} ${!user ? styles.addDisabled : ''}`}
                onClick={handleAdd}
              >
                ADD TO CART
              </div>
              <div className={styles.propertyContainer}>
                {collection?.products?.map((value) => (
                  <SizeButton
                    key={value._id}
                    text={value.color}
                    chosen={product.color === value.color}
                    onClick={() => {
                      if (product.color !== value.color) changeColor(value._id);
                    }}
                  />
                ))}
              </div>

              <div className={styles.propertyContainer}>
                {product?.sizes?.map((value, i) => (
                  <SizeButton
                    key={i}
                    text={value.size}
                    chosen={value.size === size}
                    onClick={() => {
                      setSize(value.size);
                      setAvailableCount(value.count);
                    }}
                  />
                ))}
              </div>
              {isError && (
                <p className={styles.error}>
                  please fill all required information
                </p>
              )}

              {!user && (
                <p className={styles.error}>
                  You need to <a href={pagesUrls.HOME}>Log in</a> first to be
                  able to purchase
                </p>
              )}
              <p>{product.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPageComponent;
