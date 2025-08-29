import { dogRaces } from "./dataList";

/**
 * Data Type Examples for DeepTable
 *
 * This file demonstrates all supported ColumnType values with real examples
 * from the dogRaces dataset.
 */

// Example data showing all column types:
export const dataTypeExamples = {
  // ColumnType.boolean
  boolean: {
    description: "True/false values, displayed as checkboxes",
    examples: [
      { value: true, display: "✓ (checked checkbox)" },
      { value: false, display: "☐ (unchecked checkbox)" },
      { value: null, display: "— (dash for null)" },
      { value: "true", display: "✓ (string 'true' converted to checked)" },
      { value: 1, display: "✓ (number 1 converted to checked)" },
    ],
  },

  // ColumnType.integer
  integer: {
    description: "Whole numbers",
    examples: [
      { value: 12, display: "12" },
      { value: 0, display: "0" },
      { value: null, display: "null" },
    ],
  },

  // ColumnType.float
  float: {
    description: "Decimal numbers",
    examples: [
      { value: 24.5, display: "24.5" },
      { value: 65.0, display: "65.0" },
      { value: null, display: "null" },
    ],
  },

  // ColumnType.string
  string: {
    description: "Text values",
    examples: [
      { value: "Golden Retriever", display: "Golden Retriever" },
      { value: "Scotland", display: "Scotland" },
      { value: null, display: "null" },
      { value: "", display: "(empty string)" },
    ],
  },

  // ColumnType.timestamp_s
  timestamp_s: {
    description: "Unix timestamp in seconds, displayed as formatted date/time",
    examples: [
      { value: 1640995200, display: "01.01.22, 00:00 (German format)" },
      { value: 1672531200, display: "01.01.23, 00:00 (German format)" },
      { value: null, display: "— (dash for null)" },
      { value: undefined, display: "— (dash for undefined)" },
    ],
  },

  // ColumnType.timestamp_ms
  timestamp_ms: {
    description:
      "Unix timestamp in milliseconds, displayed as formatted date/time",
    examples: [
      { value: 1704067200000, display: "01.01.24, 00:00 (German format)" },
      { value: 1706745600000, display: "01.02.24, 00:00 (German format)" },
      { value: null, display: "— (dash for null)" },
      { value: undefined, display: "— (dash for undefined)" },
    ],
  },

  // ColumnType.date
  date: {
    description:
      "Date values (epoch milliseconds), displayed as formatted date/time",
    examples: [
      { value: 1609459200000, display: "01.01.21, 00:00 (German format)" },
      { value: 1612137600000, display: "01.02.21, 00:00 (German format)" },
      { value: null, display: "— (dash for null)" },
      { value: undefined, display: "— (dash for undefined)" },
    ],
  },

  // ColumnType.variant
  variant: {
    description:
      "Complex data types (arrays, objects, etc.) with smart display",
    examples: [
      {
        value: ["Friendly", "Intelligent", "Devoted"],
        display: 'Array (3) ["Friendly", "Intelligent", ...]',
      },
      {
        value: { temperament: "Gentle", energy: "High" },
        display: 'Object {"temperament":"Gentle","ener...}',
      },
      {
        value: "Simple string",
        display: "Simple string",
      },
      {
        value: null,
        display: "null (italic gray)",
      },
      {
        value: {
          training: { difficulty: "Easy", specialties: ["Guard work"] },
        },
        display: "Object (nested structure truncated)",
      },
    ],
  },
};

// Sample entries showing complete data type coverage
export const sampleDataWithAllTypes = dogRaces.slice(0, 5).map((dog) => {
  const enrichedDog = dog as Record<string, unknown>;
  return {
    id: dog.id, // ColumnType.string
    name: dog.name, // ColumnType.string
    country: dog.country, // ColumnType.string
    max_age: dog.max_age, // ColumnType.integer
    hight: dog.hight, // ColumnType.float
    width: dog.width, // ColumnType.float
    is_dangerous: dog.is_dangerous, // ColumnType.boolean
    registration_timestamp_s: enrichedDog.registration_timestamp_s, // ColumnType.timestamp_s
    last_checkup_timestamp_ms: enrichedDog.last_checkup_timestamp_ms, // ColumnType.timestamp_ms
    birth_date: enrichedDog.birth_date, // ColumnType.date
    characteristics: enrichedDog.characteristics, // ColumnType.variant
  };
});

console.log("Data type examples available:", Object.keys(dataTypeExamples));
