"use client";

import React, { useState, useCallback } from "react";
import {
  Dictionary,
  TableColumn,
  TableDataType,
  DeepTableProps,
} from "./types";
import { TableHeader } from "./TableHeader";
import { CurrentPageIndexes, Pagination } from "./Pagination";
import { TableRow } from "./TableRow";
import { SearchFilterAddSection } from "./UpperMenu";

const DeepTable: React.FC<DeepTableProps> = ({
  columnNames = [],
  initialRowsValues = [],
  defaultNbrRowsPerPage = 10,
  displayHeader = true,
  displayPagination = true,
  selectable = false,
  isDenseTable = true,
  displayEditAction = false,
  displayDeleteAction = false,
  displayAddButton = false,
  displayViewAction = false,
  handleAddAction = null,
  handleEditAction = null,
  handleDeleteAction = null,
  handleViewAction = null,
}) => {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // TODO: implement the necessary logic to handle rows selection
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const [displayedRows, setDisplayedRows] =
    useState<TableDataType>(initialRowsValues);
  const [currentPageIdxs, setCurrentPageIdxs] = useState<CurrentPageIndexes>({
    firstRowIdx: 0,
    lastRowIdx: defaultNbrRowsPerPage - 1,
  });
  // Row selection state
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleRowSelection = useCallback((rowId: number, selected: boolean) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(rowId);
      } else {
        newSet.delete(rowId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        // Select only the rows visible on the current page
        const currentPageRowIndices = Array.from(
          {
            length:
              currentPageIdxs.lastRowIdx - currentPageIdxs.firstRowIdx + 1,
          },
          (_, i) => currentPageIdxs.firstRowIdx + i
        ).filter((index) => index < displayedRows.length);

        setSelectedRows((prev) => {
          const newSet = new Set(prev);
          currentPageRowIndices.forEach((index) => newSet.add(index));
          return newSet;
        });
      } else {
        // Deselect only the rows visible on the current page
        const currentPageRowIndices = Array.from(
          {
            length:
              currentPageIdxs.lastRowIdx - currentPageIdxs.firstRowIdx + 1,
          },
          (_, i) => currentPageIdxs.firstRowIdx + i
        ).filter((index) => index < displayedRows.length);

        setSelectedRows((prev) => {
          const newSet = new Set(prev);
          currentPageRowIndices.forEach((index) => newSet.delete(index));
          return newSet;
        });
      }
    },
    [displayedRows, currentPageIdxs]
  );

  const allSelected = (() => {
    const currentPageRowIndices = Array.from(
      {
        length: Math.min(
          currentPageIdxs.lastRowIdx - currentPageIdxs.firstRowIdx + 1,
          displayedRows.length - currentPageIdxs.firstRowIdx
        ),
      },
      (_, i) => currentPageIdxs.firstRowIdx + i
    ).filter((index) => index < displayedRows.length);

    return (
      currentPageRowIndices.length > 0 &&
      currentPageRowIndices.every((index) => selectedRows.has(index))
    );
  })();
  // ###############################################################################
  // Table action handlers
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const tableAddAction = useCallback(
    async (cols: TableColumn[]) => {
      try {
        setIsLoading(true);
        if (handleAddAction) {
          await handleAddAction(cols);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleAddAction]
  );

  const tableEditAction = useCallback(
    async (row: Dictionary<unknown>, cols: TableColumn[]) => {
      try {
        setIsLoading(true);
        if (handleEditAction) {
          await handleEditAction(row, cols);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleEditAction]
  );

  const tableDeleteAction = useCallback(
    async (row: Dictionary<unknown>) => {
      try {
        setIsLoading(true);
        if (handleDeleteAction) {
          await handleDeleteAction(row);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleDeleteAction]
  );

  const tableViewAction = useCallback(
    async (row: Dictionary<unknown>) => {
      try {
        setIsLoading(true);
        if (handleViewAction) {
          await handleViewAction(row);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleViewAction]
  );
  // End of Table action handlers
  // ###############################################################################

  // Error boundary render
  if (error) {
    return (
      <div className="p-4 text-content-red border border-content-red rounded-lg bg-red-50">
        <h3 className="font-bold text-content-red">Error in DeepTable:</h3>
        <p className="text-content-red">{error.message}</p>
        <button
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-content-red text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {isLoading && (
        <div className="absolute inset-0 bg-secondary-100 opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      )}
      <div className={isLoading ? "opacity-50" : ""}>
        <SearchFilterAddSection
          columnNames={columnNames}
          initialState={initialRowsValues}
          setDisplayedRows={setDisplayedRows}
          initialRowsValues={initialRowsValues}
          displayAddButton={displayAddButton}
          handleAddAction={tableAddAction}
        />
        <div className="w-full overflow-x-auto border border-secondary-200 rounded-lg shadow-sm">
          <table className="w-full border-collapse bg-white">
            {displayHeader && (
              <TableHeader
                columnNames={columnNames}
                selectable={selectable}
                isActionRequired={
                  displayEditAction || displayDeleteAction || displayViewAction
                }
                initialState={initialRowsValues}
                setDisplayedRows={setDisplayedRows}
                allSelected={allSelected}
                onSelectAll={handleSelectAll}
              />
            )}
            <tbody>
              {displayedRows
                .slice(
                  currentPageIdxs.firstRowIdx,
                  currentPageIdxs.lastRowIdx + 1
                )
                .map((row, index) => (
                  <TableRow
                    key={currentPageIdxs.firstRowIdx + index}
                    row={row}
                    rid={currentPageIdxs.firstRowIdx + index}
                    columnNames={columnNames}
                    isDenseTable={isDenseTable}
                    displayEditAction={displayEditAction}
                    displayDeleteAction={displayDeleteAction}
                    displayViewAction={displayViewAction}
                    selectable={selectable}
                    isSelected={selectedRows.has(
                      currentPageIdxs.firstRowIdx + index
                    )}
                    onSelectChange={handleRowSelection}
                    handleEditAction={tableEditAction}
                    handleDeleteAction={tableDeleteAction}
                    handleViewAction={tableViewAction}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {displayPagination && (
          <Pagination
            displayedRowsCount={displayedRows.length}
            defaultNbrRowsPerPage={defaultNbrRowsPerPage}
            currentPageIdxs={currentPageIdxs}
            setCurrentPageIdxs={setCurrentPageIdxs}
          />
        )}
      </div>
    </div>
  );
};

export default DeepTable;
