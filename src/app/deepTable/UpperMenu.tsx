import { useEffect, useState } from "react";
import {
  ColumnType,
  Dictionary,
  Filter,
  TableColumn,
  isFilterableColumnType,
} from "./types";

interface SearchFieldProps {
  colId: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
}

interface FilterSelectProps {
  colId: string;
  column: TableColumn;
  value: string | number | boolean | null;
  options: unknown[];
  onChange: (_value: string | number | boolean | null) => void;
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
}) => {
  // Check if a filter is active (not the default "no filter" state)
  const isFilterActive =
    value !== NO_FILTER_VALUE &&
    value !== null &&
    value !== undefined &&
    value !== "";

  const getDisplayValue = (optionValue: unknown): string => {
    if (column.type === ColumnType.boolean) {
      if (optionValue === true) return "Yes";
      if (optionValue === false) return "No";
      // Handle null, undefined, or other non-boolean values
      return "Unknown";
    }
    if (column.type === ColumnType.integer) {
      if (optionValue === null || optionValue === undefined) return "Unknown";
      // For valid integers, just display the number
      return String(optionValue);
    }
    return String(optionValue);
  };

  const parseValue = (
    selectedValue: string
  ): string | number | boolean | null => {
    if (selectedValue === NO_FILTER_VALUE) {
      return NO_FILTER_VALUE;
    }

    switch (column.type) {
      case ColumnType.integer:
        if (selectedValue === "null") return null;
        return Number(selectedValue);
      case ColumnType.boolean:
        if (selectedValue === "true") return true;
        if (selectedValue === "false") return false;
        if (selectedValue === "null") return null;
        // Handle the third option (null/undefined/other)
        return null;
      case ColumnType.string:
      default:
        return selectedValue;
    }
  };

  return (
    <div className="relative mx-1">
      {/* Floating label when filter is active */}
      {isFilterActive && (
        <label
          htmlFor={`filter-${colId}`}
          className="absolute -top-2 left-3 text-xs text-primary bg-white px-1 z-10 font-medium"
        >
          {column.label}
        </label>
      )}

      <select
        key={`filter-${colId}`}
        id={`filter-${colId}`}
        aria-label={column.label}
        className={`filterType${
          column.type
        } bg-white border border-secondary-300 text-secondary-400 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 transition-colors duration-200 ${
          isFilterActive ? "border-primary" : ""
        }`}
        onChange={(e) => {
          const selectedValue = e.target.value;
          onChange(parseValue(selectedValue));
        }}
        value={value?.toString() ?? ""}
      >
        <option
          value={NO_FILTER_VALUE}
          className="font-semibold text-secondary-400"
        >
          {column.label}
        </option>
        {options.map((v) => (
          <option
            key={v === null ? "null" : String(v)}
            value={v === null ? "null" : String(v)}
            className="text-secondary-400"
          >
            {getDisplayValue(v)}
          </option>
        ))}
      </select>
    </div>
  );
};

interface SearchFilterAddSectionProps {
  columnNames: TableColumn[];
  initialState: Dictionary<unknown>[];
  initialRowsValues: Dictionary<unknown>[];
  setDisplayedRows: React.Dispatch<React.SetStateAction<Dictionary<unknown>[]>>;
  displayAddButton?: boolean;
  handleAddAction?:
    | null
    | ((_columnNames: TableColumn[]) => void | Promise<void>);
  selectedRowsCount?: number;
  onUnselectAll?: () => void;
}

export const SearchFilterAddSection: React.FC<SearchFilterAddSectionProps> = ({
  columnNames,
  initialState,
  initialRowsValues,
  setDisplayedRows,
  displayAddButton,
  handleAddAction,
  selectedRowsCount = 0,
  onUnselectAll = () => {},
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
      // Only create filters for string, integer, or boolean column types
      if (
        col.canFilter &&
        !col.canSearch &&
        !col.invisible &&
        isFilterableColumnType(col.type)
      ) {
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

  const applyAllFilters = (
    updatedFilterValues?: Filter,
    updatedSearchValues?: Record<string, string>
  ) => {
    let newDisplayedRows = [...initialState];

    const currentFilterValues = updatedFilterValues || filterValues;
    const currentSearchValues = updatedSearchValues || searchFieldValues;

    // Apply all filters except for columns with NO_FILTER_VALUE (disabled filtering)
    Object.entries(currentFilterValues).forEach(([key, value]) => {
      // Skip filtering if value is the special NO_FILTER_VALUE sentinel
      if (value !== NO_FILTER_VALUE) {
        const column = columnNames.find((col) => col.id === key);
        if (column && isFilterableColumnType(column.type)) {
          newDisplayedRows = newDisplayedRows.filter((row) => {
            const rowValue = row[key];

            // Handle different column types for comparison
            switch (column.type) {
              case ColumnType.boolean:
                // Handle null value (third option for boolean)
                if (value === null) {
                  return rowValue !== true && rowValue !== false;
                }
                // Use strict equality to avoid converting null/undefined to false
                return rowValue === value;
              case ColumnType.integer:
                // Handle null value (for non-integer values)
                if (value === null) {
                  return (
                    !Number.isInteger(Number(rowValue)) ||
                    rowValue === null ||
                    rowValue === undefined
                  );
                }
                // For valid integer comparisons, use strict number comparison
                return (
                  Number(rowValue) === Number(value) &&
                  Number.isInteger(Number(rowValue))
                );
              case ColumnType.string:
              default:
                return String(rowValue) === String(value);
            }
          });
        }
      }
    });

    // Apply search filtering for all search fields
    Object.entries(currentSearchValues).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        newDisplayedRows = newDisplayedRows.filter((row) =>
          String(row[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    setDisplayedRows(newDisplayedRows);
  };

  const handleFilterChange = (
    colId: string,
    newValue: string | number | boolean | null
  ) => {
    // Update the filter value first
    const updatedFilterValues = { ...filterValues, [colId]: newValue };
    setFilterValues(updatedFilterValues);

    // Apply all filters and searches together
    applyAllFilters(updatedFilterValues, searchFieldValues);
  };

  const handleSearchChange = (colId: string, newValue: string) => {
    // Update the search field value first
    const updatedSearchValues = { ...searchFieldValues, [colId]: newValue };
    setSearchFieldValues(updatedSearchValues);

    // Apply all filters and searches together
    applyAllFilters(filterValues, updatedSearchValues);
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

      {/* Middle section with filters and selected rows indicator */}
      <div className="flex items-center justify-center space-x-4 bg-white">
        {/* Selected Rows Indicator */}
        <SelectedRowsIndicator
          selectedCount={selectedRowsCount}
          onUnselectAll={onUnselectAll}
        />
        {/* Filters */}
        <div className="flex items-center">
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

            let options: unknown[];

            if (column.type === ColumnType.boolean) {
              // For boolean columns, extract actual values from data to see if there are non-boolean values
              const actualValues = initialRowsValues
                .map((v) => v[colId])
                .filter(onlyUnique);

              // Always include true and false
              options = [true, false];

              // Check if there are values that are not strictly true or false
              const hasNonBooleanValues = actualValues.some(
                (val) => val !== true && val !== false
              );

              if (hasNonBooleanValues) {
                // Add a representative null value for the "Unknown" option
                options.push(null);
              }
            } else if (column.type === ColumnType.integer) {
              // For integer columns, extract actual values and handle non-integer values
              const actualValues = initialRowsValues
                .map((v) => v[colId])
                .filter(onlyUnique);

              // Get valid integer values
              const integerValues = actualValues.filter(
                (val) =>
                  Number.isInteger(Number(val)) &&
                  val !== null &&
                  val !== undefined
              );

              // Check if there are non-integer values
              const hasNonIntegerValues = actualValues.some(
                (val) =>
                  !Number.isInteger(Number(val)) ||
                  val === null ||
                  val === undefined
              );

              // Use integer values, sorted
              options = integerValues.sort((a, b) => Number(a) - Number(b));

              if (hasNonIntegerValues) {
                // Add a representative null value for the "Unknown" option
                options.push(null);
              }
            } else {
              // For other types, extract unique values from data
              options = initialRowsValues
                .map((v) => v[colId])
                .filter(onlyUnique)
                .sort();
            }

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
      </div>

      {/* Add Button */}
      {displayAddButton && (
        <div>
          <button
            type="button"
            className="flex items-center justify-center text-white bg-primary hover:bg-primary-medium focus:ring-4 focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-1 focus:outline-none transition-colors duration-200"
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

interface SelectedRowsIndicatorProps {
  selectedCount: number;
  onUnselectAll: () => void;
}

export const SelectedRowsIndicator: React.FC<SelectedRowsIndicatorProps> = ({
  selectedCount,
  onUnselectAll,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-primary-dark">
        {selectedCount} row{selectedCount !== 1 ? "s" : ""} selected
      </span>
      <button
        type="button"
        onClick={onUnselectAll}
        className="flex items-center justify-center text-pink-800 hover:text-content-red hover:bg-red-50 rounded px-2 py-1 text-xs font-medium transition-colors duration-200"
        title="Unselect all rows"
      >
        <svg
          className="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Clear
      </button>
    </div>
  );
};
