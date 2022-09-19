import { useRouter } from 'next/router';
import type { NextPage } from 'next';
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

const PaginationPage: NextPage<PaginationPageProps> = ({ data }) => {
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
    fetchProducts(page);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <>
      <Container>
        <ProductList products={products} />
        <Pagination
          totalPageLength={Math.round(allProducts.length / CONTENTS_LENGTH)}
          pageLength={5}
          onChange={handleChangePage}
        />
      </Container>
    </>
  );
};

// export async function getServerSideProps() {
//   const { data } = await axios.get(`http://localhost:3000/products?page=${1}&size=${10}`);
//   const { products } = data.data;

//   return { props: { data: products } };
// }

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
