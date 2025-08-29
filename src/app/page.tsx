"use client";

import { dogRacesTableHeader } from "@/app/data/headers";
import DeepTable from "./deepTable/DeepTable";
import { dogRaces } from "./data/dataList";
import { useState } from "react";
import { Dictionary } from "./deepTable/types";
import RowDetailModal from "./components/RowDetailModal";

export default function Home() {
  // Row selection state
  const [selectedRows, setSelectedRows] = useState<Set<Dictionary<unknown>>>(
    new Set()
  );

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] =
    useState<Dictionary<unknown> | null>(null);

  const handleViewAction = (row: Dictionary<unknown>) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold m-4">Dog Races</h1>
      <div className="m-10">
        <DeepTable
          columnNames={dogRacesTableHeader}
          initialRowsValues={dogRaces}
          displayAddButton={true}
          displayDeleteAction={true}
          displayEditAction={true}
          displayViewAction={true}
          handleAddAction={() => alert("Add action")}
          handleEditAction={(row) => alert("Edit action on " + row.id)}
          handleDeleteAction={(row) => alert("Delete action on " + row.id)}
          handleViewAction={handleViewAction}
          selectable={true}
          // isDenseTable={false}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>

      <RowDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        rowData={selectedRowData}
        title="Dog Race Details"
      />
    </div>
  );
}
