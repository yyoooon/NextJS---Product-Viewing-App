import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import allProducts from '../api/data/products.json';
import { ProductList } from '@/components';
import { getProducts } from '@/api/product';
import { useIntersect } from '@/hooks';
import { Product } from '@/types';

const PRODUCTS_LENGTH = 16;

const InfiniteScrollPage: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const currentPage = useRef(1);

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

  // 상품 클릭 시 현재의 데이터와 스크롤 위치를 저장
  const handleClickProduct = () => {
    sessionStorage.setItem('PRODUCTS', JSON.stringify(products));
    sessionStorage.setItem('SCROLL_HEIGHT', `${window.scrollY}`);
    sessionStorage.setItem('CURRENT_PAGE', `${currentPage.current}`);
  };

  const checkPrevPageIsProduct = () => {
    const prevPath = sessionStorage.getItem('prevPath')?.split('/')[1];
    return prevPath === 'products';
  };

  const setStoredData = () => {
    const savedProducts = sessionStorage.getItem('PRODUCTS');
    const savedCurrentPage = sessionStorage.getItem('CURRENT_PAGE');
    if (!savedProducts || !savedCurrentPage) return;
    setProducts(JSON.parse(savedProducts));
    currentPage.current = Number(savedCurrentPage);
  };

  // 이전 페이지가 상품 페이지일 경우 세션 스토리지에 저장된 데이터로 초기화
  useEffect(() => {
    if (!checkPrevPageIsProduct()) return;
    setStoredData();
    setIsScrollable(true);
  }, []);

  // 위의 로직이 실행 되어 리스트가 렌더링 되면 저장된 스크롤 위치로 이동
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('SCROLL_HEIGHT');
    if (!isScrollable || !savedScroll) return;
    window.scrollTo(0, Number(savedScroll));
  }, [isScrollable]);

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
