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
        className="w-4 h-4 text-gray-400 opacity-30 hover:opacity-100"
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
        className="w-4 h-4 text-orange-500"
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
      className="w-4 h-4 text-orange-500"
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
  initialState: Dictionary<any>[];
  setDisplayedRows: React.Dispatch<React.SetStateAction<Dictionary<any>[]>>;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columnNames,
  selectable,
  isActionRequired,
  initialState,
  setDisplayedRows,
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
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr className="items-center w-full">
        {selectable && (
          <th scope="col" className="p-2">
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
                className={`px-2 py-2 ${
                  !column.notOrder
                    ? "hover:bg-orange-100 dark:hover:bg-slate-50 cursor-pointer"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center">
                  <span className="uppercase text-xs font-medium tracking-wider">
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
          <th scope="col" className="flex justify-center items-center mt-2">
            Action
          </th>
        )}
      </tr>
    </thead>
  );
};
