import { db } from "@/lib/prisma";

export default async function CustomerView({
  params,
}: {
  params: { productId: string };
}) {
  const video = await db.videos.findUnique({
    where: {
      product_id: params.productId,
    },
    select: {
      video_type: true,
      video_url: true,
      video_id: true,
    },
  });

  if (video?.video_type === "youtube") {
    return (
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${video.video_id}`}
      />
    );
  }

  return (
    <video controls className="absolute top-0 left-0 w-full h-full">
      <source src={video?.video_url} type="video/mp4" />
    </video>
  );
}
