import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

type PaginationProps = {
  totalPageLength: number;
  pageLength: number;
  onChange: (currentPage: number) => void;
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

  // TODO: useMemo, useCallback적용
  const isFirst = startPageIndex <= 0;
  const isLast = startPageIndex + pageLength > totalPageLength;

  const handleClickLeft = () => {
    if (isFirst) return;
    setStartPageIndex((prev) => prev - pageLength);
  };

  const handleClickRight = () => {
    if (isLast) return;
    setStartPageIndex((prev) => prev + pageLength);
  };

  const handleClickPage = (event: any) => {
    const { textContent } = event.target;
    const selectedPage = Number(textContent);
    setCurrentPage(Number(selectedPage));
    // onChange(Number(selectedPage))
  };

  useEffect(() => {
    setPages(totalPageArr.slice(startPageIndex, startPageIndex + pageLength));
    setCurrentPage(startPageIndex + 1);
  }, [pageLength, startPageIndex, totalPageArr]);

  return (
    <Container>
      <Button onClick={handleClickLeft} disabled={isFirst}>
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
      <Button onClick={handleClickRight} disabled={isLast}>
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
