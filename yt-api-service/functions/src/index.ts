import * as functions from "firebase-functions/v1";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import type {UserRecord} from "firebase-admin/auth";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();
const rawVideoBucketName = "yt-clone-raw-video";

const videoCollectionId = "videos";

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string
}

export const getVideos = onCall({maxInstances: 1}, async () => {
  const querySnapshot =
    await firestore.collection(videoCollectionId).limit(10).get();
  return querySnapshot.docs.map((doc) => doc.data());
});

export const createUser = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    const userInfo = {
      uid: user.uid,
      email: user.email,
      photoUrl: user.photoURL,
    };

    await firestore.collection("users").doc(user.uid).set(userInfo);
    logger.info(`User Created: ${JSON.stringify(userInfo)}`);
  });

export const generateUploadUrl = onCall(
  {maxInstances: 1},
  async (request) => {
    const auth = request.auth;
    const data = request.data;
    const bucket = storage.bucket(rawVideoBucketName);

    if (!auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }

    const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

    const [url] = await bucket.file(fileName).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
    });

    return {url, fileName};
  }
);
