import { getAllCategoriesServices } from "../../../services/category/getAllCategories.service.js"

export const getAllCategories = async (req, res) => {
    try {

        const categories = await getAllCategoriesServices()

        res.status(200).json({
            categories
        })
        
    } catch (error) {
        logger.error('Get all categories error: ', {error})
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}