import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// express
import express, { json, urlencoded } from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from './docs/swaggerSchema.js';

import checkoutHandler from './handler/checkoutHandler.js';
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

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PROTO_PATH = './checkout.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const checkoutPackage = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();
server.addService(checkoutPackage.CheckoutService.service, {
  checkout: checkoutHandler.checkout,
  getAllTransactions,
});

server.bindAsync(
  config.app.host,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    server.start();
    app.listen(config.app.port);
    console.log(`Server running at ${config.app.host}`);
  },
);
