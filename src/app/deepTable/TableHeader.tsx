import { ColumnOrderType, Dictionary, TableColumn } from "./types";
import { sortFunction } from "./utils";
import { useCallback, useState } from "react";

interface ColumnOrderSvgProps {
  colOrder: Dictionary<string>;
  colId: string;
}

export const ColumnOrderSvg = ({ colOrder, colId }: ColumnOrderSvgProps) => {
  if (!(colId in colOrder)) {
    return (
      <svg
        className="w-4 h-4 text-white opacity-60 hover:opacity-100 ml-1"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 320 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
      </svg>
    );
  }
  if (colOrder[colId] === ColumnOrderType.asc) {
    return (
      <svg
        className="w-4 h-4 text-content-yellow ml-1"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 320 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
      </svg>
    );
  }
  return (
    <svg
      className="w-4 h-4 text-content-yellow ml-1"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
    </svg>
  );
};

interface TableHeaderProps {
  columnNames: TableColumn[];
  selectable: boolean;
  isActionRequired: boolean;
  initialState: Dictionary<unknown>[];
  setDisplayedRows: React.Dispatch<React.SetStateAction<Dictionary<unknown>[]>>;
  allSelected?: boolean;
  onSelectAll?: (selected: boolean) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columnNames,
  selectable,
  isActionRequired,
  initialState,
  setDisplayedRows,
  allSelected = false,
  onSelectAll,
}) => {
  const [columnOrder, setColumnOrder] = useState<Dictionary<string>>({});
  const handleColumnOrderClick = useCallback(
    (id: string) => {
      if (!id) return;
      setColumnOrder((prev) => {
        if (!(id in prev)) return { [id]: ColumnOrderType.asc };
        if (prev[id] === ColumnOrderType.asc)
          return { [id]: ColumnOrderType.desc };
        return { [id]: ColumnOrderType.asc };
      });
      const newDisplayedRows = [...initialState];
      const sortRows = sortFunction(columnNames);
      newDisplayedRows.sort((a, b) => sortRows(id, a[id], b[id]));
      if (columnOrder[id] === ColumnOrderType.desc) {
        newDisplayedRows.reverse();
      }
      setDisplayedRows(newDisplayedRows);
    },
    [columnNames, columnOrder, initialState, setDisplayedRows]
  );

  return (
    <thead className="text-sm font-semibold text-white uppercase bg-primary">
      <tr className="items-center w-full">
        {selectable && (
          <th scope="col" className="p-3">
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll?.(e.target.checked)}
                className="w-4 h-4 text-primary bg-white border-primary-light rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
        )}
        {columnNames.map(
          (column, idx) =>
            !column.invisible && (
              <th
                key={`col-${idx}`}
                scope="col"
                id={column.id}
                onClick={() => handleColumnOrderClick(column.id)}
                className={`px-3 py-3 ${
                  !column.notOrder
                    ? "hover:bg-primary-medium cursor-pointer transition-colors duration-200"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center">
                  <span className="uppercase text-sm font-semibold tracking-wider text-white">
                    {column.label}
                  </span>
                  {!column.notOrder && (
                    <ColumnOrderSvg colOrder={columnOrder} colId={column.id} />
                  )}
                </div>
              </th>
            )
        )}
        {isActionRequired && (
          <th
            scope="col"
            className="flex justify-center items-center mt-2 text-white font-semibold"
          >
            Action
          </th>
        )}
      </tr>
    </thead>
  );
};
