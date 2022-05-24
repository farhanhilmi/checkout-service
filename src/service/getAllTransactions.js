import esClient from '../database/elasticsearch/client.js';

export default async (call, callback) => {
  try {
    const transactions = await esClient.search({
      index: 'transactions',
    });
    console.log(transactions.hits.hits);

    // const transactions = await esClient.search({
    //   index: 'transactions',
    //   query: {
    //     match: {
    //       orderId: '628c727671585c006b3f2d2e',
    //     },
    //   },
    // });

    // console.log(transactions.hits.hits);

    // await esClient.indices.delete({
    //   index: 'transactions',
    // });

    callback(null, { status: 'success' });
  } catch (error) {
    if (error.meta.statusCode === 404) {
      callback({ code: 5, message: 'Not Found' });
    } else {
      callback(error);
    }
    console.log(error.meta.statusCode === 404);
  }
};
