import checkoutService from '../service/checkout.js';

const checkout = async (call, callback) => {
  try {
    const { orderId } = call.request;
    const status = await checkoutService(orderId);
    if (status instanceof Error) {
      throw new Error(status.message);
    }
    callback(null, { status });
  } catch (error) {
    callback(error);
  }
};

export default { checkout };
