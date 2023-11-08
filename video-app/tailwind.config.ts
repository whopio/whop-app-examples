import type { Config } from "tailwindcss";
import preset from "@whop/frosted-ui/dist/preset";

const config = preset({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
});
export default config;
