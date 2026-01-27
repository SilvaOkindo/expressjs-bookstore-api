import express from 'express'
import { addCategory } from '../controllers/v1/admin/category/add-category.js'
import { authorize } from '../middleware/authorize.js'
import { authenticate  } from '../middleware/authentication.js'

const router = express.Router()

router.post('/', authenticate, authorize(['ADMIN']), addCategory)

export default router