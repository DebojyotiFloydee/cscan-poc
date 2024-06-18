/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: false,
})

const nextConfig = {};

module.exports = withPWA(nextConfig)