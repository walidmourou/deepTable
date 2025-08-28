//Types, interfaces and Enums

import { ColumnType, TableColumn } from "./types";

export const columnTypeToJsType = (typ: ColumnType) => {
  switch (typ) {
    case ColumnType.boolean:
      return "boolean";
    case ColumnType.integer:
    case ColumnType.timestamp_s:
    case ColumnType.timestamp_ms:
    case ColumnType.float:
      return "number";
    case ColumnType.string:
    case ColumnType.date:
    case ColumnType.guid:
      return "string";
    case ColumnType.stringArray:
      return "string[]";
    default:
      return null;
  }
};

// Sort function
export const sortFunction = (columnNames: TableColumn[]) => {
  return (colId: string, a: unknown, b: unknown): number => {
    try {
      const column = columnNames.find((col) => col.id === colId);
      if (!column) return 0;

      if (column.type === ColumnType.string) {
        return (a || "").toString().localeCompare((b || "").toString());
      }
      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }
      return 0;
    } catch (err) {
      console.error("Error in sort function:", err);
      return 0;
    }
  };
};
