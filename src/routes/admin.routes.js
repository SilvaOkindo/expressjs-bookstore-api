import { approveAuthor } from '../controllers/v1/admin/approve-author.js';
import { getAllApplications } from '../controllers/v1/admin/get-all-applications.js';
import { authenticate } from '../middleware/authentication.js'
import {authorize} from '../middleware/authorize.js'

import express from "express";

const router = express.Router();    


router.get('/approve-author/:id', authenticate, authorize(['ADMIN']), approveAuthor)
router.get('/author-applications', authenticate, authorize(['ADMIN']), getAllApplications)
router.get('/', (req, res) => {
    res.sendStatus(200)
})

export default router;