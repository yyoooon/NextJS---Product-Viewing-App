import styled from '@emotion/styled';

import Link from 'next/link';
import { Product } from '../../types/product';
import ProductItem from '../ProductItem/ProductItem';

type ProductListProps = {
  products: Product[];
  onClick?: (e: React.MouseEvent) => void;
};

const ProductList = ({ products, onClick }: ProductListProps) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick && onClick(e);
  };

  return (
    <Container>
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductItem key={product.id} product={product} onClick={handleClick} />
        </Link>
      ))}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
