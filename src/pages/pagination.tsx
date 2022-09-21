import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import allProducts from '../api/data/products.json';
import { ProductList, Pagination, MessageContainer } from '@/components';
import { getProducts } from '@/api/product';
import { Product } from '@/types';

const CONTENTS_LENGTH = 10;

type PaginationPageProps = {
  data: Product[];
};

const PaginationPage: NextPage<PaginationPageProps> = () => {
  const router = useRouter();
  const { page } = router.query;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const { data } = await getProducts(page, CONTENTS_LENGTH);
      const { products } = data.data;
      setProducts(products);
    } catch (error: any) {
      if (error.status === 404) {
        setIsNotFoundPage(true);
        return;
      }
      alert(error.message);
    }
    setIsLoading(false);
  };

  const handleChangePage = (page: number) => {
    router.push(`pagination?page=${page}`, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!page) return;
    setCurrentPage(Number(page));
    fetchProducts(Number(page));
  }, [page]);

  return (
    <>
      <Container>
        {!isNotFoundPage ? (
          !isLoading ? (
            <>
              <ProductList products={products} />
              <Pagination
                totalPageCount={Math.round(allProducts.length / CONTENTS_LENGTH)}
                limitPageCount={5}
                currentPage={currentPage}
                onChange={handleChangePage}
              />
            </>
          ) : (
            <MessageContainer>로딩 중입니다.</MessageContainer>
          )
        ) : (
          <MessageContainer>존재하지 않는 페이지입니다.</MessageContainer>
        )}
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
