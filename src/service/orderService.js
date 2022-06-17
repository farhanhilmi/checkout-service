import client from '../grpc/order.js';

const validateOrderId = (orderId) => {
  return new Promise((resolve, reject) => {
    client.validateOrderId({ _id: orderId }, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  });
};

export default validateOrderId;
