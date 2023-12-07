import React, {useEffect, useState} from 'react';

const usePagination = (currentPage,totalPages) => {

  const [slidingWindowPages, setSlidingWindowPages] = useState([]);

  let numberPagesArr = [];

  for (let i = 1; i <= totalPages; i++) {
    numberPagesArr.push(i);
  }

  useEffect(() => {
    const ellipsis= '...';
    let tempNumberOfPages = [...numberPagesArr];
    tempNumberOfPages = tempNumberOfPages.slice(0, 3);
    if (currentPage <= 2) {
      const slicedPage = numberPagesArr.slice(1, 3);
      tempNumberOfPages = [1, ...slicedPage, ellipsis, totalPages];
    }
    if (currentPage > 2 && currentPage <= 3) {
      const slicedPage = numberPagesArr.slice(1, 4);
      tempNumberOfPages = [1, ...slicedPage, ellipsis, totalPages];
    }
    if (currentPage >= 4 && currentPage < totalPages - 2) {
      const slicedPage = numberPagesArr.slice(currentPage - 2, currentPage + 1);
      tempNumberOfPages = [1, ellipsis, ...slicedPage, ellipsis, totalPages];
    }

    if (currentPage >= totalPages - 2) {
      const slicedPage = numberPagesArr.slice(currentPage - 2);
      tempNumberOfPages = [1, ellipsis, ...slicedPage];
    }

    if (currentPage === totalPages) {
      const slicedPage = numberPagesArr.slice(currentPage - 3);
      tempNumberOfPages = [1, ellipsis, ...slicedPage];
    }

    setSlidingWindowPages(tempNumberOfPages);
  }, [currentPage,numberPagesArr.length]);

  return slidingWindowPages;
};

export default usePagination;
