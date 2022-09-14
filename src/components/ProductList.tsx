import styled from '@emotion/styled';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => (
  <Container>
    {products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))}
  </Container>
);

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
