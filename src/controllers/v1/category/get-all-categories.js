export const getAllCategories = async (req, res) => {
    try {
        
    } catch (error) {
        logger.error('Get all categories error: ', {error})
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}