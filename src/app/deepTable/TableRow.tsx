import React from "react";
import { ColumnType, Dictionary, TableColumn } from "./types";

interface TableRowProps {
  row: Dictionary<unknown>;
  rid: number;
  columnNames: TableColumn[];
  isDenseTable: boolean;
  displayEditAction: boolean;
  displayDeleteAction: boolean;
  displayViewAction: boolean;
  selectable: boolean;
  isSelected?: boolean;
  onSelectChange?: (row: Dictionary<unknown>, selected: boolean) => void;
  handleEditAction: (_row: Dictionary<unknown>, _cols: TableColumn[]) => void;
  handleDeleteAction: (_row: Dictionary<unknown>) => void;
  handleViewAction: (_row: Dictionary<unknown>) => void;
}

const convertEpochToTime = (epoch: number): string => {
  const date = new Date(epoch);
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

const renderCellContent = (value: unknown, type: ColumnType) => {
  switch (type) {
    case ColumnType.boolean:
      if (value === null || value === undefined) {
        return (
          <span
            title="No value"
            className="inline-block w-4 h-4 text-secondary-400 text-center"
          >
            —
          </span>
        );
      }
      const booleanValue =
        value === true || value === "true" || value === 1 || value === "1";
      return (
        <input
          title={booleanValue.toString()}
          disabled
          checked={booleanValue}
          type="checkbox"
          className="w-4 h-4 text-primary bg-white border-secondary-300 rounded focus:ring-primary"
          readOnly
        />
      );

    case ColumnType.stringArray:
      if (!value) return null;
      const arrayValue = value as string[];
      return (
        <button className="relative group z-50 cursor-pointer">
          {arrayValue.length < 2 ? (
            <p>{arrayValue[0]}</p>
          ) : (
            <div>
              <p className="block group-focus:hidden underline underline-offset-4">
                {arrayValue[0]}
              </p>
              <div className="flex justify-center">
                <div className="text-left">
                  {arrayValue.map((val: string, key: number) => (
                    <p className="hidden group-focus:block" key={key + val}>
                      - {val}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </button>
      );

    case ColumnType.date:
      return <p>{convertEpochToTime(value as number)}</p>;

    default:
      return value?.toString();
  }
};

export const TableRow: React.FC<TableRowProps> = ({
  row,
  rid,
  columnNames,
  isDenseTable,
  displayEditAction,
  displayDeleteAction,
  displayViewAction,
  selectable,
  isSelected = false,
  onSelectChange,
  handleEditAction,
  handleDeleteAction,
  handleViewAction,
}) => {
  return (
    <tr
      key={`row-${rid}`}
      className={`w-full border-b border-secondary-200 transition-colors duration-150 ${
        isSelected
          ? "bg-primary-light text-primary-dark"
          : "bg-white hover:bg-secondary-100"
      }`}
    >
      {selectable && (
        <td className="w-4 p-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelectChange?.(row, e.target.checked)}
              className="w-4 h-4 text-primary bg-white border-secondary-300 rounded focus:ring-primary focus:ring-2"
            />
          </div>
        </td>
      )}
      {columnNames.map(
        (col) =>
          !col.invisible && (
            <td
              key={`${rid}-${col.id}`}
              className={`${isDenseTable ? "px-3 py-2" : "px-6 py-4"} ${
                col.highlight
                  ? "font-semibold text-primary-dark"
                  : "text-secondary-400"
              } ${col.align || "text-center"}`}
            >
              {renderCellContent(row[col.id], col.type)}
            </td>
          )
      )}
      {(displayEditAction || displayDeleteAction || displayViewAction) && (
        <td className={`${isDenseTable ? "px-2 py-2" : "px-4 py-3"}`}>
          <div className="flex items-center justify-center space-x-1">
            {displayEditAction && (
              <button
                type="button"
                onClick={() => handleEditAction(row, columnNames)}
                title="Edit"
                className="group relative w-7 h-7 flex items-center justify-center rounded-md text-content-orange border border-transparent hover:ring-2 hover:ring-content-orange/50 focus:ring-2 focus:outline-none focus:ring-content-orange/40 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}
            {displayDeleteAction && (
              <button
                type="button"
                onClick={() => handleDeleteAction(row)}
                title="Delete"
                className="group relative w-7 h-7 flex items-center justify-center rounded-md text-content-red border border-transparent hover:ring-2 hover:ring-content-red/50 focus:ring-2 focus:outline-none focus:ring-content-red/40 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
            {displayViewAction && (
              <button
                type="button"
                onClick={() => handleViewAction(row)}
                title="View"
                className="group relative w-7 h-7 flex items-center justify-center rounded-md text-primary border border-transparent hover:ring-2 hover:ring-primary/50 focus:ring-2 focus:outline-none focus:ring-primary/40 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};
