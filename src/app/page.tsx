import { dogRaces, dogRacesTableHeader } from "@/headers";
import DeepTable from "./deepTable/DeepTable";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dog Races</h1>
      <DeepTable
        columnNames={dogRacesTableHeader}
        initialRowsValues={dogRaces}
        displayAddButton={true}
        selectable={true}
        // isDenseTable={false}
      />
    </div>
  );
}
