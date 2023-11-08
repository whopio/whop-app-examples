"use server";
import { db } from "./prisma";

export default async function AddVideoLink(prevState: any, formData: FormData) {
  const url = formData.get("url") as string;
  const companyId = formData.get("companyId") as string;
  const productId = formData.get("productId") as string;
  const videoType = formData.get("videoType") as string;

  let youtubeId = "";

  if (videoType == "youtube") {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    youtubeId = params.get("v") || "";
  }

  await db.videos.upsert({
    where: {
      product_id: productId,
    },
    update: {
      company_id: companyId,
      product_id: productId,
      video_id: youtubeId,
      video_url: url,
      video_type: videoType,
    },
    create: {
      company_id: companyId,
      product_id: productId,
      video_id: youtubeId,
      video_url: url,
      video_type: videoType,
    },
  });

  return { message: "success" };
}
