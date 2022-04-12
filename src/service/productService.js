import client from '../grpc/product.js';

const verifyItemAvailability = (listProductQty) => {
  return new Promise((resolve, reject) => {
    client.isProductsAvailable({ listProductQty }, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  });
};

export default verifyItemAvailability;
