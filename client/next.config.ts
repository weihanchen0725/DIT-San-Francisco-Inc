import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
