import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Permitir requisições cross-origin do ngrok para desenvolvimento
  allowedDevOrigins: ["distinctly-whole-sole.ngrok-free.app"],
};

export default nextConfig;
