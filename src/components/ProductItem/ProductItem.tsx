import styled from '@emotion/styled';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/types/product';

type ProductItemProps = {
  product: Product;
  onClick?: (e: React.MouseEvent) => void;
};

const ProductItem = ({ product: { id, name, thumbnail, price }, onClick }: ProductItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick && onClick(e);
  };

  return (
    <Link key={id} href={`/products/${id}`}>
      <Container onClick={handleClick}>
        <Image
          src={thumbnail || '/defaultThumbnail.jpg'}
          alt={`${name}상품 썸네일 이미지`}
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
  cursor: pointer;
`;

const Name = styled.h2`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.span`
  display: block;
  margin-top: 4px;
`;
