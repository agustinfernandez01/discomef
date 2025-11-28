/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 🔥 Deshabilita la optimización para export
  },
};

module.exports = nextConfig;
