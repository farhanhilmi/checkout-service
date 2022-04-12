import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

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
  '127.0.0.1:8001',
  grpc.credentials.createInsecure(),
);

export default client;
