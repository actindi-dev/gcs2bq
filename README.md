# gcs2bq
Google Cloud Functions function to load JSON file on Google Cloud Storage to BigQuery

## setup

```sh
cp config.json.example config.json
```

and edit `config.json`.

## deploy

```sh
gcloud beta functions deploy {your_function_name} \
  --source={path_to_this_repository} \
  --timeout=540s \
  --trigger-event=google.storage.object.finalize \
  --trigger-resource={your_bucket_name}
```