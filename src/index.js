import express from 'express'
import router from './routes/index.js'
import helmet from 'helmet'
import cors from 'cors'
import { requestLogger } from './middleware/request-logger.js'
import rateLimit from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import Redis from 'ioredis'
import { config } from './config/index.js'

const redisClient = new Redis(config.REDIS_URI)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes,
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args),
    }),
})

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(requestLogger)
app.use(limiter)
 
app.use('/api/v1', router)

export {app}
