import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

type PaginationProps = {
  totalPageLength: number;
  pageLength: number;
};

function range(size: number, start: number) {
  return Array(size)
    .fill(start)
    .map((x, y) => x + y);
}

const Pagination = ({ totalPageLength, pageLength }: PaginationProps) => {
  const totalPageArrRef = useRef<number[]>(range(totalPageLength, 1));
  const totalPageArr = totalPageArrRef.current;
  const [startPageIndex, setStartPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<number[]>(totalPageArr.slice(startPageIndex, pageLength));

  useEffect(() => {
    setPages(totalPageArr.slice(startPageIndex, pageLength));
  }, [pageLength, startPageIndex, totalPageArr]);

  return (
    <Container>
      <Button disabled>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page key={page} selected={page === currentPage} disabled={page === currentPage}>
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={false}>
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
