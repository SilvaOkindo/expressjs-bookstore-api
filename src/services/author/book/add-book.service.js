import { prisma } from '../../../lib/prisma.js'

export const addBookService = async (bookData) => {
    const {title, authorId, description, bookCover, isbn, category, publisher} = bookData
    try {

        const newBook = await prisma.book.create({
            data: {
                title: title,
                authorId: authorId,
                description: description,
                coverImage: bookCover,   
                isbn: isbn,
                categoryId: category,
                publisherId: publisher

            }
        })

        console.log('New Book Added:', newBook);

        return newBook
    } catch (error) {
        throw error
    }
    
}