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
  const [displayedRows, setDisplayedRows] =
    useState<TableDataType>(initialRowsValues);
  const [currentPageIdxs, setCurrentPageIdxs] = useState<CurrentPageIndexes>({
    firstRowIdx: 0,
    lastRowIdx: defaultNbrRowsPerPage - 1,
  });
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
      <div className="p-4 text-red-500 border border-red-300 rounded">
        <h3 className="font-bold">Error in DeepTable:</h3>
        <p>{error.message}</p>
        <button
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
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
        <div>
          <table>
            {displayHeader && (
              <TableHeader
                columnNames={columnNames}
                selectable={selectable}
                isActionRequired={
                  displayEditAction || displayDeleteAction || displayViewAction
                }
                initialState={initialRowsValues}
                setDisplayedRows={setDisplayedRows}
              />
            )}
            <tbody>
              {displayedRows.slice().map((row, index) => (
                <TableRow
                  key={index}
                  row={row}
                  rid={index}
                  columnNames={columnNames}
                  isDenseTable={isDenseTable}
                  displayEditAction={displayEditAction}
                  displayDeleteAction={displayDeleteAction}
                  displayViewAction={displayViewAction}
                  selectable={selectable}
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
