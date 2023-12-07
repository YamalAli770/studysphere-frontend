import { columns } from "./_components/columns";
import DataTable from "../_components/data-table";

import { orders } from "@/data/dbd-order-data";

export default function Orders() {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
