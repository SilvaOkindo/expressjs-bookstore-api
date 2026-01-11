import express from 'express'
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'
import authorRoutes from './author.routes.js'
import adminRoutes from './admin.routes.js'

const router = express.Router()



router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is up',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    })
})


router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/author', authorRoutes)
router.use('/admin', adminRoutes)


export default router