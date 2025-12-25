import { createLogger, format, transports } from 'winston'

import { config } from '../config/index.js';

const {combine, timestamp, printf, colorize, align, errors} = format

const myFormat = printf(({level, message, label = 'APP', timestamp, ...meta}) => {
       const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta, null, 2)}` : ''
    return `${timestamp} [${label}] ${level}: ${message} ${metaStr}`;
})

const loggerTransports = []

if(config.NODE_ENV !== 'PRODUCTION') {
    loggerTransports.push(
        new transports.Console({
            format: combine(
                colorize({all: true}),
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                myFormat
            )
        })
    )
}

export const logger = createLogger({
    level: 'info',
    format: combine(errors({stack: true}), format.json()),
    transports: loggerTransports,
    silent: config.NODE_ENV === 'TEST'
})