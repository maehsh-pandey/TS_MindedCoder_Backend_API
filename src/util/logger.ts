/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'
import path from 'path'
import { blue, red, yellow, green, blueBright } from 'colorette'
import 'winston-mongodb'
import * as sourceMapSupport from 'source-map-support'
import { MongoDBTransportInstance } from 'winston-mongodb'
sourceMapSupport.install()

const colorizeLevel = (level: string) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const customLevel = colorizeLevel(level.toUpperCase())

    const customTimestamp = green(timestamp as string)

    const customMessage = blueBright(message as string)

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${'META'} ${customMeta}\n`

    return customLog
})

// type Record<K extends keyof any, T> = { [P in K]: T; };
// type LogMeta = Record<string, object>;

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const logMeta: Record<string, object | unknown> = {}

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),

        message,

        timestamp,
        meta: logMeta
    }

    //Syntex : JSON.stringify(value, replacer, space)

    return JSON.stringify(logData, null, 4)
})

const ConsoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }

    return []
}

const FileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs/success', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        }),
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs/error', `${config.ENV}.log`),
            level: 'error',
            format: format.combine(format.timestamp(), fileLogFormat),
            handleExceptions: true
        })
    ]
}

const MongodbTransport = (): Array<MongoDBTransportInstance> => {
    return [
        new transports.MongoDB({
            level: 'info',
            db: config.DATABASE_URL as string,
            metaKey: 'meta',
            options: { useUnifiedTopology: true },
            expireAfterSeconds: 3600 * 24 * 30,
            collection: 'application.log'
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: []
    },
    transports: [...FileTransport(), ...MongodbTransport(), ...ConsoleTransport()]
})
