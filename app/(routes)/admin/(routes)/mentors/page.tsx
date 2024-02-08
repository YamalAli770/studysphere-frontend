import { columns } from "./_components/columns";
import DataTable from "../_components/data-table";

import { mentors } from "@/data/dbd-mentor-data";

export default function Mentors() {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={mentors} />
    </div>
  )
}
