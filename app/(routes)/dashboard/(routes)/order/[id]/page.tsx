import { getOrderById } from '@/lib/data/order';
import Order from '../_components/order';
import { notFound } from 'next/navigation';
import { currentUserServer } from '@/lib/user-server';

interface OrderPageProps {
  params: {
    id: string;
  };
}

const OrderPage = async ({ params: { id } }: OrderPageProps) => {
  const order = await getOrderById(id);
  const user = await currentUserServer();

  if (!order) {
    return notFound();
  }

  return <Order order={order} user={user} />;
};

export default OrderPage;
