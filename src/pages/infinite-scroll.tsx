import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import products from '../api/data/products.json';
import ProductList from '@/components/ProductList/ProductList';

const InfiniteScrollPage: NextPage = () => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      // 데이터 불러오는 로직 작성
    }
  };

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(target);

    return () => observer.disconnect();
  }, [target]);

  return (
    <>
      <Container>
        <ProductList products={products} />
      </Container>
      <div ref={setTarget}></div>
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
