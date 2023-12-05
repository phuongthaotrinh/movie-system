/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "*/**", "image.tmdb.org","www.themoviedb.org"],
    },
}

module.exports = nextConfig
