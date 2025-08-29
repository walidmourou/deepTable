import { CellTextAlign, ColumnType, TableColumn } from "../deepTable/types";

export const dogRacesTableHeader: TableColumn[] = [
  {
    id: "id",
    label: "ID",
    align: CellTextAlign.left,
    type: ColumnType.string,
    highlight: true,
    isKey: true,
    isMandatory: true,
  },
  {
    id: "name",
    label: "Name",
    align: CellTextAlign.left,
    type: ColumnType.string,
    canSearch: true,
  },
  {
    id: "country",
    label: "Country",
    align: CellTextAlign.left,
    type: ColumnType.string,
    canFilter: true,
  },
  {
    id: "max_age",
    label: "Max Age",
    align: CellTextAlign.right,
    type: ColumnType.integer,
    canFilter: true,
  },
  {
    id: "hight",
    label: "Height",
    align: CellTextAlign.right,
    type: ColumnType.float,
  },
  {
    id: "width",
    label: "Width",
    align: CellTextAlign.right,
    type: ColumnType.float,
  },
  {
    id: "is_dangerous",
    label: "Is Dangerous",
    align: CellTextAlign.center,
    type: ColumnType.boolean,
    canFilter: true,
  },
  {
    id: "registration_timestamp_s",
    label: "Registration (s)",
    align: CellTextAlign.center,
    type: ColumnType.timestamp_s,
  },
  {
    id: "last_checkup_timestamp_ms",
    label: "Last Checkup (ms)",
    align: CellTextAlign.center,
    type: ColumnType.timestamp_ms,
  },
  {
    id: "birth_date",
    label: "Birth Date",
    align: CellTextAlign.center,
    type: ColumnType.date,
  },
  {
    id: "characteristics",
    label: "Characteristics",
    align: CellTextAlign.left,
    type: ColumnType.variant,
  },
];
