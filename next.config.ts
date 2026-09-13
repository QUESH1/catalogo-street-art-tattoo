import type { NextConfig } from 'next';

// Set by the GitHub Pages workflow to the repo name (e.g. "/catalogo-street-art-tattoo")
// so the static export works from a project sub-path instead of the domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
