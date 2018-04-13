'use strict';

const config = require('./config.json');

const BigQuery = require('@google-cloud/bigquery');
const Storage = require('@google-cloud/storage');

exports.function = (event) => {
  const file = event.data;

  const bucketName = file.bucket;
  const filename = file.name;
  console.log('start loading:' + file.bucket + '/' + file.name);

  const bigquery = new BigQuery({
    projectId: config.projectId,
  });
  const storage = new Storage({
    projectId: config.projectId,
  });
  const metadata = {
    sourceFormat: 'NEWLINE_DELIMITED_JSON'
  }

  return bigquery.
    dataset(config.datasetName).
    table(config.tableName).
    load(storage.bucket(bucketName).file(filename), metadata).
    then(results => {
      const job = results[0];

      console.log(job.status.state + ':' + file.bucket + '/' + file.name);

      const errors = job.status.errors;
      if (errors && errors.length > 0) {
        throw errors;
      }
    }).
    catch(err => {
      console.error('ERROR:', err);
    });
}
