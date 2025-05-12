/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ADMIN_PASSWORD: process.env.localADMIN_PASSWORD,
  },
};

export default nextConfig;
