import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { MessageContainer } from '@/components';
import { getProduct } from '@/api/product';
import { Product } from '@/types';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  const fetchProduct = async (id: string | string[]) => {
    setIsLoading(true);
    try {
      const { data } = await getProduct(id);
      setProduct(data.data.product);
    } catch (error: any) {
      if (error.status === 404) {
        setIsNotFoundPage(true);
        return;
      }
      alert(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  return !isNotFoundPage ? (
    !isLoading ? (
      <>
        <Thumbnail
          src={product?.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'}
          alt={`${product?.name}상품 사진`}
        />
        <ProductInfoWrapper>
          <Name>{product?.name}</Name>
          <Price>{product?.price.toLocaleString('ko-KR')}원</Price>
        </ProductInfoWrapper>
      </>
    ) : (
      <MessageContainer>로딩 중입니다.</MessageContainer>
    )
  ) : (
    <MessageContainer>존재하지 않는 상품입니다.</MessageContainer>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.span`
  display: block;
  font-size: 18px;
  margin-top: 8px;
`;
