import express from 'express'
import router from './routes/index.js'
import helmet from 'helmet'
import cors from 'cors'
import { requestLogger } from './middleware/request-logger.js'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(requestLogger)

app.use('/api/v1', router)

export {app}
