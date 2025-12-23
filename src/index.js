import express from 'express'
import router from './routes/index.js'
import { config } from './config/index.js'
import helmet from 'helmet'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api/v1', router)

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})