import { Client } from '@elastic/elasticsearch';

import config from '../../config/index.js';

const esClient = new Client({
  node: {
    url: new URL(`http://${config.elasticSearch.port}`),
  },
  // host: config.elasticSearch.port,
  // log: trace,
});

export default esClient;
