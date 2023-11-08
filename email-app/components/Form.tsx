"use client";
import { useState, useEffect } from "react";
import {
  Input,
  Select,
  Button,
  TextArea,
  Toaster,
  toast,
} from "@whop/frosted-ui";
import SendEmail from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  error: false,
  message: "",
};

export default function Form({
  companyId,
  products,
}: {
  companyId: string;
  products: { name: string; id: string }[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<string>("all");
  const [state, formAction] = useFormState(SendEmail, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.message) {
      if (state.error === false) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state.error, state.message]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
      <div className="bg-white w-[600px] p-8 rounded-lg shadow-lg">
        <h1 className="text-lg text-center font-semibold mb-4">Send emails</h1>
        <form action={formAction}>
          <input type="hidden" name="companyId" value={companyId} />
          <div className="space-y-3">
            <Select
              items={[
                {
                  textValue: "All products",
                  value: "all",
                },
                ...products.map((product) => ({
                  textValue: product.name,
                  value: product.id,
                })),
              ]}
              onValueChange={(value) => setSelectedProduct(value)}
              placeholder="Select a product"
              size="md"
              name="productId"
              value={selectedProduct}
            />
            <Input name="title" placeholder="Title" size="md" required />
            <TextArea
              resizable
              name="body"
              placeholder="Body"
              rows={5}
              isRequired
            />
          </div>
          <Button isLoading={pending} className="w-full" type="submit">
            Send
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
