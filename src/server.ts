// const express = require('express');
// import express, { Application } from 'express';
import config from './config/config'
import app from './app'

const server = app.listen(config.PORT)

;(() => {
    try {
        // eslint-disable-next-line no-console
        console.info('APPLICATION_STARTED', {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('APPLICATION_ERROR', { meta: err })

        server.close((error) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error('APPLICATION_ERROR', { meta: error })
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
