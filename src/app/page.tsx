import { dogRaces, dogRacesTableHeader } from "@/headers";
import DeepTable from "./deepTable/DeepTable";

export default function Home() {
  return (
    <div>
      <h1>Dog Races</h1>
      <DeepTable
        columnNames={dogRacesTableHeader}
        initialRowsValues={dogRaces}
      />
    </div>
  );
}
