"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Dictionary,
  TableColumn,
  TableDataType,
  DeepTableProps,
} from "./types";
import { TableHeader } from "./tableComponents/TableHeader";
import { CurrentPageIndexes, Pagination } from "./Pagination";
import { TableRow } from "./tableComponents/TableRow";
import { SearchFilterAddSection } from "./UpperMenu";
import { areRowsEqual } from "./utils";

export default function DeepTable({
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
  handleAddAction = () => {},
  handleEditAction = () => {},
  handleDeleteAction = () => {},
  handleViewAction = () => {},
  selectedRows = new Set<Dictionary<unknown>>(),
  setSelectedRows = () => {},
}: DeepTableProps) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // Table data state
  const [displayedRows, setDisplayedRows] =
    useState<TableDataType>(initialRowsValues);
  const [filteredAndSearchedRows, setFilteredAndSearchedRows] =
    useState<TableDataType>(initialRowsValues);

  // Pagination state
  const [currentPageIdxs, setCurrentPageIdxs] = useState<CurrentPageIndexes>({
    firstRowIdx: 0,
    lastRowIdx: defaultNbrRowsPerPage - 1,
  });

  // UI state
  const [resetSort, setResetSort] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Update filtered state when initial data changes
  useEffect(() => {
    setFilteredAndSearchedRows(initialRowsValues);
    setDisplayedRows(initialRowsValues);
    // Reset sorting when data changes significantly
    setResetSort((prev) => !prev);
  }, [initialRowsValues]);

  // Reset pagination to first page when displayedRows changes (due to filtering/searching)
  useEffect(() => {
    setCurrentPageIdxs({
      firstRowIdx: 0,
      lastRowIdx: Math.min(defaultNbrRowsPerPage - 1, displayedRows.length - 1),
    });
  }, [displayedRows.length, defaultNbrRowsPerPage]);

  // ============================================================================
  // DATA HANDLERS
  // ============================================================================

  // Callback for when filtering/searching changes
  const handleFilterSearchChange = useCallback(
    (newRows: React.SetStateAction<TableDataType>) => {
      const resolvedRows =
        typeof newRows === "function"
          ? newRows(filteredAndSearchedRows)
          : newRows;
      setFilteredAndSearchedRows(resolvedRows);
      setDisplayedRows(resolvedRows);
    },
    [filteredAndSearchedRows]
  );

  // Callback for when sorting changes
  const handleSortChange = useCallback(
    (sortedRows: React.SetStateAction<TableDataType>) => {
      setDisplayedRows(sortedRows);
    },
    []
  );

  // ============================================================================
  // ROW SELECTION LOGIC
  // ============================================================================

  // Helper function to check if a row is selected
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

  // Helper function to remove a row from selection
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

  // Handle individual row selection
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

  // Handle select all functionality
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

  // Handle unselect all functionality
  const handleUnselectAll = useCallback(() => {
    setSelectedRows(new Set());
  }, [setSelectedRows]);

  // Computed value for whether all visible rows are selected
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
  // ============================================================================
  // TABLE ACTION HANDLERS
  // ============================================================================

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
    [handleAddAction, setError, setIsLoading]
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
    [handleEditAction, setError, setIsLoading]
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
    [handleDeleteAction, setError, setIsLoading]
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
    [handleViewAction, setError, setIsLoading]
  );
  // End of TABLE ACTION HANDLERS
  // ============================================================================

  // ============================================================================
  // ERROR HANDLING & RENDERING
  // ============================================================================

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

  // ============================================================================
  // COMPUTED VALUES FOR CURRENT PAGE
  // ============================================================================

  const currentPageRows = displayPagination
    ? displayedRows.slice(
        currentPageIdxs.firstRowIdx,
        currentPageIdxs.lastRowIdx + 1
      )
    : displayedRows;

  const isActionRequired =
    displayEditAction || displayDeleteAction || displayViewAction;

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="w-full bg-zinc-100 p-4 rounded-lg shadow-sm relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-secondary-100 opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      )}

      <div className={isLoading ? "opacity-50" : ""}>
        {/* Upper Menu Section */}
        <SearchFilterAddSection
          columnNames={columnNames}
          initialState={initialRowsValues}
          setDisplayedRows={handleFilterSearchChange}
          initialRowsValues={initialRowsValues}
          displayAddButton={displayAddButton}
          handleAddAction={tableAddAction}
          selectedRowsCount={selectedRows.size}
          onUnselectAll={handleUnselectAll}
        />

        {/* Table Section */}
        <div className="w-full overflow-x-auto border border-secondary-200 rounded-lg shadow-sm">
          <table className="w-full border-collapse bg-white">
            <TableHeader
              columnNames={columnNames}
              selectable={selectable}
              isActionRequired={isActionRequired}
              initialState={filteredAndSearchedRows}
              setDisplayedRows={handleSortChange}
              allSelected={allSelected}
              onSelectAll={handleSelectAll}
              resetSort={resetSort}
            />
            <tbody>
              {currentPageRows.map((row, index) => (
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

        {/* Pagination Section */}
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
}
