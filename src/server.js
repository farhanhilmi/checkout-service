import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

import checkout from './service/checkout.js';
import getAllTransactions from './service/getAllTransactions.js';

import config from './config/index.js';

// import config from './config/index.js';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PROTO_PATH = './checkout.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const checkoutPackage = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();
server.addService(checkoutPackage.CheckoutService.service, {
  checkout,
  getAllTransactions,
});

server.bindAsync(
  config.app.port,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  },
);
