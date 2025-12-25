import { logger } from '../utils/logger.js'

export const requestLogger = (req, res, next) => {
    const start = process.hrtime.bigint()
    
    res.on('finish', () => {
        const duration = Number(process.hrtime.bigint() - start) / 1_000_000
        const logData = {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration.toFixed(2)} ms`,
            ip: req.ip,
            userAgent: req.get('user-agent')
        }

        if(res.statusCode >= 500) {
            logger.error('HTTP Request failed', logData)
        } else if(res.statusCode >= 400) {
            logger.warn('HTTP Request client error', logData)
        } else {
            logger.info('HTTP Request completed', logData)
        }
    })
    next()
}