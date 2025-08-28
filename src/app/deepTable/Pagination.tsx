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

const getPaginationRange = (nbrTotalRows: number, NbrRowsPerPage: number) => {
  const totalPages = Math.ceil(nbrTotalRows / NbrRowsPerPage);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
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
    getPaginationRange(displayedRowsCount, rowsPerPage)
  );

  const handlePageChange = (newPage: number) => {
    setPageId(newPage);
    setCurrentPageIdxs({
      firstRowIdx: (newPage - 1) * rowsPerPage + 1,
      lastRowIdx: Math.min(newPage * rowsPerPage, displayedRowsCount - 1),
    });
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
      getPaginationRange(displayedRowsCount, parseInt(newRowsPerPage))
    );
  };
  return (
    <nav
      className="flex items-center justify-between pt-4 mx-2"
      aria-label="Table navigation"
    >
      <div>
        <select
          aria-label="Rows per page"
          className="p-2 mb-1 mr-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => handleRowsPerPageChange(e.target.value)}
          value={rowsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPageIdxs.firstRowIdx}-{currentPageIdxs.lastRowIdx}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {displayedRowsCount}
          </span>
        </span>
      </div>
      <ul className="inline-flex -space-x-px text-sm h-8">
        {/* First page */}
        <li>
          <button
            type="button"
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setPageId(1)}
            disabled={pageId === 1}
          >
            {"<<"}
          </button>
        </li>
        {/* Previous page */}
        <li>
          <button
            type="button"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setPageId((prev) => prev - 1)}
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
              className={`flex items-center justify-center px-3 h-8 border-gray-300 ${
                pageNum === pageId
                  ? "text-blue-600 border bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  : "text-gray-500 border bg-white hover:bg-gray-100 hover:text-gray-700"
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
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setPageId((prev) => prev + 1)}
            disabled={pageId === paginationRange[-1]}
          >
            {">"}
          </button>
        </li>
        {/* Last page */}
        <li>
          <button
            type="button"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setPageId(paginationRange[-1])}
            disabled={pageId === paginationRange[-1]}
          >
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};
