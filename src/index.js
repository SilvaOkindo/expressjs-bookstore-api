import express from 'express'
import router from './routes/index.js'
import { config } from './config/index.js'
import helmet from 'helmet'
import cors from 'cors'
import { logger } from './utils/logger.js'
import { requestLogger } from './middleware/request-logger.js'


const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(requestLogger)

app.use('/api/v1', router)

app.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`)
})