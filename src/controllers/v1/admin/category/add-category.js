import { addCategoryService } from "../../../../services/admin/add-category.service.js"
import { logger } from "../../../../utils/logger.js"

export const addCategory = async (req, res) => {
    //console.log(req.body)
    try {

        const categoryData = req.body

        const category = await addCategoryService(categoryData)

        res.status(201).json({
            category
        })
        
    } catch (error) {
        if(error.message === 'CATEGORY_ALREADY_EXISTS') {
            return res.status(400).json({
                message: 'Category already exist'
            })
        }

        logger.error('Add category error: ', {error})
        res.status(500).json({
            message: 'Intenal server error'
        })
    }
}