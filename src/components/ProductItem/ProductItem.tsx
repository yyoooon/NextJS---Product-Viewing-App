import styled from '@emotion/styled';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Product } from '../../types/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => {
  return (
    <Link key={id} href={`/products/${id}`}>
      <Container>
        <Image
          src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
          alt='Picture of the author'
          width={180}
          height={180}
        />
        <Name>{name}</Name>
        <Price>{price.toLocaleString('ko-KR')}</Price>
      </Container>
    </Link>
  );
};

export default ProductItem;

const Container = styled.div`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Name = styled.h2`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.span`
  display: block;
  margin-top: 4px;
`;
