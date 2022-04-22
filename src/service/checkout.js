import validateOrderId from './orderService.js';
import verifyItemAvailability from './productService.js';
import esClient from '../database/elasticsearch/client.js';

export default async (call, callback) => {
  try {
    const { orderId } = call.request;
    const order = await validateOrderId(orderId);

    const productsId = order.products.map((prod) => {
      return prod.productId;
    });

    const status = await verifyItemAvailability(productsId);

    const transaction = {
      userId: order.userId,
      orderId: order._id,
      totalAmount: order.total,
      createdDate: new Date(),
    };

    esClient.index({
      index: 'transactions',
      body: transaction,
    });

    callback(null, { status });
  } catch (error) {
    callback(error);
  }
};
