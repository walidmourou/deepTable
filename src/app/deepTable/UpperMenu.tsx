import { useEffect, useState } from "react";
import { ColumnType, Dictionary, Filter, TableColumn } from "./types";

interface SearchFieldProps {
  colId: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
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
}) => {
  const hasValue = value.length > 0; // Float label if any content (including spaces)

  return (
    <div className="mx-1">
      <div className="relative">
        {/* Floating label */}
        <label
          htmlFor={`search-${colId}`}
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            hasValue
              ? "-top-2 text-xs text-primary bg-white px-1 z-10"
              : "top-2 text-sm text-secondary-400"
          }`}
        >
          {label}
        </label>

        {/* Search icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-secondary-400"
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

        {/* Input field */}
        <input
          type="text"
          id={`search-${colId}`}
          className="block w-full p-2 pl-3 pr-10 text-sm text-secondary-400 border border-secondary-300 rounded-lg bg-white focus:ring-primary focus:border-primary transition-colors duration-200"
          placeholder={hasValue ? "" : ""}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

// Special sentinel value to indicate "no filter" (disable filtering)
const NO_FILTER_VALUE = "__NO_FILTER__";

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
    className={`filterType${column.type} m-1 bg-white border border-secondary-300 text-secondary-400 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 transition-colors duration-200`}
    onChange={(e) => {
      const selectedValue = e.target.value;
      if (selectedValue === NO_FILTER_VALUE) {
        onChange(NO_FILTER_VALUE);
      } else {
        onChange(
          column.type === ColumnType.integer
            ? Number(selectedValue)
            : selectedValue
        );
      }
    }}
    value={value.toString()}
  >
    <option
      value={NO_FILTER_VALUE}
      className="font-semibold text-secondary-400"
    >
      {column.label}
    </option>
    {options.map((v) => (
      <option
        key={String(v)}
        value={v as string | number}
        className="text-secondary-400"
      >
        {String(v)}
      </option>
    ))}
  </select>
);

interface SearchFilterAddSectionProps {
  columnNames: TableColumn[];
  initialState: Dictionary<unknown>[];
  initialRowsValues: Dictionary<unknown>[];
  setDisplayedRows: React.Dispatch<React.SetStateAction<Dictionary<unknown>[]>>;
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
  const [searchFieldValues, setSearchFieldValues] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const newFilters: string[] = [];
    const newSearchFields: string[] = [];
    const newSearchFieldValues: Record<string, string> = {};

    columnNames.forEach((col) => {
      if (col.canFilter && !col.canSearch && !col.invisible) {
        newFilters.push(col.id);
        setFilterValues((prev) => ({ ...prev, [col.id]: NO_FILTER_VALUE }));
      } else if (col.canSearch && !col.canFilter && !col.invisible) {
        newSearchFields.push(col.id);
        newSearchFieldValues[col.id] = "";
      }
    });
    setFilters(newFilters);
    setSearchFields(newSearchFields);
    setSearchFieldValues(newSearchFieldValues);
  }, [columnNames]);

  const handleFilterChange = (
    colId: string,
    newValue: string | number | boolean
  ) => {
    // Update the filter value first
    setFilterValues((prev) => ({ ...prev, [colId]: newValue }));

    let newDisplayedRows = [...initialState];

    // Apply all filters except for columns with NO_FILTER_VALUE (disabled filtering)
    Object.entries({ ...filterValues, [colId]: newValue }).forEach(
      ([key, value]) => {
        // Skip filtering if value is the special NO_FILTER_VALUE sentinel
        if (value !== NO_FILTER_VALUE) {
          newDisplayedRows = newDisplayedRows.filter((v) => v[key] === value);
        }
      }
    );

    setDisplayedRows(newDisplayedRows);
  };

  const handleSearchChange = (colId: string, newValue: string) => {
    // Update the search field value first
    setSearchFieldValues((prev) => ({ ...prev, [colId]: newValue }));

    let newDisplayedRows = [...initialState];

    // Apply search filtering for all search fields
    Object.entries({ ...searchFieldValues, [colId]: newValue }).forEach(
      ([key, value]) => {
        if (value && value.trim() !== "") {
          newDisplayedRows = newDisplayedRows.filter((row) =>
            String(row[key]).toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    );

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
    <div className="flex items-center justify-between py-1 bg-white rounded-lg mb-1 shadow-sm relative">
      {/* Search Fields */}
      <div className="flex items-center justify-start bg-white">
        {searchFields.map((colId) => (
          <SearchField
            key={colId}
            colId={colId}
            label={columnNames.find((v) => v.id === colId)?.label || ""}
            value={searchFieldValues[colId] || ""}
            onChange={(newValue) => handleSearchChange(colId, newValue)}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-start bg-white">
        {Object.keys(filters).length > 0 && (
          <div className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
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
        {filters.map((colId) => {
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
              value={filterValues[colId]}
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
            className="flex items-center justify-center text-white bg-primary hover:bg-primary-medium focus:ring-4 focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none transition-colors duration-200"
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
