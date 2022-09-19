import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

type PaginationProps = {
  currentPage?: number;
  totalPageCount: number;
  limitPageCount: number;
  onChange: (currentPage: number) => void;
};

const range = (size: number, start: number) => {
  return Array(size)
    .fill(start)
    .map((x, y) => x + y);
};

const createPagesGroupList = (totalPageCount: number, limitPageCount: number) => {
  const totalPagesGroupList = range(totalPageCount, 1);
  const pagesGroupList = [];
  for (let i = 0; i < totalPagesGroupList.length; i += limitPageCount) {
    pagesGroupList.push(totalPagesGroupList.slice(i, i + limitPageCount));
  }
  return pagesGroupList;
};

const Pagination = ({
  currentPage = 1,
  totalPageCount,
  limitPageCount,
  onChange,
}: PaginationProps) => {
  const pagesGroupList = useRef<number[][]>(createPagesGroupList(totalPageCount, limitPageCount));
  const currentGroupIndex = useRef<number>(Math.floor(currentPage / limitPageCount));
  const [pages, setPages] = useState<number[]>(pagesGroupList.current[currentGroupIndex.current]);

  const isFirstGroup = currentGroupIndex.current === 0;
  const isLastGroup = currentGroupIndex.current === pagesGroupList.current.length - 1;

  const handleClickPage = (event: any) => {
    const { textContent } = event.target;
    const selectedPage = Number(textContent);

    onChange(selectedPage);
  };

  const handleClickLeft = () => {
    if (isFirstGroup) return;

    currentGroupIndex.current -= 1;

    setPages(pagesGroupList.current[currentGroupIndex.current]);
    onChange(pagesGroupList.current[currentGroupIndex.current][0]);
  };

  const handleClickRight = () => {
    if (isLastGroup) return;

    currentGroupIndex.current += 1;

    setPages(pagesGroupList.current[currentGroupIndex.current]);
    onChange(pagesGroupList.current[currentGroupIndex.current][0]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
