"use client";

import React, { useState, useCallback, useEffect } from "react";
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
import { areRowsEqual } from "./utils";

const DeepTable: React.FC<DeepTableProps> = ({
  columnNames = [],
  initialRowsValues = [],
  defaultNbrRowsPerPage = 10,
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
  selectedRows = new Set<Dictionary<unknown>>(),
  setSelectedRows = () => {},
}) => {
  const [displayedRows, setDisplayedRows] =
    useState<TableDataType>(initialRowsValues);
  const [currentPageIdxs, setCurrentPageIdxs] = useState<CurrentPageIndexes>({
    firstRowIdx: 0,
    lastRowIdx: defaultNbrRowsPerPage - 1,
  });

  // Reset pagination to first page when displayedRows changes (due to filtering/searching)
  useEffect(() => {
    setCurrentPageIdxs({
      firstRowIdx: 0,
      lastRowIdx: Math.min(defaultNbrRowsPerPage - 1, displayedRows.length - 1),
    });
  }, [displayedRows.length, defaultNbrRowsPerPage]);

  // Helper functions for row selection
  const isRowSelected = useCallback(
    (row: Dictionary<unknown>): boolean => {
      for (const selectedRow of selectedRows) {
        if (areRowsEqual(selectedRow, row)) {
          return true;
        }
      }
      return false;
    },
    [selectedRows]
  );

  const removeRowFromSelection = useCallback(
    (
      rowToRemove: Dictionary<unknown>,
      selectedSet: Set<Dictionary<unknown>>
    ): void => {
      for (const selectedRow of selectedSet) {
        if (areRowsEqual(selectedRow, rowToRemove)) {
          selectedSet.delete(selectedRow);
          break;
        }
      }
    },
    []
  );

  const handleRowSelection = useCallback(
    (row: Dictionary<unknown>, selected: boolean) => {
      setSelectedRows((prev) => {
        const newSet = new Set(prev);
        if (selected) {
          newSet.add(row);
        } else {
          removeRowFromSelection(row, newSet);
        }
        return newSet;
      });
    },
    [setSelectedRows, removeRowFromSelection]
  );

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        // Select rows visible on current page or all rows if pagination is disabled
        const rowsToSelect = displayPagination
          ? displayedRows.slice(
              currentPageIdxs.firstRowIdx,
              currentPageIdxs.lastRowIdx + 1
            )
          : displayedRows;

        setSelectedRows((prev) => {
          const newSet = new Set(prev);
          rowsToSelect.forEach((row) => newSet.add(row));
          return newSet;
        });
      } else {
        // Deselect rows visible on current page or all rows if pagination is disabled
        const rowsToDeselect = displayPagination
          ? displayedRows.slice(
              currentPageIdxs.firstRowIdx,
              currentPageIdxs.lastRowIdx + 1
            )
          : displayedRows;

        setSelectedRows((prev) => {
          const newSet = new Set(prev);
          rowsToDeselect.forEach((row) => {
            removeRowFromSelection(row, newSet);
          });
          return newSet;
        });
      }
    },
    [
      displayedRows,
      currentPageIdxs,
      setSelectedRows,
      removeRowFromSelection,
      displayPagination,
    ]
  );

  const allSelected = (() => {
    const rowsToCheck = displayPagination
      ? displayedRows.slice(
          currentPageIdxs.firstRowIdx,
          currentPageIdxs.lastRowIdx + 1
        )
      : displayedRows;

    return (
      rowsToCheck.length > 0 && rowsToCheck.every((row) => isRowSelected(row))
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

  const handleUnselectAll = useCallback(() => {
    setSelectedRows(new Set());
  }, [setSelectedRows]);

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
    <div className="w-full bg-zinc-100 p-4 rounded-lg shadow-sm relative">
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
          selectedRowsCount={selectedRows.size}
          onUnselectAll={handleUnselectAll}
        />
        <div className="w-full overflow-x-auto border border-secondary-200 rounded-lg shadow-sm">
          <table className="w-full border-collapse bg-white">
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
            <tbody>
              {(displayPagination
                ? displayedRows.slice(
                    currentPageIdxs.firstRowIdx,
                    currentPageIdxs.lastRowIdx + 1
                  )
                : displayedRows
              ).map((row, index) => (
                <TableRow
                  key={
                    displayPagination
                      ? currentPageIdxs.firstRowIdx + index
                      : index
                  }
                  row={row}
                  rid={
                    displayPagination
                      ? currentPageIdxs.firstRowIdx + index
                      : index
                  }
                  columnNames={columnNames}
                  isDenseTable={isDenseTable}
                  displayEditAction={displayEditAction}
                  displayDeleteAction={displayDeleteAction}
                  displayViewAction={displayViewAction}
                  selectable={selectable}
                  isSelected={isRowSelected(row)}
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
