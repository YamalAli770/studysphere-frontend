import { columns } from "./_components/columns";
import DataTable from "../_components/data-table";

import { mentees } from "@/data/dbd-mentee-data";

export default function Mentees() {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={mentees} />
    </div>
  )
}
