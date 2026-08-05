# YouTube Clone

A full-stack cloud-native YouTube clone built using Next.js, Firebase, and Google Cloud Platform.

## Features

- Google Authentication with Firebase Auth
- Secure video uploads using signed Cloud Storage URLs
- Event-driven video processing pipeline
- Automatic 360p video transcoding using FFmpeg
- Video metadata management with Firestore
- Cloud-native backend deployed on Cloud Run
- Dockerized services with Artifact Registry
- Responsive Next.js frontend

## Architecture

User Upload
↓
Firebase Authentication
↓
Cloud Function (Generate Signed Upload URL)
↓
Cloud Storage (Raw Videos)
↓
Pub/Sub Notification
↓
Cloud Run (Express + FFmpeg)
↓
Cloud Storage (Processed Videos)
↓
Firestore Metadata Update
↓
Next.js Frontend

## Tech Stack

Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend
- Node.js
- Express
- Firebase Cloud Functions

Google Cloud
- Cloud Run
- Cloud Storage
- Firestore
- Pub/Sub
- Artifact Registry
- IAM

Other
- Docker
- FFmpeg
