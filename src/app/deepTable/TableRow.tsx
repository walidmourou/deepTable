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
  onSelectChange?: (rowId: number, selected: boolean) => void;
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
      const booleanValue = value === true || value === "1" || value === "true";
      return (
        <input
          title="Boolean Value"
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
              onChange={(e) => onSelectChange?.(rid, e.target.checked)}
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
        <td
          className={`flex items-center justify-center mt-2 space-x-2 ${
            isDenseTable ? "px-3 py-2" : "px-6 py-4"
          }`}
        >
          {displayEditAction && (
            <button
              type="button"
              onClick={() => handleEditAction(row, columnNames)}
              className="text-content-orange border border-content-orange hover:bg-content-orange hover:text-white focus:ring-4 focus:outline-none focus:ring-content-orange/30 font-medium rounded-lg text-xs px-3 py-1.5 text-center transition-colors duration-200"
            >
              Edit
            </button>
          )}
          {displayDeleteAction && (
            <button
              type="button"
              onClick={() => handleDeleteAction(row)}
              className="text-content-red border border-content-red hover:bg-content-red hover:text-white focus:ring-4 focus:outline-none focus:ring-content-red/30 font-medium rounded-lg text-xs px-3 py-1.5 text-center transition-colors duration-200"
            >
              Delete
            </button>
          )}
          {displayViewAction && (
            <button
              type="button"
              onClick={() => handleViewAction(row)}
              className="text-primary border border-primary hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-lg text-xs px-3 py-1.5 text-center transition-colors duration-200"
            >
              View
            </button>
          )}
        </td>
      )}
    </tr>
  );
};
