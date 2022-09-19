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

// TODO: 페이지 이동해 컨텐츠 수가 달라졌을 때의 스크롤 조절하기
const Pagination = ({ totalPageLength, pageLength, onChange }: PaginationProps) => {
  const totalPageArrRef = useRef<number[]>(range(totalPageLength, 1));
  const totalPageArr = totalPageArrRef.current;
  const [currentPage, setCurrentPage] = useState(1);
  const [startPageIndex, setStartPageIndex] = useState(0);
  const [pages, setPages] = useState<number[]>(totalPageArr.slice(startPageIndex, pageLength));

  // TODO: useMemo, useCallback적용
  const isFirstStep = startPageIndex <= 0;
  const isLastStep = startPageIndex + pageLength > totalPageLength;

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    onChange(newPage);
  };

  const handleClickLeft = () => {
    if (isFirstStep) return;
    const newStartPageIndex = startPageIndex - pageLength;

    setStartPageIndex(startPageIndex - pageLength);
    changePage(Number(newStartPageIndex + 1));
  };

  const handleClickRight = () => {
    if (isLastStep) return;
    const newStartPageIndex = startPageIndex + pageLength;

    setStartPageIndex(newStartPageIndex);
    changePage(Number(newStartPageIndex + 1));
  };

  const handleClickPage = (event: any) => {
    const { textContent } = event.target;
    const selectedPage = Number(textContent);
    changePage(selectedPage);
  };

  useEffect(() => {
    setPages(totalPageArr.slice(startPageIndex, startPageIndex + pageLength));
    setCurrentPage(startPageIndex + 1);
  }, [pageLength, startPageIndex, totalPageArr]);

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
