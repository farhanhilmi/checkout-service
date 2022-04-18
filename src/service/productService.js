import client from '../grpc/product.js';

const verifyItemAvailability = (productsId) => {
  return new Promise((resolve, reject) => {
    client.isProductsAvailable({ productsId }, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  });
};

export default verifyItemAvailability;
