/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACK_END_DOMAIN_IMG_UPLOAD: process.env.BACK_END_DOMAIN_IMG_UPLOAD,
    TINY_MCE_APP_KEY: process.env.TINY_MCE_APP_KEY,
  },
};

module.exports = nextConfig;
