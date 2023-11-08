import SellerForm from "@/components/Form";
import { db } from "@/lib/prisma";

export default async function ProductView({
  params,
}: {
  params: { productId: string; companyId: string };
}) {
  const currentVideoURL = await db.videos.findUnique({
    where: {
      product_id: params.productId,
    },
    select: {
      video_url: true,
      video_type: true,
    },
  });

  console.log(params.productId);

  return (
    <SellerForm
      companyId={params.companyId}
      productId={params.productId}
      currentVideoURL={currentVideoURL?.video_url}
      currentVideoType={currentVideoURL?.video_type}
    />
  );
}
