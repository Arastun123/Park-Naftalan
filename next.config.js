/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5041",
        pathname: "/uploads/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
