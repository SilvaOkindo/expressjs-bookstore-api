import express from 'express'
import { getPublishers } from '../controllers/v1/publisher/get-publishers.js'

const router = express.Router()

router.get('/', getPublishers)

export default router