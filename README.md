# webapp

## Create a .env file at root of the project. With the following keys
```env
DIALECT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
PORT=
GCP_PROJECT_ID=
PUB_SUB_TOPIC_NAME=
```

## Run the server using the following command.
```bash
npm start
```


```bash
gcloud iam service-accounts create packer \
  --project "YOUR_GCP_PROJECT" \
  --description="Packer Service Account" \
  --display-name="Packer Service Account"
```

```bash
gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
    --member=serviceAccount:packer@YOUR_GCP_PROJECT.iam.gserviceaccount.com \
    --role=roles/compute.instanceAdmin.v1
```

```bash
gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
    --member=serviceAccount:packer@YOUR_GCP_PROJECT.iam.gserviceaccount.com \
    --role=roles/iam.serviceAccountUser
```

```bash
gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
    --member=serviceAccount:packer@YOUR_GCP_PROJECT.iam.gserviceaccount.com \
    --role=roles/iap.tunnelResourceAccessor
```
