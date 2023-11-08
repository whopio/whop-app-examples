"use client"; // this line is important
import { FC, PropsWithChildren } from "react";
import { TooltipProvider, Toaster } from "@whop/frosted-ui";

export const ClientLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
};
