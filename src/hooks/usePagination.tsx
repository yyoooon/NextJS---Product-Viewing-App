import React, { useEffect, useRef, useState } from 'react';

type UsePaginationArgs = {
  currentPage: number;
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

const getCurrentGroupIndex = (currentPage: number, limitPageCount: number) => {
  return Math.floor(currentPage / limitPageCount);
};

const usePagination = ({
  totalPageCount,
  limitPageCount,
  currentPage,
  onChange,
}: UsePaginationArgs) => {
  const pagesGroupList = useRef<number[][]>(createPagesGroupList(totalPageCount, limitPageCount));
  const currentGroupIndex = useRef<number>(getCurrentGroupIndex(currentPage, limitPageCount));
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

  return { pages, handleClickPage, handleClickLeft, handleClickRight, isFirstGroup, isLastGroup };
};

export default usePagination;
