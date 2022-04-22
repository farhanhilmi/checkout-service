import esClient from '../database/elasticsearch/client.js';

export default async (call, callback) => {
  try {
    const transactions = await esClient.search({
      index: 'transactions',
    });
    console.log(transactions.hits.hits);

    callback(null, { status: 'success' });
  } catch (error) {
    callback(error);
  }
};
