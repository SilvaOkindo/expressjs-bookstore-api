import express from 'express'
import { addCategory } from '../controllers/v1/admin/category/add-category.js'
import { authorize } from '../middleware/authorize.js'
import { authenticate  } from '../middleware/authentication.js'
import { getAllCategories } from '../controllers/v1/category/get-all-categories.js'

const router = express.Router()

router.post('/', authenticate, authorize(['ADMIN']), addCategory)
router.get('/', authenticate, authorize(['ADMIN', 'USER', 'AUTHOR']), getAllCategories)

export default router