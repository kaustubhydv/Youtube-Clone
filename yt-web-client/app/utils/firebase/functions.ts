import {httpsCallable} from "firebase/functions";
import {functions} from "./firebase";

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: 'processing' | 'processed',
  title?: string,
  description?: string  
}

const generateUploadUrlCallable = httpsCallable(functions, "generateUploadUrl");
const getVideosFunction = httpsCallable(functions, 'getVideos');

export async function getVideos() {
  const response: any = await getVideosFunction();
  return response.data as Video[];
}

export async function uploadVideo(file: File): Promise<void> {
    const response: any = await generateUploadUrlCallable({ 
        fileExtension: file.name.split('.').pop() 
    })

    // Upload File
    await fetch(response?.data?.url, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });
}