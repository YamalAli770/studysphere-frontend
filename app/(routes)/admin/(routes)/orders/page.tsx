import { columns } from "./_components/columns";
import DataTable from "../_components/data-table";

import { getAllOrders } from "@/lib/data/order";

export default async function Orders() {
  const orders = await getAllOrders();
  console.log(orders);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
