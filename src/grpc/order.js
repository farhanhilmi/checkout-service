import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

import config from '../config/index.js';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PROTO_PATH = 'order.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const orderPackage = grpc.loadPackageDefinition(packageDef);

const client = new orderPackage.OrderService(
  config.grpc.port.order,
  grpc.credentials.createInsecure(),
);

export default client;
