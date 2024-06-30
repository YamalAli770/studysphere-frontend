import { columns } from "./_components/columns";
import DataTable from "../_components/data-table";

import { getAllEduVerification } from "@/lib/data/education-verification";

export default async function EduVerification() {
  const eduVerification = await getAllEduVerification();
  console.log(eduVerification);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={eduVerification} />
    </div>
  )
}
