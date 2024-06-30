import { columns } from "./_components/columns";
import DataTable from "../_components/data-table";
import { getAllMentors } from "@/lib/data/user";

export default async function Mentors() {
  const mentors = await getAllMentors();
  return (
    <div className="p-6">
      <DataTable columns={columns} data={mentors} />
    </div>
  )
}
