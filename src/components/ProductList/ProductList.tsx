import styled from '@emotion/styled';

import { Product } from '@/types';
import { ProductItem } from '@/components';

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
        <ProductItem key={product.id} product={product} onClick={handleClick} />
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
