import validateOrderId from './orderService.js';
import verifyItemAvailability from './productService.js';

export default async (call, callback) => {
  try {
    const { orderId } = call.request;
    const order = await validateOrderId(orderId);

    const productsId = order.products.map((prod) => {
      return prod.productId;
    });

    const status = await verifyItemAvailability(productsId);

    callback(null, { status });
  } catch (error) {
    callback(error);
  }
};
