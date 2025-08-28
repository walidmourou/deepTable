import { useState } from "react";

export interface CurrentPageIndexes {
  firstRowIdx: number;
  lastRowIdx: number;
}

interface PaginationProps {
  displayedRowsCount: number;
  defaultNbrRowsPerPage: number;
  currentPageIdxs: CurrentPageIndexes;
  setCurrentPageIdxs: React.Dispatch<React.SetStateAction<CurrentPageIndexes>>;
}

const getPaginationRange = (
  nbrTotalRows: number,
  NbrRowsPerPage: number,
  currentPage: number
) => {
  const totalPages = Math.ceil(nbrTotalRows / NbrRowsPerPage);
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Calculate the start and end of the visible range
  let start = currentPage - 2;
  let end = currentPage + 2;

  // Adjust for left boundary
  if (start < 1) {
    start = 1;
    end = Math.min(maxVisiblePages, totalPages);
  }

  // Adjust for right boundary
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const Pagination: React.FC<PaginationProps> = ({
  displayedRowsCount,
  defaultNbrRowsPerPage,
  currentPageIdxs,
  setCurrentPageIdxs,
}) => {
  const [pageId, setPageId] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultNbrRowsPerPage);
  const [paginationRange, setPaginationRange] = useState<number[]>(
    getPaginationRange(displayedRowsCount, rowsPerPage, 1)
  );

  const handlePageChange = (newPage: number) => {
    setPageId(newPage);
    setCurrentPageIdxs({
      firstRowIdx: (newPage - 1) * rowsPerPage,
      lastRowIdx: Math.min(newPage * rowsPerPage - 1, displayedRowsCount - 1),
    });
    setPaginationRange(
      getPaginationRange(displayedRowsCount, rowsPerPage, newPage)
    );
  };
  const handleRowsPerPageChange = (newRowsPerPage: string) => {
    setRowsPerPage(parseInt(newRowsPerPage));
    setPageId(1);
    setCurrentPageIdxs({
      firstRowIdx: 0,
      lastRowIdx: Math.min(
        parseInt(newRowsPerPage) - 1,
        displayedRowsCount - 1
      ),
    });
    setPaginationRange(
      getPaginationRange(displayedRowsCount, parseInt(newRowsPerPage), 1)
    );
  };
  return (
    <nav
      className="flex items-center justify-between pt-4 mx-2"
      aria-label="Table navigation"
    >
      <div className="flex items-center space-x-4">
        <select
          aria-label="Rows per page"
          className="p-2 text-sm text-secondary-400 border border-secondary-300 rounded-lg bg-white focus:ring-primary focus:border-primary transition-colors duration-200"
          onChange={(e) => handleRowsPerPageChange(e.target.value)}
          value={rowsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
        <span className="text-sm font-normal text-secondary-400">
          Showing{" "}
          <span className="font-semibold text-primary-dark">
            {currentPageIdxs.firstRowIdx + 1}-{currentPageIdxs.lastRowIdx + 1}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-primary-dark">
            {displayedRowsCount}
          </span>
        </span>
      </div>
      <ul className="inline-flex -space-x-px text-sm h-8">
        {/* First page */}
        <li>
          <button
            type="button"
            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight border border-secondary-300 rounded-l-lg transition-colors duration-200 ${
              pageId === 1
                ? "text-secondary-300 bg-secondary-100 cursor-not-allowed"
                : "text-secondary-400 bg-white hover:bg-secondary-100 hover:text-primary"
            }`}
            onClick={() => handlePageChange(1)}
            disabled={pageId === 1}
          >
            {"<<"}
          </button>
        </li>
        {/* Previous page */}
        <li>
          <button
            type="button"
            className={`flex items-center justify-center px-3 h-8 leading-tight border border-secondary-300 transition-colors duration-200 ${
              pageId === 1
                ? "text-secondary-300 bg-secondary-100 cursor-not-allowed"
                : "text-secondary-400 bg-white hover:bg-secondary-100 hover:text-primary"
            }`}
            onClick={() => handlePageChange(pageId - 1)}
            disabled={pageId === 1}
          >
            {"<"}
          </button>
        </li>
        {/* Page numbers */}
        {paginationRange.map((pageNum: number) => (
          <li key={`page-${pageNum}`}>
            <button
              type="button"
              className={`flex items-center justify-center px-3 h-8 border-secondary-300 transition-colors duration-200 ${
                pageNum === pageId
                  ? "text-white border bg-primary hover:bg-primary-medium"
                  : "text-secondary-400 border bg-white hover:bg-secondary-100 hover:text-primary"
              }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          </li>
        ))}
        {/* Next page */}
        <li>
          <button
            type="button"
            className={`flex items-center justify-center px-3 h-8 leading-tight border border-secondary-300 transition-colors duration-200 ${
              pageId === paginationRange[paginationRange.length - 1]
                ? "text-secondary-300 bg-secondary-100 cursor-not-allowed"
                : "text-secondary-400 bg-white hover:bg-secondary-100 hover:text-primary"
            }`}
            onClick={() => handlePageChange(pageId + 1)}
            disabled={pageId === paginationRange[paginationRange.length - 1]}
          >
            {">"}
          </button>
        </li>
        {/* Last page */}
        <li>
          <button
            type="button"
            className={`flex items-center justify-center px-3 h-8 leading-tight border border-secondary-300 rounded-r-lg transition-colors duration-200 ${
              pageId === paginationRange[paginationRange.length - 1]
                ? "text-secondary-300 bg-secondary-100 cursor-not-allowed"
                : "text-secondary-400 bg-white hover:bg-secondary-100 hover:text-primary"
            }`}
            onClick={() =>
              handlePageChange(paginationRange[paginationRange.length - 1])
            }
            disabled={pageId === paginationRange[paginationRange.length - 1]}
          >
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};
