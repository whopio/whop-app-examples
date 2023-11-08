"use client";
import {
  Input,
  Button,
  toast,
  Toaster,
  RadioCardGroup,
} from "@whop/frosted-ui";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import AddVideoLink from "@/lib/actions";

const initialState = {
  message: null,
  errorMessage: null,
};

export default function SellerForm({
  companyId,
  productId,
  currentVideoURL,
  currentVideoType,
}: {
  companyId: string;
  productId: string;
  currentVideoURL?: string;
  currentVideoType?: string;
}) {
  const [state, formAction] = useFormState(AddVideoLink, initialState);
  const [videoType, setVideoType] = useState(currentVideoType || "youtube");
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state?.message === "success") {
      toast.success("Successfully added video!");
    }
  }, [state?.message]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
      <div className="bg-white w-[600px] p-8 rounded-lg shadow-lg">
        <h1 className="text-lg text-center font-semibold mb-4">YouTube App</h1>
        <form action={formAction}>
          <input type="hidden" name="companyId" value={companyId} />
          <input type="hidden" name="productId" value={productId} />
          <div>
            <RadioCardGroup
              className="flex space-x-6"
              colorScheme="brand"
              defaultValue={videoType}
              onValueChange={(value) => setVideoType(value)}
              value={videoType}
              name="videoType"
              items={[
                {
                  description: "A YouTube Video",
                  value: "youtube",
                  label: "YouTube",
                },
                {
                  description: "An Imgur Video",
                  value: "imgur",
                  label: "Imgur",
                },
              ]}
            />
          </div>
          <div className="my-4">
            <Input
              label={{
                children: "Video URL",
                tooltip: {
                  description:
                    "The URL of the YouTube video you want your users to watch.",
                },
              }}
              messageIcon
              size="md"
              className="w-full"
              name="url"
              defaultValue={currentVideoURL}
              errorMessage={state?.errorMessage}
            />
          </div>
          <Button isLoading={pending} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
