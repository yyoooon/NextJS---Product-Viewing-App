import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList/ProductList';
import Pagination from '../components/Pagination/Pagination';

const CONTENTS_LENGTH = 10;

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <>
      <Container>
        <ProductList products={products.slice(0, 10)} />
        <Pagination
          totalPageLength={Math.round(products.length / CONTENTS_LENGTH)}
          pageLength={5}
          onChange={(currentPage) => {
            console.log(currentPage);
          }}
        />
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
