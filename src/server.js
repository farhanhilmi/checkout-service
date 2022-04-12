import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// import createOrder from './service/createOrder.js';
import checkout from './service/checkout.js';

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
  // createOrder,
  checkout,
});

// mongoose.connect(config.db.uri, {
//   useNewUrlParser: true,
// });

// mongoose.connection.on('open', () => {
//   console.log('Connected to DB');
// });

// mongoose.connection.on('error', (err) => {
//   console.log(`Mongo connection error: ${err.message}`);
// });

server.bindAsync(
  '127.0.0.1:6001',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  },
);
