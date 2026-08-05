import express from "express";
import { setupDirectories, convertVideo, downloadRawVideo, uploadProcessedVideo, deleteRawVideo, deleteProcessedVideo } from "./storage";
import { isVideoNew, setVideo } from "./firestore";

setupDirectories();

const app = express();
app.use(express.json());

app.post("/process-video", async (req, res) => {
    // Get the bucket and filename from the Cloud Pub/Sub message
    let data;
    try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
    data = JSON.parse(message);
    if (!data.name) {
        throw new Error('Invalid message payload received.');
    }
    } catch (error) {
    console.error(error);
    return res.status(400).send('Bad Request: missing filename.');
    }
  
    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;
    const videoId = inputFileName.split(".")[0];

    if(!isVideoNew(videoId)) {
        return res.status(400).send('Bad Request: video has already been processed.');
    } else {
        await setVideo(videoId, { 
            status: 'processing', 
            uid: inputFileName.split('-')[0], 
            id: videoId,
            filename: inputFileName 
        });
    }

    // Download the raw video from Cloud Storage
    await downloadRawVideo(inputFileName)

    // Process the video into 360p
    try { 
    await convertVideo(inputFileName, outputFileName)
    } catch (err: unknown) {
    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ]);
    console.error(err);
    return res.status(500).send('INTERNAL SERVER ERROR: Video processing failed.');
    }

    // Upload the processed video to Cloud Storage
    await uploadProcessedVideo(outputFileName)

    await setVideo(videoId, { status: 'processed', filename: outputFileName });

    await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)
    ]);

    return res.status(200).send('Processing finished successfully');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});