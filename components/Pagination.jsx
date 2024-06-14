import { classnames } from '../lib';

const MAX_PAGE_NUMBER_BUTTONS = 5;

const Pagination = ({ totalPages, currentPage, onPageChange, wingSize = 1 }) => {
  if (totalPages <= 1) {
    return null;
  }

  if (currentPage < 1) {
    onPageChange(1);
  }
  if (currentPage > totalPages) {
    onPageChange(totalPages);
  }

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  };

  const paginationItems = () => {
    const pages = [];

    if (totalPages <= MAX_PAGE_NUMBER_BUTTONS + 1) {
      // If the total number of pages is less than our max limit, show all pages
      return range(1, totalPages);
    }

    // Always include the first page
    pages.push(1);

    // Determine the range of page numbers to show in the middle
    let startMiddle = Math.max(currentPage - wingSize, 2);
    let endMiddle = Math.min(currentPage + wingSize, totalPages - 1);

    // Adjust the range if we're too close to the start or end
    if (currentPage - 1 <= wingSize) {
      endMiddle = startMiddle + MAX_PAGE_NUMBER_BUTTONS - 3;
    }
    if (totalPages - currentPage <= wingSize) {
      startMiddle = endMiddle - MAX_PAGE_NUMBER_BUTTONS + 3;
    }

    // Include ellipsis if there's a gap between first page and middle pages
    if (startMiddle > 2) {
      pages.push('...');
    }

    // Middle pages
    for (let i = startMiddle; i <= endMiddle; i++) {
      pages.push(i);
    }

    // Include ellipsis if there's a gap between middle pages and last page
    if (endMiddle < totalPages - 1) {
      pages.push('...');
    }

    // Always include the last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="my-4 sm:my-8 flex items-center justify-center space-x-2">
      {currentPage !== 1 && (
        <PaginationButton
          label={<i className="fa-solid fa-angle-left"></i>}
          onClick={() => onPageChange(currentPage - 1)}
        />
      )}
      {paginationItems().map((number, index) =>
        number === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="border-gray-300 text-gray-300 flex h-8 w-8 items-end justify-center rounded-xl border bg-white pb-0.5 text-base font-normal"
          >
            <i className="fa-solid fa-ellipsis"></i>
          </span>
        ) : (
          <PaginationButton
            key={`page-${number}`}
            label={number}
            isCurrent={currentPage === number}
            onClick={() => onPageChange(number)}
          />
        )
      )}
      {currentPage !== totalPages && (
        <PaginationButton
          label={<i className="fa-solid fa-angle-right"></i>}
          onClick={() => onPageChange(currentPage + 1)}
        />
      )}
    </div>
  );
};

const PaginationButton = ({ label, onClick, isCurrent, className }) => (
  <button
    onClick={onClick}
    className={classnames(
      'border-dark flex h-8 w-8 items-center justify-center rounded-xl border',
      isCurrent
        ? 'bg-dark hover:bg-dark text-white hover:text-white'
        : 'text-dark hover:bg-dark focus:ring-dark bg-white transition-colors duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white',
      className
    )}
  >
    {label}
  </button>
);

export default Pagination;
