import validateOrderId from './orderService.js';
import verifyItemAvailability from './productService.js';

export default async (call, callback) => {
  try {
    const { orderId } = call.request;
    const order = await validateOrderId(orderId);

    const products = order.products.map((prod) => {
      return { _id: prod.productId, quantity: prod.qty };
    });

    const isAvailable = await verifyItemAvailability(products);
    console.log('isAvailable', isAvailable);

    callback(null, isAvailable);
    // const isItemAvailable = await verifyItemAvailability(order.products.product)
  } catch (error) {
    callback(error);
  }
};
