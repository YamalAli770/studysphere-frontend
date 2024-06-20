// components/OrdersViewServer.js
import { getUserOrders } from '@/lib/data/order';
import { currentUserServer } from '@/lib/user-server';
import OrderFilter from './_components/order-filter';

const OrdersView = async () => {
  const user = await currentUserServer();

  if (!user) {
    return null;
  }

  const orders = await getUserOrders(user.id);

  return <OrderFilter orders={orders} />;
};

export default OrdersView;
