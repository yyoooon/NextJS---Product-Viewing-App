import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

type PaginationProps = {
  totalPageLength: number;
  pageLength: number;
  onChange: (currentPage: number) => void;
};

// TODO: util폴더로 이동
function range(size: number, start: number) {
  return Array(size)
    .fill(start)
    .map((x, y) => x + y);
}

const Pagination = ({ totalPageLength, pageLength, onChange }: PaginationProps) => {
  const totalPageArr = useRef<number[]>(range(totalPageLength + 1, 0));
  const firstPage = useRef<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>(range(pageLength, 1));

  // TODO: useMemo, useCallback적용
  const isFirstStep = firstPage.current === 1;
  const isLastStep = firstPage.current + pageLength > totalPageLength;

  const handleClickPage = (event: any) => {
    const { textContent } = event.target;
    const selectedPage = Number(textContent);

    setCurrentPage(selectedPage);
    onChange(selectedPage);
  };

  const handleClickLeft = () => {
    if (isFirstStep) return;
    const newFirstPage = firstPage.current - pageLength;

    setPages(totalPageArr.current.slice(newFirstPage, newFirstPage + pageLength));
    setCurrentPage(newFirstPage);
    onChange(newFirstPage);

    firstPage.current = newFirstPage;
  };

  const handleClickRight = () => {
    if (isLastStep) return;
    const newFirstPage = firstPage.current + pageLength;

    setPages(totalPageArr.current.slice(newFirstPage, newFirstPage + pageLength));
    setCurrentPage(newFirstPage);
    onChange(newFirstPage);

    firstPage.current = newFirstPage;
  };

  return (
    <Container>
      <Button onClick={handleClickLeft} disabled={isFirstStep}>
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
      <Button onClick={handleClickRight} disabled={isLastStep}>
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
