import esClient from './client.js';

esClient.ping(
  {
    requestTimeout: 1000,
  },
  (error) => {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('OK');
    }
  },
);
