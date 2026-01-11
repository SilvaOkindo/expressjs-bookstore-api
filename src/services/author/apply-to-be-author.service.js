import { prisma } from '../../lib/prisma.js'
import { Prisma } from '@prisma/client'

export const applyToBeAuthorService = async (userId, motivation) => {
  
  try {
     const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { authorApplication: true }
  })

  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }

  if (user.role === 'AUTHOR') {
    throw new Error('ALREADY_AN_AUTHOR')
  }

  if (user.application) {
    console.log('bla bla!!')
    throw new Error('APPLICATION_ALREADY_EXISTS')
  }


  const application = await prisma.authorApplication.create({
    data: {
      userId: user.id,
      motivation: motivation, 
      status: 'PENDING'
    }
  })

  return application
    
  } catch (error) {
     if (
      //error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("APPLICATION_ALREADY_EXISTS");
    }
    throw error
  }
}
