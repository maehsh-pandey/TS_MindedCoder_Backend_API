import { Request, Response } from 'express'
import { THttpResponse } from '../types/types'
import { EApplicationEnvironment } from '../constant/application'
import config from '../config/config'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }

    console.info('CONTROLLER_RESPONSE', {
        meta: response
    })

    //check production enviroment
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        //remove ip address property in response object
        delete response.request.ip
    }
    res.status(responseStatusCode).json(response)
}
