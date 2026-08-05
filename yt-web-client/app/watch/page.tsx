'use client';
import {useSearchParams} from "next/navigation";

export default function WatchLayout() {
  const videoPrefix = 'https://storage.googleapis.com/yt-clone-processed-video/';
  const videoSrc = useSearchParams().get('v');
  return (
    <div>
        <h1>Watch Page</h1>
        <video src={ videoPrefix + videoSrc} controls />
    </div>
  );
}