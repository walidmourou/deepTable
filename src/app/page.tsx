"use client";

import { dogRacesTableHeader } from "@/app/data/headers";
import DeepTable from "./deepTable/DeepTable";
import { dogRaces } from "./data/dataList";
import { useState } from "react";
import { Dictionary } from "./deepTable/types";

export default function Home() {
  // Row selection state
  const [selectedRows, setSelectedRows] = useState<Set<Dictionary<unknown>>>(
    new Set()
  );
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
          handleViewAction={(row) => alert("View action on " + row.id)}
          selectable={true}
          // isDenseTable={false}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </div>
  );
}
