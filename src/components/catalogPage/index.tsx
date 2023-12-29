'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useProductService } from '../../../services/products/ProductServiceContext';
import Link from 'next/link';
import Product from '../product';
import RangeInput from '../rangeInput';
import CheckBoxContainer from '../checkboxContainer';
import {
  validProductSizes,
  validProductColors,
  validProductBrands,
} from '@/utils/constants';
import { Pagination } from 'antd';
import { CatalogPageProps } from './type';
import { CheckBoxContainerValues } from '../checkboxContainer/type';
import { pagesUrls } from '@/utils/constants';
import { IPaginatedData, IProduct } from '../../../services/base/types';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import styles from './index.module.scss';

const CatalogPage: React.FC<CatalogPageProps> = ({ type }) => {
  const [sortByOn, setSortByON] = useState<boolean>(false);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(1000);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [colors, setColors] = useState<CheckBoxContainerValues>({});
  const [sizes, setSizes] = useState<CheckBoxContainerValues>({});
  const [brands, setBrands] = useState<CheckBoxContainerValues>({});
  const [input, setInput] = useState<any>({});
  const [products, setProducts] = useState<IPaginatedData<IProduct[]>>(
    {} as IPaginatedData<IProduct[]>
  );
  const debouncedValue = useDebounce<any>(input, 500);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productService = useProductService();
  const pageSize = 9;

  useEffect(() => {
    setInput({ brands, sizes, colors, max, min, sortByOn, page });
  }, [brands, sizes, colors, max, min, sortByOn, page]);

  const onChange = (values: number[]) => {
    setMin(values[0]);
    setMax(values[1]);
  };

  const fixData = (
    array: string[],
    setData: (data: CheckBoxContainerValues) => void,
    checkedData: undefined | string[]
  ): void => {
    const res: CheckBoxContainerValues = {};

    for (const element of array) {
      res[element] = !!checkedData && checkedData.includes(element);
    }
    setData(res);
  };

  const getDataList = (array: CheckBoxContainerValues) => {
    const res = [];
    for (const element in array) {
      if (array[element]) {
        res.push(element);
      }
    }
    return res;
  };

  const fetch = async (urlWithFilters?: string) => {
    setLoading(true);
    const res = await productService.getProducts(pageSize, urlWithFilters);
    if (res.success && res?.data?.data) {
      setProducts(res?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const sortOrderQuery = searchParams.get('sortOrder');
    const minQuery = searchParams.get('min');
    const maxQuery = searchParams.get('max');
    const brandsQuery = searchParams.get('brands');
    const sizesQuery = searchParams.get('sizes');
    const colorsQuery = searchParams.get('colors');

    if (minQuery) {
      setMin(Number(minQuery));
    }
    if (maxQuery) {
      setMax(Number(maxQuery));
    }
    if (sortOrderQuery) {
      setSortByON(true);
    }

    fixData(validProductColors, setColors, colorsQuery?.split(','));
    fixData(validProductSizes, setSizes, sizesQuery?.split(','));
    fixData(validProductBrands, setBrands, brandsQuery?.split(','));
  }, []);

  useEffect(() => {
    const colorsList = getDataList(colors);
    const sizesList = getDataList(sizes);
    const brandsList = getDataList(brands);
    let url = '';
    url += `page=${page}`;
    url += `&min=${min}`;
    url += `&max=${max}`;
    if (brandsList.length) {
      url += `&brands=${brandsList.join()}`;
    }
    if (sizesList.length) {
      url += `&sizes=${sizesList.join()}`;
    }
    if (colorsList.length) {
      url += `&colors=${colorsList.join()}`;
    }

    if (sortByOn) url += '&sortOrder=desc';

    url += `&type=${type}`;

    router.push(`/${type}?${url}`, { scroll: false });
    fetch(url);
  }, [debouncedValue]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.linkContainer}>
          <Link href={pagesUrls.HOME}>Home</Link> / <span>{type}</span>
        </div>
        <div className={styles.header}>
          <h2>{type}</h2>
        </div>
        <div className={styles.catalog}>
          <div className={styles.catalogHeader}>
            <div>
              <p className={styles.shopBy}>SHOP BY</p>
            </div>
            <div className={styles.sortContainer}>
              <p>Sort by:</p>
              <img
                src='arrowDown.svg'
                alt=''
                className={sortByOn ? styles.rotate : ''}
                onClick={() => setSortByON(!sortByOn)}
              />
            </div>
          </div>
          <div className={styles.ProductsContainer}>
            <div className={styles.filters}>
              <RangeInput min={min} max={max} onChange={onChange} />
              <CheckBoxContainer
                values={colors}
                title={'COLOR'}
                setChange={setColors}
              />
              <CheckBoxContainer
                values={sizes}
                title={'SIZE'}
                setChange={setSizes}
              />
              <CheckBoxContainer
                values={brands}
                title={'BRAND'}
                setChange={setBrands}
              />
            </div>
            {products?.data?.length ? (
              <div className={styles.products}>
                {products.data.map((value) => (
                  <Product
                    href={`/${value.type}/${value.name}?color=${value._id}`}
                    key={value._id}
                    img={value.images[0]}
                    price={value.price}
                    name={value.name}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noDataFound}>
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  <h1>no data was found</h1>
                )}
              </div>
            )}
          </div>
          <div className={styles.paginationContainer}>
            <Pagination
              current={page}
              total={products.total}
              pageSize={pageSize}
              onChange={(page) => {
                setPage(page);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
