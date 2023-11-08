import {
  hasAccess,
  authorizedUserOn,
  validateToken,
  WhopAPI,
} from "@whop-apps/sdk";
import { headers } from "next/headers";
import Link from "next/link";

interface Product {
  name: string;
  id: string;
  description?: string;
}

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

  if (!access) {
    return <p>no access</p>;
  }

  const companyProducts = await WhopAPI.app().GET("/app/products", {
    params: {
      query: {
        company_id: params.companyId,
      },
    },
  });

  if (!companyProducts.data) {
    return <p>No product founds</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {companyProducts.data.data.map((product: Product) => (
          <Link
            key={product.id}
            href={`/seller-view/${params.companyId}/${product.id}`}
          >
            <div className="transform transition duration-500 hover:scale-105 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl overflow-hidden">
              <div className="p-5">
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
