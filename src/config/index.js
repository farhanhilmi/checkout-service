import dotenv from 'dotenv';

dotenv.config();

const { HOST, SERVER_PORT, PRODUCT_GRPC_PORT, ORDER_GRPC_PORT, ES_PORT } =
  process.env;

const config = {
  app: {
    host: `${HOST}:${SERVER_PORT}`,
    port: SERVER_PORT,
  },
  grpc: {
    port: {
      product: `${HOST}:${PRODUCT_GRPC_PORT}`,
      order: `${HOST}:${ORDER_GRPC_PORT}`,
    },
  },
  elasticSearch: {
    port: `${HOST}:${ES_PORT}`,
  },
};

export default config;
