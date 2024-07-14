/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "bidder-web-storage.s3.ap-south-1.amazonaws.com",
      "cdn.pixabay.com",
      "lh3.googleusercontent.com"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // compiler: {
  //   // Remove all console logs
  //   removeConsole: true
  // }
};

export default nextConfig;
