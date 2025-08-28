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
  },
  {
    id: "hight",
    label: "Hight",
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
    id: "appearance_date",
    label: "Appearance Date",
    align: CellTextAlign.center,
    type: ColumnType.date,
  },
  {
    id: "is_dangerous",
    label: "Is Dangerous",
    align: CellTextAlign.center,
    type: ColumnType.boolean,
    // canFilter: true,
  },
];
