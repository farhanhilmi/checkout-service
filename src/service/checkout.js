import validateOrderId from './orderService.js';
import verifyItemAvailability from './productService.js';
import esClient from '../database/elasticsearch/client.js';

export default async (orderId) => {
  try {
    const order = await validateOrderId(orderId);
    const productsId = order.products.map((prod) => {
      return prod.productId;
    });

    await verifyItemAvailability(productsId);

    const transaction = {
      userId: order.userId,
      orderId: order._id,
      totalAmount: order.total,
      createdDate: new Date(),
    };

    const exist = await esClient.search({
      index: 'transactions',
      query: {
        bool: {
          must: {
            match: {
              orderId: order._id,
            },
          },
        },
      },
    });
    if (exist.hits.hits.length > 1) {
      throw new Error('You have made a transaction!');
    }

    esClient.index({
      index: 'transactions',
      document: transaction,
    });

    return 'transaction success';
  } catch (error) {
    return error;
  }
};
