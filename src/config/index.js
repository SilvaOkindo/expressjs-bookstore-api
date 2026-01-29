export const config = {
    PORT: process.env.PORT || 3000,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    JSON_SECRET_KEY: process.env.JSON_SECRET_KEY,
    REDIS_URI: process.env.REDIS_URI,

    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY
}