"use client";

import React from "react";
import { Dictionary } from "../deepTable/types";

interface RowDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: Dictionary<unknown> | null;
  title?: string;
}

const RowDetailModal: React.FC<RowDetailModalProps> = ({
  isOpen,
  onClose,
  rowData,
  title = "Row Details",
}) => {
  if (!isOpen || !rowData) return null;

  const formatValue = (key: string, value: unknown): string => {
    if (value === null || value === undefined) return "N/A";

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }

    // Handle timestamps
    if (key.includes("timestamp")) {
      if (key.includes("_ms")) {
        return new Date(value as number).toLocaleString();
      } else if (key.includes("_s")) {
        return new Date((value as number) * 1000).toLocaleString();
      }
    }

    // Handle birth_date
    if (key === "birth_date") {
      return new Date(value as number).toLocaleDateString();
    }

    return String(value);
  };

  const formatLabel = (key: string): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderValue = (key: string, value: unknown) => {
    if (typeof value === "object" && value !== null) {
      return (
        <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    return <span className="text-gray-800">{formatValue(key, value)}</span>;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {Object.entries(rowData).map(([key, value]) => (
              <div
                key={key}
                className="border-b border-gray-200 pb-3 last:border-b-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <label className="font-medium text-gray-700 min-w-0 sm:min-w-[120px] flex-shrink-0">
                    {formatLabel(key)}:
                  </label>
                  <div className="flex-1 min-w-0">
                    {renderValue(key, value)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RowDetailModal;
