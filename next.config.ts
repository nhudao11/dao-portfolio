import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes a plain HTML/CSS/JS site to `out/`.
 *
 * PAGES_BASE_PATH is set by the GitHub Pages workflow to "/dao-portfolio" because
 * the site lives at https://nhudao11.github.io/dao-portfolio/. With a custom
 * domain (e.g. daotn14.com) set it to "" (empty) instead.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
