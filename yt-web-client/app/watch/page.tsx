export default async function WatchPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  return (
    <div>
      <h1>Watch Page</h1>
      <video
        src={`https://storage.googleapis.com/yt-clone-processed-video/${v}`}
        controls
      />
    </div>
  );
}