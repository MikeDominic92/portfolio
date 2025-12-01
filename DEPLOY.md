# Deploying Portfolio to Google Cloud Run

Here are the exact commands to deploy your portfolio to Google Cloud.

## Prerequisites
Ensure you have the Google Cloud SDK (`gcloud`) installed and you are logged in.

## 1. Initialize Google Cloud Project
If you haven't already, create a project or select an existing one.
```powershell
gcloud init
```

## 2. Enable Required Services
Enable Cloud Build and Cloud Run APIs.
```powershell
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

## 3. Deploy to Cloud Run
Run this single command to build your container and deploy it. Replace `[REGION]` with your preferred region (e.g., `us-central1`).

```powershell
gcloud run deploy portfolio --source . --region us-central1 --allow-unauthenticated
```

## What happens next?
1.  Google Cloud will upload your code.
2.  It will build the Docker container using the `Dockerfile` I created.
3.  It will launch the service on Cloud Run.
4.  **Success!** It will print a URL (e.g., `https://portfolio-xyz-uc.a.run.app`) where your site is live.
