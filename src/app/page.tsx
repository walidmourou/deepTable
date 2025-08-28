import { dogRacesTableHeader } from "@/app/data/headers";
import DeepTable from "./deepTable/DeepTable";
import { dogRaces } from "./data/dataList";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold m-4">Dog Races</h1>
      <div className="m-10">
        <DeepTable
          columnNames={dogRacesTableHeader}
          initialRowsValues={dogRaces}
          displayAddButton={true}
          selectable={true}
          // isDenseTable={false}
        />
      </div>
    </div>
  );
}
