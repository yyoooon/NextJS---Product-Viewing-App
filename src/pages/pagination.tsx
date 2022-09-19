import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import allProducts from '../api/data/products.json';
import ProductList from '../components/ProductList/ProductList';
import Pagination from '../components/Pagination/Pagination';
import { getProducts } from '@/api/product';
import { Product } from '@/types';
import axios from 'axios';

const CONTENTS_LENGTH = 10;

// type PaginationPageProps = {
//   data: Product[];
// };

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const [products, setProducts] = useState([]);

  const fetchProducts = async (page: number) => {
    try {
      const { data } = await getProducts(page, CONTENTS_LENGTH);
      const { products } = data.data;

      setProducts(products);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleChangePage = (page: number) => {
    router.push(`pagination?page=${page}`, undefined, { shallow: true });
    fetchProducts(page);
  };

  useEffect(() => {
    if (!page) return;
    fetchProducts(Number(page));
  }, [page]);

  return (
    <>
      <Container>
        <ProductList products={products} />
        <Pagination
          totalPageCount={Math.round(allProducts.length / CONTENTS_LENGTH)}
          limitPageCount={5}
          currentPage={Number(page) || 1}
          onChange={handleChangePage}
        />
      </Container>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { data } = await axios.get(
//     `http://localhost:3000/products?page=${context.query.page}&size=${CONTENTS_LENGTH}`
//   );
//   const { products } = data.data;
//   return { props: { data: products } };
// };

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
