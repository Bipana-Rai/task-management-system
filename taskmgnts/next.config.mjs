/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "https",
        hostname: "taskmgmntbackend.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "taskmngmtbackend.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
