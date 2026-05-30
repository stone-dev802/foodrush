import { orders } from '../data/orders.js';
import { hasMongoConfig } from '../config/database.js';
import { Order, OrderItem, OrderModel } from '../models/order.js';

export async function createOrder(input: {
  userId?: string;
  customerName?: string;
  items: OrderItem[];
  paymentMethod: string;
}): Promise<Order> {
  const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 700 : 0;
  const total = subtotal + deliveryFee;

  if (hasMongoConfig()) {
    const order = await OrderModel.create({
      userId: input.userId,
      customerName: input.customerName,
      items: input.items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: input.paymentMethod,
      status: 'confirmed',
    });

    return order.toJSON() as unknown as Order;
  }

  const order: Order = {
    id: `order_${Date.now()}`,
    userId: input.userId,
    customerName: input.customerName,
    items: input.items,
    subtotal,
    deliveryFee,
    total,
    paymentMethod: input.paymentMethod,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.unshift(order);
  return order;
}

export async function listOrders(userId?: string) {
  if (hasMongoConfig()) {
    const foundOrders = await OrderModel.find(userId ? { userId } : {}).sort({ createdAt: -1 });
    return foundOrders.map((order) => order.toJSON() as unknown as Order);
  }

  if (!userId) {
    return orders;
  }

  return orders.filter((order) => order.userId === userId);
}
