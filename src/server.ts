// const express = require('express');
// import express, { Application } from 'express';
import config from './config/config'
import app from './app'
import logger from './util/logger'
import databaseService from './services/databaseService'
import { initRateLimiter } from './config/rateLimiter'
// import { Connection } from 'mongoose';
const server = app.listen(config.PORT)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
    try {
        //Database connection
        const connection = await databaseService.connect()
        // console.log('connection>>>>>',connection);
        // const connection = await databaseService.connect();

        //Database connection log
        logger.info('DATABASE_CONNECTION', {
            meta: {
                CONNECTION_NAME: connection?.name
            }
        })

        if (connection) {
            initRateLimiter(connection)
            //Database connection log
            logger.info('RATE_LIMITER_INITIATED', {
                meta: {
                    PORT: config.PORT,
                    SERVER_URL: config.SERVER_URL
                }
            })
        }

        logger.info('APPLICATION_STARTED', {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error('APPLICATION_ERROR', { meta: err })

        server.close((error) => {
            if (error) {
                logger.error('APPLICATION_ERROR', { meta: error })
            }

            process.exit(1)
        })
    }
})()
/*
app.listen(config.PORT, () => {
    console.log
    ('Server running at PORT: ', config.PORT)
}).on('error', (error: Error) => {
    // gracefully handle error
    throw new Error(error.message)
})
*/
