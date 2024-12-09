import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  // 他のNext.js設定があればここに記載
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);