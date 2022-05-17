import es from 'elasticsearch';

import config from '../../config/index.js';

const esClient = new es.Client({
  host: config.elasticSearch.port,
  // log: trace,
});

export default esClient;
