import { columns } from "./_components/columns";
import DataTable from "../_components/data-table";
import { getAllMentees } from "@/lib/data/user";

export default async function Mentees() {
  const mentees = await getAllMentees();
  return (
    <div className="p-6">
      <DataTable columns={columns} data={mentees} />
    </div>
  )
}
