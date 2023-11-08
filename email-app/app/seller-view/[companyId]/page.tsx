import {
  hasAccess,
  validateToken,
  authorizedUserOn,
  WhopAPI,
} from "@whop-apps/sdk";
import Form from "@/components/Form";
import { headers } from "next/headers";

export default async function SellerView({
  params,
}: {
  params: { companyId: string };
}) {
  const { userId } = await validateToken({ headers });

  const access = await hasAccess({
    to: authorizedUserOn(params.companyId),
    headers,
  });

  if (!access) return <p>no access</p>;

  const products = await WhopAPI.app().GET("/app/products", {
    params: {
      query: {
        company_id: params.companyId,
      },
    },
  });

  if (!products.data?.data) return <p>no products</p>;

  return (
    <div>
      <Form companyId={params.companyId} products={products.data.data} />
    </div>
  );
}
