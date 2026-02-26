import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        // hostname: 'my-strapi-domain.com', // or 'localhost'
        hostname: "localhost", // for local development
        port: "1337", // if your Strapi instance runs on a specific port
        // pathname: '/uploads/**', // adjust this if your images are served from a different path
      },
    ],
  },
  sassOptions: {
    additionalData: `$var: red;`,
    implementation: "sass-embedded",
  },
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
