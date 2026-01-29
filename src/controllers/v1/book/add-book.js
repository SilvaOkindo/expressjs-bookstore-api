import { logger } from "../../../utils/logger.js";
import { addBookService } from '../../../services/author/book/add-book.service.js';

export const addBook = async (req, res) => {
     const {title, description, isbn, category, publisher} = req.body
     const bookCover = req.body.bookCover.url || null;
     const authorId = req.user.id;
    try {

        const newBook = await addBookService({
            title,
            authorId: parseInt(authorId),
            description,
            isbn,
            category: parseInt(category),
            publisher: parseInt(publisher),
            bookCover
        })

        return res.status(201).json({
            data: newBook
        })
        
    } catch (error) {
        if(error.code === 'P2002') {
            logger.warn("Attempt to add a book with existing ISBN", {isbn})
            return res.status(400).json({
                message: 'A book with this ISBN already exists.'
            })
        }
        logger.error("Error adding new book", {error})
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}