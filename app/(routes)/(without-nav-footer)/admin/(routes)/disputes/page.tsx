import { columns } from "./_components/columns";
import DataTable from "../_components/data-table";

import { disputes } from "@/data/dbd-dispute-data";

export default function Dispute() {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={disputes} />
    </div>
  )
}
