/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [55, 70, 82, 84, 85]
  }
};

export default nextConfig;
