import es from 'elasticsearch';

const esClient = new es.Client({
  host: 'localhost:9200',
  // log: trace,
});

export default esClient;
