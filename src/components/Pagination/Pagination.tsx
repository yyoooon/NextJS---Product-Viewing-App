import React from 'react';
import styled from '@emotion/styled';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from './usePagination';

type PaginationProps = {
  currentPage?: number;
  totalPageCount: number;
  limitPageCount: number;
  onChange: (currentPage: number) => void;
};

const Pagination = ({
  currentPage = 1,
  totalPageCount,
  limitPageCount,
  onChange,
}: PaginationProps) => {
  const { pages, isFirstGroup, isLastGroup, handleClickPage, handleClickLeft, handleClickRight } =
    usePagination({ totalPageCount, limitPageCount, currentPage, onChange });
  return (
    <Container>
      <Button onClick={handleClickLeft} disabled={isFirstGroup}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page
            key={page}
            selected={page === currentPage}
            disabled={page === currentPage}
            onClick={handleClickPage}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={handleClickRight} disabled={isLastGroup}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
