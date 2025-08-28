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
      if (value === true || value === "1" || value === "true") {
        return (
          <input
            title="Boolean Value"
            disabled
            checked
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        );
      }
      if (value === false || value === "0" || value === "false") {
        return (
          <input
            title="Boolean Value"
            disabled
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        );
      }
      return "undefined";

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
  handleEditAction,
  handleDeleteAction,
  handleViewAction,
}) => {
  return (
    <tr
      key={`row-${rid}`}
      className="w-full bg-white border-b hover:bg-gray-50"
    >
      {selectable && (
        <td className="w-4 p-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
          </div>
        </td>
      )}
      {columnNames.map(
        (col) =>
          !col.invisible && (
            <td
              key={`${rid}-${col.id}`}
              className={`${isDenseTable ? "px-3 py-1" : "px-6 py-4"} ${
                col.highlight
                  ? "font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  : ""
              } ${col.align || "text-center"}`}
            >
              {renderCellContent(row[col.id], col.type)}
            </td>
          )
      )}
      {(displayEditAction || displayDeleteAction || displayViewAction) && (
        <td
          className={`flex items-center justify-center mt-2 space-x-1 ${
            isDenseTable ? "px-3 py-1" : "px-6 py-4"
          }`}
        >
          {displayEditAction && (
            <button
              type="button"
              onClick={() => handleEditAction(row, columnNames)}
              className="text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
            >
              Edit
            </button>
          )}
          {displayDeleteAction && (
            <button
              type="button"
              onClick={() => handleDeleteAction(row)}
              className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
            >
              Delete
            </button>
          )}
          {displayViewAction && (
            <button
              type="button"
              onClick={() => handleViewAction(row)}
              className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2"
            >
              View
            </button>
          )}
        </td>
      )}
    </tr>
  );
};
