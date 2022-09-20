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

type PaginationPageProps = {
  data: Product[];
};

const PaginationPage: NextPage<PaginationPageProps> = () => {
  const router = useRouter();
  const { page } = router.query;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  const fetchProducts = async (page: number) => {
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
          <span>존재하지 않는 페이지입니다.</span>
        )}
      </Container>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const { data } = await axios.get(`/products`, {
//       params: { page: context.query.page, size: CONTENTS_LENGTH },
//     });
//     console.log(data);
//     return { props: { data: data.data.products } };
//   } catch (err) {
//     console.log(err);
//     return {
//       props: { data: [] },
//     };
//   }
// };

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
