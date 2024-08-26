import { Request } from 'express'
import { THttpError } from '../types/types'
import responseMessage from '../constant/responseMessage'
import { EApplicationEnvironment } from '../constant/application'
import config from '../config/config'

export default (
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    err: Error | unknown,
    req: Request,
    errorStatusCode: number
): THttpError | void => {
    const errorObject: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    //log
    // eslint-disable-next-line no-console
    console.info('CONTROLLER_ERROR', {
        meta: errorObject
    })

    //check production enviroment
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObject.request.ip
        delete errorObject.trace
    }

    return errorObject
}
