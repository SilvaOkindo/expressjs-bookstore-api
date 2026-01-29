import {v2 as Cloudinary} from 'cloudinary'
import { config } from '../config/index.js'

import { logger } from '../utils/logger.js'



Cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
    secure: config.NODE_ENV === 'production'
})


export const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        Cloudinary.uploader.upload_stream({
            allowed_formats: ['png', 'jpg', 'webp'],
            resource_type: 'image',
            folder: 'bookstore-api',
            transformation: {quality: 'auto'}
        }, (err, result) => {
            if(err) {
                logger.error('Error uploading image to cloudinary', {error: err})
                return reject(err)
            }
            resolve(result)
        }).end(buffer)
    })
}