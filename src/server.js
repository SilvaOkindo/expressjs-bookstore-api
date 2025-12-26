import { app } from './index.js'
import { config } from './config/index.js'
import { logger } from './utils/logger.js'

app.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`)
})