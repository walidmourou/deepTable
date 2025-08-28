import { useEffect, useState } from "react";
import { ColumnType, Dictionary, Filter, TableColumn } from "./types";

interface SearchFieldProps {
  colId: string;
  value: string;
  label: string;
  onChange: (_value: string) => void;
}

interface FilterSelectProps {
  colId: string;
  column: TableColumn;
  value: string | number | boolean;
  options: unknown[];
  onChange: (_value: string | number | boolean) => void;
}

function onlyUnique(
  _value: unknown,
  index: number,
  array: Array<unknown>
): boolean {
  return array.indexOf(_value) === index;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  colId,
  value,
  label,
  onChange,
}) => (
  <div className="mx-1">
    <label htmlFor={`search-${colId}`} className="sr-only">
      Search {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        id={`search-${colId}`}
        className="block p-2 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

export const FilterSelect: React.FC<FilterSelectProps> = ({
  colId,
  column,
  value,
  options,
  onChange,
}) => (
  <select
    key={`filter-${colId}`}
    aria-label={column.label}
    className={`filterType${column.type} m-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1`}
    onChange={(e) => {
      onChange(
        column.type === ColumnType.integer
          ? Number(e.target.value)
          : e.target.value
      );
    }}
    value={value.toString()}
  >
    <option value="" className="font-bold">
      {column.label}
    </option>
    {options.map((v) => (
      <option key={String(v)} value={v as string | number}>
        {String(v)}
      </option>
    ))}
  </select>
);

interface SearchFilterAddSectionProps {
  columnNames: TableColumn[];
  initialState: Dictionary<any>[];
  initialRowsValues: Dictionary<any>[];
  setDisplayedRows: React.Dispatch<React.SetStateAction<Dictionary<any>[]>>;
  displayAddButton?: boolean;
  handleAddAction?:
    | null
    | ((_columnNames: TableColumn[]) => void | Promise<void>);
}

export const SearchFilterAddSection: React.FC<SearchFilterAddSectionProps> = ({
  columnNames,
  initialState,
  initialRowsValues,
  setDisplayedRows,
  displayAddButton,
  handleAddAction,
}) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<Filter>({});
  const [searchFields, setSearchFields] = useState<string[]>([]);
  const [searchFieldValues, setSearchFieldValues] = useState<string[]>([]);

  useEffect(() => {
    const newFilters: string[] = [];
    const newSearchFields: string[] = [];
    columnNames.forEach((col) => {
      if (col.canFilter && !col.canSearch && !col.invisible) {
        newFilters.push(col.id);
        setFilterValues((prev) => ({ ...prev, [col.id]: "" }));
      } else if (col.canSearch && !col.canFilter && !col.invisible) {
        newSearchFields.push(col.id);
        setSearchFieldValues((prev) => ({ ...prev, [col.id]: "" }));
      }
    });
    setFilters(newFilters);
    setSearchFields(newSearchFields);
  }, [columnNames]);

  const handleFilterChange = (
    colId: string,
    newValue: string | number | boolean
  ) => {
    let newDisplayedRows = [...initialState];
    Object.entries(filterValues).forEach(([key, value]) => {
      if (colId === key) {
        newDisplayedRows = newDisplayedRows.filter(
          (v) => v[colId] === newValue
        );
        setFilterValues((prev) => ({ ...prev, [colId]: newValue }));
      } else {
        newDisplayedRows = newDisplayedRows.filter((v) => v[key] === value);
      }
    });
    setDisplayedRows(newDisplayedRows);
  };

  const handleSearchChange = (
    colId: string,
    newValue: string | number | boolean
  ) => {
    let newDisplayedRows = [...initialState];
    Object.entries(searchFieldValues).forEach(([key, value]) => {
      if (colId === key) {
        newDisplayedRows = newDisplayedRows.filter(
          (v) => v[colId] === newValue
        );
        setSearchFieldValues((prev) => ({ ...prev, [colId]: newValue }));
      } else {
        newDisplayedRows = newDisplayedRows.filter((v) => v[key] === value);
      }
    });
    setDisplayedRows(newDisplayedRows);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (cols: TableColumn[]) => {
    if (!handleAddAction) return;
    try {
      setIsLoading(true);
      await handleAddAction(cols);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-1 bg-white">
      {/* Search Fields */}
      <div className="flex items-center justify-start bg-white">
        {Object.entries(searchFields).map(([colId, value]) => (
          <SearchField
            key={colId}
            colId={colId}
            label={columnNames.find((v) => v.id === colId)?.label || ""}
            value={value}
            onChange={(newValue) => handleSearchChange(colId, newValue)}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-start bg-white">
        {Object.keys(filters).length > 0 && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {Object.entries(filters).map(([colId, value]) => {
          const column = columnNames.find((v) => v.id === colId);
          if (!column) return null;

          const options = initialRowsValues
            .map((v) => v[colId])
            .filter(onlyUnique)
            .sort();

          return (
            <FilterSelect
              key={colId}
              colId={colId}
              column={column}
              value={value}
              options={options}
              onChange={(newValue) => handleFilterChange(colId, newValue)}
            />
          );
        })}
      </div>

      {/* Add Button */}
      {displayAddButton && (
        <div>
          <button
            type="button"
            className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
            onClick={() => handleAdd(columnNames)}
            disabled={isLoading}
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Add
          </button>
        </div>
      )}
    </div>
  );
};
