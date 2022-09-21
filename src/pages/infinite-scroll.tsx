import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import allProducts from '../api/data/products.json';
import ProductList from '@/components/ProductList/ProductList';
import { getProducts } from '@/api/product';
import { useIntersect } from '@/hooks';
import { Product } from '@/types';

const PRODUCTS_LENGTH = 16;

const InfiniteScrollPage: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentPage = useRef(1);
  const [canScrollMove, setCanScrollMove] = useState(false);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const { data } = await getProducts(page, PRODUCTS_LENGTH);
      const { products } = data.data;
      setProducts((prev) => [...prev, ...products]);
    } catch (error: any) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    const isLastPage = allProducts.length === products.length;
    if (!isLastPage && !isLoading) {
      fetchProducts(currentPage.current);
      currentPage.current++;
    }
  });

  const handleClickProduct = () => {
    sessionStorage.setItem('PRODUCTS', JSON.stringify(products));
    sessionStorage.setItem('SCROLL_HEIGHT', `${window.scrollY}`);
    sessionStorage.setItem('CURRENT_PAGE', `${currentPage.current}`);
  };

  useEffect(() => {
    const prevPath = sessionStorage.getItem('prevPath')?.split('/')[1];
    if (prevPath !== 'products') return;

    const savedProducts = sessionStorage.getItem('PRODUCTS');
    const savedCurrentPage = sessionStorage.getItem('CURRENT_PAGE');
    if (!savedProducts || !savedCurrentPage) return;

    setProducts(JSON.parse(savedProducts));
    currentPage.current = Number(savedCurrentPage);
    setCanScrollMove(true);
  }, []);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('SCROLL_HEIGHT');
    if (!canScrollMove || !savedScroll) return;

    window.scrollTo(0, Number(savedScroll));
  }, [canScrollMove]);

  return (
    <>
      <Container>
        <ProductList products={products} onClick={handleClickProduct} />
        <div ref={ref}>{isLoading ? '로딩 중입니다' : ''}</div>
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
