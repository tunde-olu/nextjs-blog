/** @type {import('next').NextConfig} */
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

const nextConfig = (phase) => {
  // env: {
  //   mongodb_username: 'mongo',
  //   mongodb_password: 'tunde',
  //   mongodb_clustername: 'cluster0',
  //   mongodb_database: 'next-blog',
  // },
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: process.env.mongodb_username,
        mongodb_password: process.env.mongodb_password,
        mongodb_clustername: 'cluster0',
        mongodb_database: 'next-blog-dev',
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_username: process.env.mongodb_username,
      mongodb_password: process.env.mongodb_password,
      mongodb_clustername: 'cluster0',
      mongodb_database: 'next-blog',
    },
  };
};

module.exports = nextConfig;
